if (window.OD_CONFIG && window.OD_CONFIG.enabled) {
  // If OneDrive activity is enabled, skip GitHub display
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('file-activity');
    if (el && !el.textContent) el.textContent = 'جاري التحميل من ون درايف...';
  });
} 

async function fetchLatestCommit(owner, repo, path, token){
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(path)}&per_page=1`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error('fetch');
  const data = await res.json();
  return data[0];
}
function fmt(dateStr){
  const d = new Date(dateStr);
  const pad = n => (n<10?'0':'')+n;
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
async function renderFileActivity(targetId){
  const el = document.getElementById(targetId);
  if (!el) return;
  const owner = 'beno0o96-del';
  const repo = 'olayan-compliance-dashboard';
  const filePath = 'Expired_Health_Card_2026_V3.xlsx';
  const token = localStorage.getItem('gh-token') || '';
  try{
    const c = await fetchLatestCommit(owner, repo, filePath, token);
    if (!c){
      el.textContent = 'آخر تحديث: غير متاح';
      return;
    }
    const when = fmt(c.commit.author.date);
    const who = c.author?.login || c.commit?.author?.name || 'غير معروف';
    el.innerHTML = `<span>آخر تحديث: ${when} · بواسطة ${who}</span>`;
  }catch(e){
    el.innerHTML = `<span>آخر تحديث: تعذر جلب البيانات</span>`;
  }
}
if (!window.OD_CONFIG || !window.OD_CONFIG.enabled) {
    document.addEventListener('DOMContentLoaded', ()=>renderFileActivity('file-activity'));
}
