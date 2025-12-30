function checkKeys(obj, spec, path, issues) {
  if (typeof spec === 'string') {
    const ok =
      (spec === 'number' && typeof obj === 'number') ||
      (spec === 'string' && typeof obj === 'string') ||
      (spec === 'array' && Array.isArray(obj)) ||
      (spec === 'object' && typeof obj === 'object' && obj !== null);
    if (!ok) issues.push(`${path} النوع المتوقع ${spec}`);
    return;
  }
  for (const key of Object.keys(spec)) {
    const p = `${path}.${key}`;
    if (!(key in obj)) {
      issues.push(`${p} مفقود`);
      continue;
    }
    const expected = spec[key];
    const val = obj[key];
    if (Array.isArray(expected)) {
      if (!Array.isArray(val)) {
        issues.push(`${p} يجب أن يكون مصفوفة`);
        continue;
      }
      const itemSpec = expected[0];
      val.forEach((item, i) => checkKeys(item, itemSpec, `${p}[${i}]`, issues));
    } else if (typeof expected === 'object') {
      checkKeys(val, expected, p, issues);
    } else {
      checkKeys(val, expected, p, issues);
    }
  }
}

async function validateFile(name, url, spec) {
  const card = document.createElement('a');
  card.className = 'link-card';
  card.href = url;
  card.target = '_blank';
  const issues = [];
  try {
    const res = await fetch(url + '?t=' + Date.now());
    if (!res.ok) throw new Error('fetch error');
    const json = await res.json();
    checkKeys(json, spec, name, issues);
    const status = issues.length === 0 ? '✅ صالح' : `⚠️ ${issues.length} مشكلة`;
    card.innerHTML = `
      <div class="link-icon">📄</div>
      <div class="link-title">${name}</div>
      <div class="link-sub">${status}</div>
    `;
    if (issues.length > 0) {
      const ul = document.createElement('ul');
      ul.style.color = '#ffb74d';
      ul.style.marginTop = '8px';
      issues.slice(0, 8).forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
  } catch (e) {
    card.innerHTML = `
      <div class="link-icon">❌</div>
      <div class="link-title">${name}</div>
      <div class="link-sub">تعذر قراءة الملف</div>
    `;
  }
  return card;
}

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('results-grid');
  const specs = [
    {
      name: 'training_data.json',
      url: 'training_data.json',
      spec: {
        categories: 'array',
        training: { counts: 'object' },
        health_cards: { counts: 'object' },
        ops_data: [{ name: 'string', brand: 'string', count: 'number' }],
        city_stats: [{ city: 'string', count: 'number', region: 'string' }],
        cost_centers: [{ branch_name: 'string', cost_center: 'string' }]
      }
    },
    {
      name: 'violations_data.json',
      url: 'violations_data.json',
      spec: {
        summary: {
          total_violations: 'number',
          total_amount: 'number',
          open_violations: 'number',
          closed_violations: 'number'
        },
        top_branches_frequency: [{ branch: 'string', count: 'number' }],
        top_branches_risk: [{ branch: 'string', amount: 'number' }],
        common_types: [{
          type: 'string',
          count: 'number',
          icon: 'string',
          branches: [{ name: 'string', count: 'number' }]
        }]
      }
    },
    {
      name: 'data.json',
      url: 'data.json',
      spec: { kpis: { openViolations: 'number', closedViolations: 'number', totalFines: 'string', healthCards: 'string' } }
    }
  ];
  const cards = await Promise.all(specs.map(s => validateFile(s.name, s.url, s.spec)));
  cards.forEach(c => grid.appendChild(c));
});
