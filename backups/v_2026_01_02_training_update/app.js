// Fallback Data Constants (Embedded for local execution/offline support)
var FALLBACK_DATA = {
    "kpis": {
        "openViolations": 15,
        "closedViolations": 128,
        "totalFines": "335,150",
        "healthCards": "74.0%"
    }
};

var FALLBACK_VIOLATIONS = {
    "summary": {
        "total_violations": 0,
        "total_amount": 0,
        "open_violations": 0,
        "closed_violations": 0
    },
    "regions": [],
    "top_branches_frequency": [],
    "top_branches_risk": [],
    "common_types": []
};

var FALLBACK_BOARD = {
  "header_kpis": {
    "roi": { "value": "37.8%", "trend": "up", "color": "#4caf50" },
    "effectiveness": { "value": "93.0%", "trend": "flat", "color": "#FFC107" },
    "risks": { "value": "12.0", "trend": "down", "color": "#f44336" }
  },
  "financials": {
    "revenue": [
      { "sector": { "en": "Burger King", "ar": "برجر كنج" }, "actual": "209.8m", "target": "204.9m", "var": "2.4%", "trend": "up" },
      { "sector": { "en": "Texas Chicken", "ar": "تكساس تشيكن" }, "actual": "3,323m", "target": "2,266m", "var": "2.5%", "trend": "up" },
      { "sector": { "en": "Buffalo Wild Wings", "ar": "بافلو وايلد وينجز" }, "actual": "189.5m", "target": "186.6m", "var": "(1.6%)", "trend": "down" }
    ],
    "expenses": [
      { "type": { "en": "Municipal", "ar": "البلدية" }, "actual": "2,156", "budget": "2,058", "var": "(4.8%)", "trend": "down" },
      { "type": { "en": "Labor Office", "ar": "مكتب العمل" }, "actual": "410.5", "budget": "393.2", "var": "4.4%", "trend": "up" },
      { "type": { "en": "Civil Defense", "ar": "الدفاع المدني" }, "actual": "264.3", "budget": "255.9", "var": "3.3%", "trend": "up" }
    ]
  },
  "projects": [
    { "name": { "en": "Strengths", "ar": "نقاط القوة" }, "roi": "14.5%", "color": "#4caf50", "petals": [1, 0.8, 1.1, 0.9, 1.2] },
    { "name": { "en": "Weaknesses", "ar": "نقاط الضعف" }, "roi": "11.2%", "color": "#a0c4ff", "petals": [0.9, 1.1, 0.8, 1.0, 0.9] },
    { "name": { "en": "Goal", "ar": "الهدف" }, "roi": "18.1%", "color": "#FFC107", "petals": [1.2, 1.2, 1.1, 1.3, 1.2] }
  ],
  "western_violations": {
    "summary": [
      { "label": { "en": "Total Violations", "ar": "إجمالي المخالفات" }, "value": "73", "trend": "up", "color": "#f44336" },
      { "label": { "en": "Total Amount", "ar": "إجمالي المبالغ" }, "value": "170,750", "trend": "down", "color": "#FFC107" },
      { "label": { "en": "Resolution Rate", "ar": "نسبة المعالجة" }, "value": "88%", "trend": "up", "color": "#4caf50" }
    ],
    "top_issues": [
      { "issue": { "en": "License Expired", "ar": "انتهاء الرخصة" }, "count": 12 },
      { "issue": { "en": "Hygiene", "ar": "النظافة العامة" }, "count": 8 },
      { "issue": { "en": "Uniform", "ar": "الزي الموحد" }, "count": 5 }
    ]
  },
  "gauges": [
    { "label": { "en": "Western", "ar": "الغربية" }, "value": "67%", "p": "67deg" },
    { "label": { "en": "Central", "ar": "الوسطى" }, "value": "85%", "p": "85deg" },
    { "label": { "en": "Eastern", "ar": "الشرقية" }, "value": "92%", "p": "92deg" }
  ],
  "stars": [
    { "label": { "en": "IT", "ar": "التقنية" }, "value": "77%" },
    { "label": { "en": "Finance", "ar": "المالية" }, "value": "83%" },
    { "label": { "en": "HR", "ar": "الموارد البشرية" }, "value": "90%" }
  ],
  "violations": {
    "western": [],
    "central": [],
    "eastern": []
  },
  "metrics_row": [
    { "label": { "en": "Overall Compliance", "ar": "الامتثال العام" }, "value": "+95%", "color": "#00d2be", "subtext": { "en": "Licenses & Health Cards", "ar": "الرخص والشهادات الصحية" }, "subcolor": "#4caf50" },
    { "label": { "en": "Critical Expiries", "ar": "حالات انتهاء حرجة" }, "value": "Zero", "color": "#4caf50", "subtext": { "en": "Impacting Operations", "ar": "تؤثر على التشغيل" }, "subcolor": "#fff" },
    { "label": { "en": "High Risk Violations", "ar": "مخالفات عالية الخطورة" }, "value": "12", "color": "#f44336", "subtext": { "en": "Requiring Immediate Action", "ar": "تتطلب إجراء فوري" }, "subcolor": "#f44336" },
    { "label": { "en": "Audit Score", "ar": "نتيجة التدقيق" }, "value": "88/100", "color": "#FFC107", "subtext": { "en": "Internal Audit Q4", "ar": "التدقيق الداخلي الربع الرابع" }, "subcolor": "#FFC107" }
  ],
  "brand_performance": [
    { "brand": { "en": "Burger King", "ar": "برجر كنج" }, "score": "92%", "color": "#f44336" },
    { "brand": { "en": "Texas Chicken", "ar": "تكساس تشيكن" }, "score": "88%", "color": "#FFC107" },
    { "brand": { "en": "Buffalo Wild Wings", "ar": "بافلو وايلد وينجز" }, "score": "95%", "color": "#ffeb3b" }
  ],
  "kpi_table": [
    { "id": "KPI-001", "kpi": { "en": "Food Safety Score", "ar": "درجة سلامة الغذاء" }, "measurement": { "en": "External Audit", "ar": "تدقيق خارجي" }, "target": "95%", "achieved": "92%", "progress": "96%", "status": { "en": "Good", "ar": "جيد" } },
    { "id": "KPI-002", "kpi": { "en": "Staff Hygiene", "ar": "نظافة العاملين" }, "measurement": { "en": "Internal Check", "ar": "فحص داخلي" }, "target": "100%", "achieved": "98%", "progress": "98%", "status": { "en": "Excellent", "ar": "ممتاز" } },
    { "id": "KPI-003", "kpi": { "en": "License Validity", "ar": "صلاحية الرخص" }, "measurement": { "en": "System Record", "ar": "سجل النظام" }, "target": "100%", "achieved": "94%", "progress": "94%", "status": { "en": "Action Required", "ar": "يتطلب إجراء" } },
    { "id": "KPI-004", "kpi": { "en": "Pest Control", "ar": "مكافحة الآفات" }, "measurement": { "en": "Monthly Visit", "ar": "زيارة شهرية" }, "target": "100%", "achieved": "100%", "progress": "100%", "status": { "en": "Achieved", "ar": "محقق" } }
  ],
  "monthly_trend": [
    { "label": "Jan", "val": "65" },
    { "label": "Feb", "val": "70" },
    { "label": "Mar", "val": "60" },
    { "label": "Apr", "val": "75" },
    { "label": "May", "val": "80" },
    { "label": "Jun", "val": "85" }
  ],
  "violations_trend": [
    { "label": "Jan", "val": "40" },
    { "label": "Feb", "val": "35" },
    { "label": "Mar", "val": "45" },
    { "label": "Apr", "val": "30" },
    { "label": "May", "val": "25" },
    { "label": "Jun", "val": "20" }
  ]
};

// Initialize dashboardData with fallback to fix ReferenceError
var dashboardData = JSON.parse(JSON.stringify(FALLBACK_BOARD));

var FALLBACK_SERVICES = {
  "kpis": {
    "activeRequests": 142,
    "completedToday": 28,
    "avgResponseTime": "2h 15m",
    "employeeSatisfaction": "98%"
  },
  "requests": [
    {
      "id": "#REQ-8821",
      "type": { "en": "Maintenance", "ar": "صيانة" },
      "requester": "Burger King - Riyadh 01",
      "status": "pending",
      "date": "2025-01-16",
      "priority": { "en": "High", "ar": "عالية" }
    },
    {
      "id": "#REQ-8820",
      "type": { "en": "IT Support", "ar": "دعم فني" },
      "requester": "Texas - Jeddah 05",
      "status": "closed",
      "date": "2025-01-15",
      "priority": { "en": "Medium", "ar": "متوسطة" }
    },
    {
      "id": "#REQ-8819",
      "type": { "en": "Supply Chain", "ar": "سلسلة الإمداد" },
      "requester": "BWW - Dammam 02",
      "status": "closed",
      "date": "2025-01-15",
      "priority": { "en": "Low", "ar": "منخفضة" }
    },
    {
      "id": "#REQ-8818",
      "type": { "en": "Cleaning", "ar": "نظافة" },
      "requester": "Burger King - Riyadh 03",
      "status": "in_progress",
      "date": "2025-01-14",
      "priority": { "en": "Medium", "ar": "متوسطة" }
    },
    {
      "id": "#REQ-8817",
      "type": { "en": "HR Request", "ar": "طلب موارد بشرية" },
      "requester": "Head Office",
      "status": "completed",
      "date": "2025-01-14",
      "priority": { "en": "High", "ar": "عالية" }
    }
  ]
};

// Language Switching Logic
function setLang(lang) {
    // Update Body Class - Preserve other classes
    document.body.classList.remove('en', 'ar');
    document.body.classList.add(lang);
    
    // Update Text Content
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    
    elements.forEach(el => {
        if (lang === 'en') {
            if (el.dataset.en) el.textContent = el.dataset.en;
        } else {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        }
    });

    // Save preference
    localStorage.setItem('preferred-lang', lang);
    
    // Update direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Re-render Dynamic Content for specific pages
    if (document.querySelector('.complex-dashboard')) {
        fetchBoardData();
    }
    if (document.getElementById('violations-list')) {
        fetchViolationsData();
    }
    if (document.getElementById('kpi-cards')) {
        fetchData();
    }
    if (document.getElementById('servicesTable')) {
        fetchServicesData();
    }
}

// Translation Dictionary for Dynamic Content
var dictionary = {
    "عدم وجود المحل على الطبيعة": "Shop not physically found",
    "عدم التقيد بدرجات الحرارة المناسبة لحفظ المواد الغذائية": "Non-compliance with food storage temperatures",
    "تلوث الغذاء بالميكروبات أو السموم الممرضة في المنشأة": "Food contamination with microbes/toxins",
    "عدم تجديد كرت صحي": "Failure to renew health card",
    "عدم ارتداء الزي الموحد المخصص للعمل": "Failure to wear work uniform",
    "تدني مستوى النظافة العامة": "Low level of general hygiene",
    "وجود حشرات أو قوارض": "Presence of insects or rodents",
    "سوء تداول الغذاء": "Poor food handling",
    "مخالفة شروط التعبئة والتغليف": "Violation of packaging conditions",
    "استخدام مواد أولية منتهية الصلاحية": "Use of expired raw materials"
};

function getTranslation(text, lang) {
    if (!text) return "";
    if (dictionary[text]) return dictionary[text];
    return text; // Return original if no translation found
}

function safeParse(key, defaultVal) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultVal;
        return JSON.parse(item);
    } catch (e) {
        console.error(`Error parsing ${key} from localStorage:`, e);
        return defaultVal;
    }
}

// Slideshow Logic
let slideIndex = 0;
let slideInterval;
let slides = [];
let dotsContainer = null;
const slideIntervalTime = 5000; // 5 seconds

function initSlideshow() {
    slides = document.querySelectorAll('.slide');
    dotsContainer = document.getElementById('dotsContainer');

    if (slides.length === 0) return;

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.onclick = () => { currentSlide(index); startTimer(); };
            dotsContainer.appendChild(dot);
        });
    }

    // Show initial slide
    showSlide(slideIndex);
    
    // Start auto-play ONLY on Mobile
    handleSlideTimer();
    window.addEventListener('resize', handleSlideTimer);

    const heroSection = document.querySelector('.hero');
    // Load Violations Data from LocalStorage if available (Live Sync)
    const vData = safeParse('violations_data_override', null);
    if(vData) {
        try {
            // Check if it's the "stats" structure from Admin
            if(vData.regions) {
                 // Reset
                 dashboardData.violations = { western: [], central: [], eastern: [] };
                 
                 vData.regions.forEach(reg => {
                     const rName = reg.name.toLowerCase();
                     let targetKey = '';
                     if(rName.includes('west') || rName.includes('غرب')) targetKey = 'western';
                     else if(rName.includes('central') || rName.includes('riyadh') || rName.includes('وسط') || rName.includes('رياض')) targetKey = 'central';
                     else if(rName.includes('east') || rName.includes('شرق')) targetKey = 'eastern';
                     
                     if(targetKey && reg.violations) {
                         // Map admin violations to dashboard format
                         dashboardData.violations[targetKey] = reg.violations.slice(0, 5).map(v => ({
                             branch: { en: v.branch, ar: v.branch },
                             type: { en: v.type, ar: v.type },
                             level: { en: "High", ar: "عالية" }, 
                             count: v.amount || 1,
                             color: v.status === 'Open' ? "#f44336" : "#4caf50"
                         }));
                     }
                 });
            }
        } catch(e) {
            console.error("Error syncing violations data", e);
        }
    }

    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroSection && heroOverlay) {
        heroSection.addEventListener('mousemove', (e) => {
            const r = heroSection.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            heroOverlay.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroOverlay.style.transform = 'translate(0,0)';
        });
    }

    // Attach Event Listeners to Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.onclick = () => { moveSlide(-1); startTimer(); };
    }
    if (nextBtn) {
        nextBtn.onclick = () => { moveSlide(1); startTimer(); };
    }
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        stopTimer();
    }
    const hero = document.querySelector('.hero');
    let touchStartX = 0;
    if (hero) {
        hero.addEventListener('touchstart', (e) => {
            if (!e.changedTouches || e.changedTouches.length === 0) return;
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        hero.addEventListener('touchend', (e) => {
            if (!e.changedTouches || e.changedTouches.length === 0) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 30) {
                moveSlide(dx < 0 ? 1 : -1);
                startTimer();
            }
        }, { passive: true });
    }
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopTimer();
        else if (!reduceMotion) startTimer();
    });
}

function showSlide(index) {
    if (slides.length === 0) return;

    // Handle index bounds
    if (index >= slides.length) slideIndex = 0;
    else if (index < 0) slideIndex = slides.length - 1;
    else slideIndex = index;

    // Hide all slides & Remove active from dots
    slides.forEach(slide => slide.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide & Activate dot
    slides[slideIndex].classList.add('active');
    if (dots.length > 0) {
        dots[slideIndex].classList.add('active');
    }
}

function moveSlide(n) {
    showSlide(slideIndex + n);
}

function currentSlide(n) {
    showSlide(n);
}

function startTimer() {
    stopTimer(); // Ensure no duplicate intervals
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, slideIntervalTime);
}

function handleSlideTimer() {
    if (window.innerWidth <= 768) {
        // Mobile: Enable Slideshow
        if (!slideInterval) startTimer();
    } else {
        // Desktop: Disable Slideshow & Reset to first slide
        stopTimer();
        showSlide(0);
    }
}

function stopTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Data Fetching Logic
async function fetchData() {
    try {
        const response = await fetch('data.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.warn('Error fetching data, using fallback:', error);
        updateDashboard(FALLBACK_DATA);
    }
}

function updateDashboard(data) {
    if (!data.kpis) return;

    // Animate KPI values
    const kpiOpen = parseInt(data.kpis.openViolations) || 0;
    const kpiClosed = parseInt(data.kpis.closedViolations) || 0;
    
    // Parse fines (remove commas)
    const fines = parseInt((data.kpis.totalFines || "0").replace(/,/g, '')) || 0;
    
    // Parse health (remove %)
    const health = parseFloat((data.kpis.healthCards || "0").replace('%', '')) || 0;

    animateValue('kpi-open', 0, kpiOpen, 2000);
    animateValue('kpi-closed', 0, kpiClosed, 2000);
    animateValue('kpi-fines', 0, fines, 2000, true);
    animateValue('kpi-health', 0, Math.floor(health), 2000, false, '%');
}

// Violations Data Fetching
async function fetchViolationsData() {
    // Only run on violations.html
    if (!document.getElementById('v-total-count')) return;

    // 1. Check LocalStorage (Admin Updates)
    const parsed = safeParse('violations_data_override', null);
    if (parsed) {
        console.log("Using LocalStorage Violations Data");
        updateViolationsDashboard(parsed);
        return; // Exit if local data exists
    }

    // 2. Fetch from JSON File (Default)
    try {
        const response = await fetch('violations_data.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log("Violations Data Loaded from File:", data);
        updateViolationsDashboard(data);
    } catch (error) {
        console.warn('Error fetching violations data, using fallback:', error);
        updateViolationsDashboard(FALLBACK_VIOLATIONS);
    }
}

function updateViolationsDashboard(data) {
    if (!data || !data.summary) {
        console.error("Invalid violations data structure");
        return;
    }

    // Summary Cards with Animation
    animateValue('v-total-count', 0, data.summary.total_violations, 2000);
    animateValue('v-total-amount', 0, data.summary.total_amount, 2000, true);
    
    // Top Frequency Branch
    if (data.top_branches_frequency && data.top_branches_frequency.length > 0) {
        document.getElementById('v-top-freq-branch').textContent = data.top_branches_frequency[0].branch;
    }
    
    // Top Risk Branch
    if (data.top_branches_risk && data.top_branches_risk.length > 0) {
        document.getElementById('v-top-risk-branch').textContent = data.top_branches_risk[0].branch;
    }

    // Render Charts
    if (data.top_branches_frequency) {
        renderBarChart('chart-freq', data.top_branches_frequency, 'count');
    }
    if (data.regions) {
        renderBarChart('chart-region', data.regions, 'count');
    }
    if (data.top_branches_risk) {
        renderBarChart('chart-risk', data.top_branches_risk, 'amount');
    }
    
    // Render Types List
    const typesContainer = document.getElementById('list-types');
    if (typesContainer) {
        typesContainer.innerHTML = '';
        // Support both keys for backward compatibility
        const typesList = data.common_types || data.top_violation_types || [];
        
        if (Array.isArray(typesList)) {
            // Find max count for progress bar calculation
            const maxTypeCount = Math.max(...typesList.map(t => t.count || 0));

            typesList.forEach((item, index) => {
                const typeNameAr = item.type || "Unspecified Violation";
                const typeNameEn = dictionary[typeNameAr] || typeNameAr;
                const typeIcon = item.icon || "⚠️"; // Default icon
                const percentage = maxTypeCount > 0 ? (item.count / maxTypeCount) * 100 : 0;
                
                // Determine current language to show initial text
                const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
                const displayText = currentLang === 'ar' ? typeNameAr : typeNameEn;

                const div = document.createElement('div');
                div.className = 'type-item';
                div.style.opacity = '0';
                div.style.animation = `fadeUp 0.5s ease forwards ${0.5 + (index * 0.1)}s`;
                div.style.cursor = 'pointer'; // Make it look clickable
                
                // Add click handler for modal
                div.onclick = () => openViolationModal(item);
                
                div.innerHTML = `
                    <div class="type-header">
                        <div class="type-icon">${typeIcon}</div>
                        <span class="type-count-badge">${item.count}</span>
                    </div>
                    <div class="type-name" data-ar="${typeNameAr}" data-en="${typeNameEn}">${displayText}</div>
                    <div class="type-progress-track">
                        <div class="type-progress-fill" style="width: 0%"></div>
                    </div>
                `;
                typesContainer.appendChild(div);

                // Animate progress bar width after render
                setTimeout(() => {
                    const fill = div.querySelector('.type-progress-fill');
                    if (fill) fill.style.width = `${percentage}%`;
                }, 100 + (index * 50));
            });
        }
    }


}

function renderRegionalComparison(regions) {
    const tbody = document.querySelector('#region-comparison-table tbody');
    if (!tbody || !regions) return;

    tbody.innerHTML = '';
    const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';

    // Mock data for missing fields if not present in fallback
    const riskLevels = { 
        "Western": "High", 
        "Central": "Medium", 
        "Eastern": "Low", 
        "Riyadh": "Medium",
        "Northern": "Low",
        "Southern": "Low"
    };
    const topViolations = { 
        "Western": { ar: "انتهاء الرخصة", en: "License Expired" },
        "Central": { ar: "درجات الحرارة", en: "Temperature" },
        "Riyadh": { ar: "درجات الحرارة", en: "Temperature" },
        "Eastern": { ar: "الشهادات الصحية", en: "Health Cards" },
        "Northern": { ar: "النظافة العامة", en: "General Hygiene" },
        "Southern": { ar: "الزي الموحد", en: "Uniform" }
    };

    regions.forEach(region => {
        // Map "Central" to "Riyadh" if needed based on user request, or keep as is.
        // User asked for "Riyadh Region", "Eastern", "Western".
        // If data has "Central", we display it as "Riyadh (Central)" or just "Riyadh"
        
        let displayName = region.name;
        if (region.name === "Central") displayName = currentLang === 'ar' ? "منطقة الرياض (الوسطى)" : "Riyadh (Central)";
        else if (region.name === "Riyadh") displayName = currentLang === 'ar' ? "منطقة الرياض" : "Riyadh Region";
        else if (region.name === "Western") displayName = currentLang === 'ar' ? "المنطقة الغربية" : "Western Region";
        else if (region.name === "Eastern") displayName = currentLang === 'ar' ? "المنطقة الشرقية" : "Eastern Region";
        else if (region.name === "Northern") displayName = currentLang === 'ar' ? "المنطقة الشمالية" : "Northern Region";
        else if (region.name === "Southern") displayName = currentLang === 'ar' ? "المنطقة الجنوبية" : "Southern Region";

        const risk = riskLevels[region.name] || "Low";
        const topVio = topViolations[region.name] ? (currentLang === 'ar' ? topViolations[region.name].ar : topViolations[region.name].en) : "-";
        
        // Risk Color
        let riskColor = '#4caf50';
        if (risk === 'High') riskColor = '#f44336';
        if (risk === 'Medium') riskColor = '#FFC107';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:bold; color:#fff;">${displayName}</td>
            <td>${region.count}</td>
            <td>${region.amount.toLocaleString()}</td>
            <td><span style="color:${riskColor}; font-weight:bold;">${risk}</span></td>
            <td>${topVio}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Functions
// Violation Metadata for Rich Details
const violationMetadata = {
    "عدم وجود المحل على الطبيعة": {
        severity: "high",
        descAr: "المحل غير موجود في الموقع المسجل في الرخصة، مما يعد مخالفة جسيمة لأنظمة البلدية.",
        descEn: "The shop does not exist at the registered location, which is a major violation.",
        actionsAr: ["تحديث إحداثيات الموقع فوراً", "مراجعة البلدية لتصحيح الرخصة", "تقديم إثبات وجود المحل"],
        actionsEn: ["Update location coordinates immediately", "Visit municipality to correct license", "Provide proof of shop existence"]
    },
    "عدم التقيد بدرجات الحرارة المناسبة لحفظ المواد الغذائية": {
        severity: "high",
        descAr: "رصد درجات حرارة غير آمنة في وحدات التبريد أو التجميد، مما يعرض الغذاء للتلف.",
        descEn: "Unsafe temperatures detected in cooling/freezing units, risking food spoilage.",
        actionsAr: ["صيانة ثلاجات العرض والتخزين", "تسجيل درجات الحرارة كل ساعتين", "التخلص من المواد التالفة فوراً"],
        actionsEn: ["Maintain display/storage fridges", "Log temperatures every 2 hours", "Discard spoiled items immediately"]
    },
    "تلوث الغذاء بالميكروبات أو السموم الممرضة في المنشأة": {
        severity: "high",
        descAr: "وجود مؤشرات تلوث ميكروبي أو خلط بين الأغذية النيئة والمطبوخة.",
        descEn: "Indicators of microbial contamination or cross-contamination found.",
        actionsAr: ["تعقيم شامل للمطبخ والأدوات", "فصل مناطق التحضير", "فحص العمالة طبياً"],
        actionsEn: ["Full sanitization of kitchen/tools", "Separate preparation areas", "Medical checkup for staff"]
    },
    "عدم تجديد كرت صحي": {
        severity: "medium",
        descAr: "انتهاء صلاحية الكروت الصحية للعاملين، مما يمنعهم من ممارسة العمل قانونياً.",
        descEn: "Health cards for staff have expired, preventing legal work.",
        actionsAr: ["إيقاف العامل عن العمل فوراً", "تجديد الكرت الصحي عبر منصة بلدي", "دفع الغرامات المترتبة"],
        actionsEn: ["Suspend worker immediately", "Renew health card via Balady", "Pay accrued fines"]
    },
    "عدم ارتداء الزي الموحد المخصص للعمل": {
        severity: "low",
        descAr: "عدم التزام العاملين بالزي الرسمي النظيف والموحد للمنشأة.",
        descEn: "Staff not adhering to clean, uniform work attire.",
        actionsAr: ["توفير زي نظيف وكامل", "إلزام الموظفين بالارتداء", "تطبيق لائحة الجزاءات الداخلية"],
        actionsEn: ["Provide clean full uniform", "Enforce wearing it", "Apply internal penalties"]
    },
    "تدني مستوى النظافة العامة": {
        severity: "medium",
        descAr: "تراكم الأوساخ أو الغبار في الأرضيات أو الأسطح أو المعدات.",
        descEn: "Accumulation of dirt/dust on floors, surfaces, or equipment.",
        actionsAr: ["جدول تنظيف يومي صارم", "استخدام مواد تنظيف معتمدة", "تعيين مشرف للنظافة"],
        actionsEn: ["Strict daily cleaning schedule", "Use approved cleaning agents", "Assign hygiene supervisor"]
    },
    "وجود حشرات أو قوارض": {
        severity: "high",
        descAr: "رصد آثار حشرات أو قوارض داخل المنشأة، وهو خطر صحي جسيم.",
        descEn: "Traces of insects/rodents found, posing severe health risk.",
        actionsAr: ["التعاقد مع شركة مكافحة فوراً", "إغلاق الفتحات والشقوق", "تنظيف مناطق التخزين"],
        actionsEn: ["Contract pest control immediately", "Seal cracks/openings", "Clean storage areas"]
    },
    "سوء تداول الغذاء": {
        severity: "high",
        descAr: "طرق حفظ أو تحضير غير صحية (مثل التسييح الخاطئ).",
        descEn: "Unsanitary storage/prep methods (e.g., wrong thawing).",
        actionsAr: ["تدريب العمال على سلامة الغذاء", "توفير أدوات حفظ مناسبة", "مراقبة طرق التحضير"],
        actionsEn: ["Train staff on food safety", "Provide proper storage tools", "Monitor prep methods"]
    }
};

function openViolationModal(item) {
    const modal = document.getElementById('violation-modal');
    if (!modal) return;

    // Hide original header as we use custom header in body
    const originalHeader = modal.querySelector('.modal-header');
    if (originalHeader) originalHeader.style.display = 'none';
    
    const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
    const typeNameAr = item.type || "Unspecified Violation";
    const typeNameEn = dictionary[typeNameAr] || typeNameAr;
    
    // Get Metadata
    const meta = violationMetadata[typeNameAr] || {
        severity: "medium",
        descAr: "مخالفة تتطلب التصحيح الفوري لتجنب الغرامات.",
        descEn: "Violation requires immediate correction to avoid fines.",
        actionsAr: ["مراجعة المخالفة", "تصحيح الوضع", "توثيق التصحيح"],
        actionsEn: ["Review violation", "Correct situation", "Document correction"]
    };

    const severityClass = `severity-${meta.severity}`;
    const severityLabel = {
        high: { ar: "عالية الخطورة", en: "High Risk" },
        medium: { ar: "متوسطة الخطورة", en: "Medium Risk" },
        low: { ar: "منخفضة الخطورة", en: "Low Risk" }
    }[meta.severity][currentLang];

    const modalBody = document.getElementById('modal-body');
    // Clear previous content
    modalBody.innerHTML = '';
    
    // Also clear title/icon elements if they exist outside modal-body (based on original HTML structure)
    // But here we are rebuilding the whole content inside modal-body.
    // NOTE: The original HTML has modal-header with title/icon. We should probably hide them or reuse them.
    // To be safe and fully custom, let's just override modal-body content and ignore the old header elements if possible,
    // OR update them.
    
    // Original HTML structure:
    // <div class="modal-header"> ... <h2 id="modal-title">...</h2> ... </div>
    // <div class="modal-body" id="modal-body"> ... </div>
    
    // If we want a completely new look, we might need to manipulate the header too.
    // Let's clear the old header text to avoid duplication if we are building our own header in body.
    const oldTitle = document.getElementById('modal-title');
    const oldIcon = document.getElementById('modal-icon');
    if(oldTitle) oldTitle.textContent = ''; 
    if(oldIcon) oldIcon.textContent = '';

    modalBody.innerHTML = `
        <div class="modal-content-wrapper">
            <!-- Header Section (Inside Body for better control) -->
            <div class="modal-header-section">
                <div class="modal-icon-large">${item.icon || "⚠️"}</div>
                <div class="modal-title-box">
                    <h2>${currentLang === 'ar' ? typeNameAr : typeNameEn}</h2>
                    <span class="severity-badge ${severityClass}">${severityLabel}</span>
                    <div style="margin-top:10px; color:#a0c4ff;">
                        ${currentLang === 'ar' ? "إجمالي التكرار:" : "Total Count:"} 
                        <span style="color:#fff; font-weight:bold;">${item.count}</span>
                    </div>
                </div>
            </div>

            <div class="modal-details-grid">
                <!-- Description Card -->
                <div class="detail-card">
                    <h3>${currentLang === 'ar' ? "وصف المخالفة" : "Description"}</h3>
                    <p class="detail-text">${currentLang === 'ar' ? meta.descAr : meta.descEn}</p>
                </div>

                <!-- Actions Card -->
                <div class="detail-card">
                    <h3>${currentLang === 'ar' ? "الإجراءات التصحيحية المطلوبة" : "Required Actions"}</h3>
                    <ul class="action-list">
                        ${(currentLang === 'ar' ? meta.actionsAr : meta.actionsEn).map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>

                <!-- Affected Branches (Existing Logic) -->
                <div class="detail-card">
                    <h3>${currentLang === 'ar' ? "الفروع المتأثرة" : "Affected Branches"}</h3>
                    ${renderBranchesList(item.branches, currentLang)}
                </div>

                 <!-- Recent Reports (Mocked) -->
                <div class="detail-card">
                    <h3>${currentLang === 'ar' ? "سجل البلاغات الحديثة" : "Recent Reports Log"}</h3>
                    ${renderReportsTable(item.branches, currentLang)}
                </div>
            </div>
        </div>
    `;

    // Show Modal
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Close Logic
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) closeBtn.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    };
}

// Services Dashboard Logic
async function toggleServicesDashboard() {
    const modal = document.getElementById('services-modal');
    if (!modal) return;

    // Close side menu if open
    const menu = document.getElementById('sideMenu');
    if (menu && menu.classList.contains('active')) {
        toggleMenu();
    }

    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    } else {
        // Fetch data before showing
        await fetchServicesData();
        
        modal.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding class for transition
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

async function fetchServicesData() {
    // 1. Check LocalStorage Override
    const parsed = safeParse('services_data_override', null);
    if (parsed) {
        updateServicesDashboard(parsed);
        return;
    }

    // 2. Fetch from JSON
    try {
        const response = await fetch('services_data.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        updateServicesDashboard(data);
    } catch (error) {
        console.error('Error fetching services data, using fallback:', error);
        updateServicesDashboard(FALLBACK_SERVICES);
    }
}

function updateServicesDashboard(data) {
    if (!data) return;

    // Update KPIs
    if (data.kpis) {
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setVal('s-active-req', data.kpis.activeRequests);
        setVal('s-completed', data.kpis.completedToday);
        setVal('s-avg-time', data.kpis.avgResponseTime);
        setVal('s-satisfaction', data.kpis.employeeSatisfaction);
    }

    // Update Table
    const tbody = document.querySelector('#servicesTable tbody');
    if (tbody && data.requests) {
        tbody.innerHTML = '';
        const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
        
        data.requests.forEach(req => {
            const tr = document.createElement('tr');
            
            // Status Styling
            let statusClass = 'status-open';
            let statusText = req.status;
            if (req.status === 'completed' || req.status === 'closed') statusClass = 'status-closed';
            
            // Localize Type & Priority
            const type = req.type[currentLang] || req.type.en;
            const priority = req.priority[currentLang] || req.priority.en;

            tr.innerHTML = `
                <td>${req.id}</td>
                <td>${type}</td>
                <td>${req.requester}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>${req.date}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Print & Export Logic
function printServices() {
    window.print();
}

function exportServicesExcel() {
    const table = document.getElementById('servicesTable');
    if (!table) return;
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // UTF-8 BOM
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        let rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csvContent += rowData.join(",") + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "services_dashboard.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Board Dashboard Logic
async function fetchBoardData() {
    if (!document.querySelector('.complex-dashboard')) return;

    let data;
    try {
        const response = await fetch('board_data.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        data = await response.json();
    } catch (error) {
        console.error('Error fetching board data, using fallback:', error);
        data = FALLBACK_BOARD;
    }

    // CHECK FOR LOCAL STORAGE OVERRIDES
    const overrides = safeParse('board_overrides', null);
    if (overrides) {
        try {
            // Merge overrides deeply? Or just high level sections?
            // Simple merge for now as structure matches
            if (overrides.header_kpis) data.header_kpis = { ...data.header_kpis, ...overrides.header_kpis };
            if (overrides.projects) data.projects = overrides.projects;
            if (overrides.gauges) data.gauges = overrides.gauges;
            if (overrides.stars) data.stars = overrides.stars;
            // Add more merges if needed
            
        } catch (e) {
            console.error('Error parsing board_overrides', e);
        }
    }

    updateBoardDashboard(data);
}

function updateBoardDashboard(data) {
    if (!data) return;

    // 1. Header KPIs
    if (data.header_kpis) {
        const updateHeaderKpi = (key, dataObj) => {
            // This requires finding elements by text content or adding IDs.
            // I'll add IDs to board.html for easier access.
            const el = document.getElementById(`b-kpi-${key}`);
            if (el) {
                el.innerHTML = `${dataObj.value} <span style="font-size:0.8em">${dataObj.trend === 'up' ? '▲' : dataObj.trend === 'down' ? '▼' : '▬'}</span>`;
                el.style.color = dataObj.color;
            }
        };
        updateHeaderKpi('roi', data.header_kpis.roi);
        updateHeaderKpi('eff', data.header_kpis.effectiveness);
        updateHeaderKpi('risk', data.header_kpis.risks);
    }

    // 2. Financial Tables (Revenue)
    if (data.financials && data.financials.revenue) {
        const tbody = document.querySelector('#b-table-revenue tbody');
        if (tbody) {
            tbody.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            data.financials.revenue.forEach(item => {
                const tr = document.createElement('tr');
                const sector = (typeof item.sector === 'object') ? (item.sector[currentLang] || item.sector.en) : item.sector;
                const trendIcon = item.trend === 'up' ? '▲' : '▼';
                const valClass = item.trend === 'up' ? 'val-pos' : 'val-neg';
                tr.innerHTML = `<td>${sector}</td><td>${item.actual}</td><td>${item.target}</td><td class="${valClass}">${item.var} ${trendIcon}</td>`;
                tbody.appendChild(tr);
            });
        }
    }
    
    // 3. Financial Tables (Expenses)
    if (data.financials && data.financials.expenses) {
        const tbody = document.querySelector('#b-table-expenses tbody');
        if (tbody) {
            tbody.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            data.financials.expenses.forEach(item => {
                const tr = document.createElement('tr');
                const type = item.type[currentLang] || item.type.en;
                const trendIcon = item.trend === 'up' ? '▲' : '▼';
                const valClass = item.var.includes('(') ? 'val-neg' : 'val-pos'; 
                tr.innerHTML = `<td>${type}</td><td>${item.actual}</td><td>${item.budget}</td><td class="${valClass}">${item.var} ${trendIcon}</td>`;
                tbody.appendChild(tr);
            });
        }
    }
    
    // 4. Projects (Flower Charts)
    if (data.projects) {
        const container = document.getElementById('b-flower-grid');
        if (container) {
            container.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            data.projects.forEach((proj, projIndex) => {
                let petalsHtml = '';
                if (proj.petals) {
                    proj.petals.forEach((scale, i) => {
                        const deg = i * 72;
                        // Use CSS variables for rotation, scale, and index for staggered animation
                        petalsHtml += `<div class="petal" style="--r: ${deg}deg; --s: ${scale}; --i: ${i};"></div>`;
                    });
                }
                
                const name = (typeof proj.name === 'object') ? (proj.name[currentLang] || proj.name.en) : proj.name;
                
                const div = document.createElement('div');
                div.className = 'flower-chart';
                // Stagger entrance of the whole chart
                div.style.animationDelay = `${projIndex * 0.2}s`;
                
                div.innerHTML = `
                    <div class="flower-shape" style="--flower-color: ${proj.color || '#4facfe'};">
                        ${petalsHtml}
                    </div>
                    <span>${name}</span>
                    <small style="color:${proj.color || '#fff'};">${proj.roi}</small>
                `;
                container.appendChild(div);
            });
        }
    }

    // 5. Gauges (Operating Efficiency)
    if (data.gauges) {
        const container = document.getElementById('b-gauge-grid');
        if (container) {
            container.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            data.gauges.forEach(g => {
                const label = g.label[currentLang] || g.label.en;
                
                // Determine color based on value
                const val = parseFloat((g.value || "0").replace('%', ''));
                let color = '#f44336'; // Default Red < 60
                if (val >= 90) color = '#4caf50';      // Green
                else if (val >= 75) color = '#00d2be'; // Cyan/Teal
                else if (val >= 60) color = '#FFC107'; // Amber

                const div = document.createElement('div');
                div.className = 'gauge-item';
                div.innerHTML = `
                    <div class="gauge-circle" style="--p: ${g.p}; --c: ${color};">
                        <div class="gauge-inner">${g.value}</div>
                    </div>
                    <span style="font-size:0.8rem;">${label}</span>
                `;
                container.appendChild(div);
            });
        }
    }

    // 6. Stars (Dept Performance) - Redesigned as HUD Radial Gauges
    if (data.stars) {
        const container = document.getElementById('b-star-grid');
        if (container) {
            container.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            
            data.stars.forEach((s, index) => {
                const label = s.label[currentLang] || s.label.en;
                // Parse percentage
                const valStr = s.value.replace('%', '');
                const val = parseInt(valStr) || 0;
                
                // Determine color based on value
                let color = '#f44336'; // Red < 50
                if (val >= 80) color = '#00e676'; // Green
                else if (val >= 60) color = '#29b6f6'; // Blue
                else if (val >= 50) color = '#ffeb3b'; // Yellow

                // SVG Parameters
                const radius = 36;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (val / 100) * circumference;

                const div = document.createElement('div');
                div.className = 'star-item hud-card';
                // Stagger entrance
                div.style.animationDelay = `${index * 0.2}s`;

                div.innerHTML = `
                    <div class="hud-gauge">
                        <svg class="progress-ring" width="100" height="100">
                            <defs>
                                <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="${color}" stop-opacity="0.4" />
                                    <stop offset="100%" stop-color="${color}" />
                                </linearGradient>
                            </defs>
                            <circle class="progress-ring__circle-bg" stroke="rgba(255,255,255,0.1)" stroke-width="6" fill="transparent" r="${radius}" cx="50" cy="50"/>
                            <circle class="progress-ring__circle" 
                                stroke="url(#grad${index})" 
                                stroke-width="6" 
                                fill="transparent" 
                                r="${radius}" cx="50" cy="50"
                                style="stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${circumference}; --to-offset: ${offset};"
                            />
                        </svg>
                        <div class="hud-value">
                            <span class="count-up" data-target="${val}">${0}</span><small>%</small>
                        </div>
                    </div>
                    <div class="hud-label">${label}</div>
                    <div class="hud-glow" style="background: ${color};"></div>
                `;
                container.appendChild(div);

                // Trigger animation after a slight delay to ensure DOM is ready
                setTimeout(() => {
                    const circle = div.querySelector('.progress-ring__circle');
                    if (circle) circle.style.strokeDashoffset = offset;
                    
                    // Count up animation
                    const counter = div.querySelector('.count-up');
                    let start = 0;
                    const duration = 1500;
                    const startTime = performance.now();
                    
                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out quart
                        const ease = 1 - Math.pow(1 - progress, 4);
                        
                        const currentVal = Math.floor(ease * val);
                        if (counter) counter.textContent = currentVal;
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            if(counter) counter.textContent = val;
                        }
                    }
                    requestAnimationFrame(update);
                }, 100 + (index * 200));
            });
        }
    }

    // 8. Metrics Row (High Level)
    if (data.metrics_row) {
        const container = document.getElementById('b-metrics-row');
        if (container) {
            container.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            data.metrics_row.forEach(m => {
                const label = m.label[currentLang] || m.label.en;
                const subtext = m.subtext[currentLang] || m.subtext.en;
                
                const div = document.createElement('div');
                div.className = 'metric-card';
                // Set CSS variable for dynamic styling
                div.style.setProperty('--metric-color', m.color || '#fff');
                
                div.innerHTML = `
                    <div class="metric-label">${label}</div>
                    <div class="metric-value">${m.value}</div>
                    <div class="metric-subtext">
                        <span class="sub-dot" style="background-color: ${m.subcolor}"></span>
                        ${subtext}
                    </div>
                `;
                container.appendChild(div);
            });
        }
    }

    // 9. KPI Table
    if (data.kpi_table) {
        const table = document.getElementById('b-kpi-table');
        if (table) {
            // Create or clear tbody
            let tbody = table.querySelector('tbody');
            if (!tbody) {
                tbody = document.createElement('tbody');
                table.appendChild(tbody);
            } else {
                tbody.innerHTML = '';
            }
            
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            
            data.kpi_table.forEach(row => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                
                const kpi = row.kpi[currentLang] || row.kpi.en;
                const measurement = row.measurement[currentLang] || row.measurement.en;
                const progress = (typeof row.progress === 'object') ? (row.progress[currentLang] || row.progress.en) : row.progress;
                const status = row.status[currentLang] || row.status.en;
                
                // Color for progress/status
                let statusColor = '#4caf50';
                if (status === 'Excellent' || status === 'ممتاز' || status === 'Achieved' || status === 'محقق') statusColor = '#4caf50';
                else if (status === 'Good' || status === 'جيد') statusColor = '#FFC107';
                else statusColor = '#f44336';
                
                tr.innerHTML = `
                    <td style="padding: 15px;">${row.id}</td>
                    <td style="padding: 15px; color: #fff; font-weight: 500;">${kpi}</td>
                    <td style="padding: 15px; color: #b0bec5;">${measurement}</td>
                    <td style="padding: 15px; color: #fff;">${row.target}</td>
                    <td style="padding: 15px; color: #fff;">${row.achieved}</td>
                    <td style="padding: 15px; color: ${statusColor};">${progress}</td>
                    <td style="padding: 15px;"><span class="status-badge" style="background: rgba(76, 175, 80, 0.1); color: ${statusColor}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${status}</span></td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    // 10. Brand Performance Chart
    if (data.brand_performance) {
        const container = document.getElementById('b-brand-chart');
        if (container) {
            container.innerHTML = '';
            const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
            
            data.brand_performance.forEach(b => {
                const brand = b.brand[currentLang] || b.brand.en;
                const score = parseFloat(b.score.replace('%',''));
                
                const div = document.createElement('div');
                div.className = 's-bar';
                div.style.height = '0%'; // Start at 0 for animation
                div.style.background = b.color;
                div.innerHTML = `
                    <span>${b.score}</span>
                    <div class="s-bar-label">${brand}</div>
                `;
                container.appendChild(div);
                
                // Animate
                setTimeout(() => {
                    div.style.height = `${score}%`;
                }, 100);
            });
        }
    }

    // 11. Trend Charts (Monthly & Violations)
    const renderTrend = (id, dataKey) => {
        if (data[dataKey]) {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = '';
                const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
                
                data[dataKey].forEach((item, i) => {
                    const label = (typeof item.label === 'object') ? (item.label[currentLang] || item.label.en) : item.label;
                    const val = parseFloat((item.val || "").replace('%',''));
                    const h = item.h || (val + '%');
                    
                    const div = document.createElement('div');
                    div.className = 'trend-bar-item';
                    div.style.setProperty('--h', '0%'); // Start 0
                    div.setAttribute('data-val', val);
                    if (item.color) div.style.background = item.color; // Optional override
                    
                    div.innerHTML = `
                        <span class="t-label">${label}</span>
                        <div class="t-val">${item.val}</div>
                    `;
                    container.appendChild(div);
                    
                    setTimeout(() => {
                        div.style.setProperty('--h', h);
                    }, 100 + (i * 50));
                });
            }
        }
    };
    
    renderTrend('b-trend-monthly', 'monthly_trend');
    renderTrend('b-trend-violations', 'violations_trend');

    // 7. Regional Violations (Tabbed)
    if (data.violations) {
        window.currentBoardData = data; // Store globally for switching
        renderViolations('western'); // Default render
    }
}

// Global Function to Switch Regions
window.switchRegion = function(region, btn) {
    // Update Active Tab UI
    const tabs = document.querySelectorAll('.r-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Render Data
    renderViolations(region);
};

function renderViolations(region) {
    const data = window.currentBoardData;
    if (!data || !data.violations || !data.violations[region]) return;

    const listContainer = document.getElementById('b-violations-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
    const items = data.violations[region];

    items.forEach((item, index) => {
        const branch = item.branch[currentLang] || item.branch.en;
        const type = item.type[currentLang] || item.type.en;
        const level = item.level[currentLang] || item.level.en;
        
        // Dynamic Color Logic (Legacy Red/High)
        let color = item.color;
        // Default color based on level if not specified
        if (!color) {
            if (item.level.en === 'High') color = '#f44336'; // Red
            else if (item.level.en === 'Med') color = '#FFC107'; // Amber
            else if (item.level.en === 'Low') color = '#4caf50'; // Green
        }
        
        // Parse hex to rgb for background opacity
        let r=0, g=0, b=0;
        if(color && color.startsWith('#') && color.length === 7) {
            r = parseInt(color.slice(1,3), 16);
            g = parseInt(color.slice(3,5), 16);
            b = parseInt(color.slice(5,7), 16);
        }

        const div = document.createElement('div');
        div.className = 'radar-item';
        div.style.color = color; // Set color for pseudo-element
        
        // Stagger animation
        div.style.animationDelay = `${index * 0.1}s`;
        div.style.cursor = 'pointer'; // Make clickable
        
        // Construct item for modal
        const typeAr = item.type.ar || item.type; 
        
        div.onclick = () => {
            openViolationModal({
                type: typeAr,
                count: item.count || 1,
                icon: "⚠️",
                branches: [{ name: branch, count: item.count || 1 }]
            });
        };

        div.innerHTML = `
            <div class="radar-item-content">
                <span class="radar-branch-name">${branch}</span>
                <span class="radar-violation-type">${type}</span>
            </div>
            <span class="severity-badge-glow" style="color:${color}; border-color:${color}; box-shadow: 0 0 8px ${color}40;">${level}</span>
        `;
        
        listContainer.appendChild(div);
    });
}

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    fetchData(); // Home KPIs
    fetchViolationsData(); // Violations Page
    fetchBoardData(); // Board Page
    
    // Services Modal Init (Hidden by default)
});

// ================= NEW FEATURES ================= //

// Toggle Sliding Side Menu
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    if (!menu || !overlay) return;

    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        menu.classList.add('active');
        overlay.classList.add('active');
    }
}




function renderBranchesList(branches, lang) {
    if (!branches || branches.length === 0) {
        return `<p style="color:#888;">${lang === 'ar' ? "لا توجد بيانات" : "No data available"}</p>`;
    }
    let html = '<ul class="modal-branch-list">';
    branches.forEach(b => {
        html += `
            <li class="modal-branch-item">
                <span class="modal-branch-name">${b.name || b.branch}</span>
                <span class="modal-branch-count">${b.count}</span>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

function renderReportsTable(branches, lang) {
    if (!branches || branches.length === 0) return '';
    
    let html = `
        <table class="reports-table">
            <thead>
                <tr>
                    <th>${lang === 'ar' ? "التاريخ" : "Date"}</th>
                    <th>${lang === 'ar' ? "الفرع" : "Branch"}</th>
                    <th>${lang === 'ar' ? "الحالة" : "Status"}</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Take top 3 branches and generate fake recent dates
    branches.slice(0, 3).forEach((b, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (i * 2 + 1));
        const dateStr = date.toISOString().split('T')[0];
        const status = i === 0 ? "open" : "closed";
        const statusText = status === "open" 
            ? (lang === 'ar' ? "مفتوح" : "Open") 
            : (lang === 'ar' ? "مغلق" : "Closed");
        
        html += `
            <tr>
                <td>${dateStr}</td>
                <td>${b.name || b.branch}</td>
                <td class="status-${status}">${statusText}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return html;
}

function renderBarChart(containerId, data, valueKey) {
    const container = document.getElementById(containerId);
    if (!container || !data || !Array.isArray(data)) return;
    
    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:#888;">No data available</div>';
        return;
    }

    const maxValue = Math.max(...data.map(d => d[valueKey] || 0));

    data.forEach((item, index) => {
        const value = item[valueKey] || 0;
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        const label = item.branch || item.name || "Unknown";
        
        const row = document.createElement('div');
        row.className = 'bar-item';
        // Staggered animation for rows
        row.style.opacity = '0';
        row.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1}s`;
        
        row.innerHTML = `
            <div class="bar-label" title="${label}">${label}</div>
            <div class="bar-track">
                <div class="bar-fill" style="width: 0%"></div>
            </div>
            <div class="bar-value">${value.toLocaleString()}</div>
        `;
        
        container.appendChild(row);
        
        // Trigger width animation after a slight delay
        setTimeout(() => {
            const fill = row.querySelector('.bar-fill');
            if (fill) fill.style.width = `${percentage}%`;
        }, 100 + (index * 50));
    });
}

function animateValue(id, start, end, duration, isCurrency = false, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        obj.textContent = (isCurrency ? value.toLocaleString() : value) + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Motivational Quotes System
const MOTIVATIONAL_QUOTES = [
    { en: "Excellence in Service", ar: "التميز في الخدمة" },
    { en: "Leading with Innovation", ar: "الريادة بالابتكار" },
    { en: "Passion for Perfection", ar: "شغف الإتقان" },
    { en: "Together We Succeed", ar: "معاً ننجح" },
    { en: "Building the Future", ar: "نبني المستقبل" },
    { en: "Quality First", ar: "الجودة أولاً" },
    { en: "Dedication to Excellence", ar: "التفاني في التميز" },
    { en: "Inspiring Success", ar: "نلهم النجاح" },
    { en: "Commitment to Growth", ar: "الالتزام بالنمو" }
];

function updateHeaderQuote() {
    // Target the specific paragraph in the header
    const quoteEl = document.querySelector('.company-text p');
    if (!quoteEl) return;

    // Select a random quote
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    
    // Update attributes for the language switcher to handle later
    quoteEl.setAttribute('data-en', randomQuote.en);
    quoteEl.setAttribute('data-ar', randomQuote.ar);
    
    // Set immediate text based on current language class
    const currentLang = document.body.classList.contains('ar') ? 'ar' : 'en';
    quoteEl.textContent = randomQuote[currentLang];
}

// Replace the old startSlideshow call with initSlideshow
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    setLang(savedLang);
    
    // Show Licenses Link if Enabled
    const showDash = localStorage.getItem('config_show_licenses_dashboard') === 'true';
    
    // Sidebars
    const licLinks = document.querySelectorAll('#nav-licenses-public, #nav-licenses-public-mobile, #nav-licenses-public-header');
    licLinks.forEach(link => {
        link.style.display = showDash ? 'flex' : 'none';
        if(link.tagName === 'BUTTON') link.style.display = showDash ? 'inline-block' : 'none';
    });

    const header = document.querySelector('.brand-bar');
    const mainHeader = document.querySelector('.main-header');
    const spacer = document.querySelector('.header-spacer');
    const setSpacer = () => {
        if (header && spacer) {
            // Reduce spacer height slightly to avoid large gaps
            // We use offsetHeight but subtract a bit to tighten layout
            const totalHeight = (header.offsetHeight || 0) + (mainHeader ? mainHeader.offsetHeight : 0);
            spacer.style.height = `${totalHeight - 2}px`; // Subtract 2px for border overlap
        }
    };
    setSpacer();
    window.addEventListener('resize', setSpacer);
    const heroOverlay = document.querySelector('.hero-overlay');
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (heroOverlay && isAdmin) {
       // Admin overlay removed as per user request
    }
    updateHeaderQuote(); // Generate random motivational quote
    initSlideshow();
    window.USE_JSON = true;
    if (window.USE_JSON) {
        fetchData();
        fetchViolationsData();
        fetchBoardData();
    }
    // initAssistant(); // Removed as per request
    initAICustomerService();
});

function initAICustomerService() {
    // Check if chat window already exists
    if (document.getElementById('ai-chat-window')) return;

    // Create Chat Window (Hidden by default)
    const chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chat-window';
    
    // Better Mobile & Web Responsive Styles
    Object.assign(chatWindow.style, {
        position: 'fixed', 
        bottom: '0', 
        right: '0',
        width: '100%', 
        maxWidth: '400px', // Max width for desktop
        height: '100%', // Full height on mobile default
        maxHeight: '600px', // Max height on desktop
        background: '#16213e', 
        zIndex: '2001', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '-5px 0 25px rgba(0,0,0,0.5)',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        transform: 'translateY(110%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        visibility: 'hidden'
    });
    
    // Adjust for Desktop
    if (window.innerWidth > 768) {
        chatWindow.style.right = '20px';
        chatWindow.style.bottom = '20px';
        chatWindow.style.height = '600px';
        chatWindow.style.borderRadius = '20px';
    }

    // Bilingual Content
    const lang = localStorage.getItem('preferred-lang') || 'en';
    const isAr = lang === 'ar';
    const txt = {
        title: isAr ? 'خدمة العملاء الذكية' : 'Smart Customer Service',
        welcome: isAr ? 'مرحباً بك في شركة العليان الغذائية. كيف يمكنني مساعدتك اليوم؟' : 'Welcome to Olayan Food Services. How can I help you today?',
        placeholder: isAr ? 'اكتب استفسارك...' : 'Type your inquiry...',
        complaintBtn: isAr ? 'رفع شكوى للإدارة' : 'File a Complaint',
        complaintTitle: isAr ? 'رفع شكوى' : 'File Complaint',
        namePlace: isAr ? 'الاسم' : 'Name',
        contactPlace: isAr ? 'رقم التواصل / البريد' : 'Contact Number / Email',
        detailsPlace: isAr ? 'تفاصيل الشكوى...' : 'Complaint Details...',
        send: isAr ? 'إرسال' : 'Send',
        cancel: isAr ? 'إلغاء' : 'Cancel',
        alertFill: isAr ? 'يرجى تعبئة الاسم وتفاصيل الشكوى' : 'Please fill in Name and Details',
        alertSent: isAr ? 'تم إرسال الشكوى بنجاح للإدارة' : 'Complaint sent successfully to administration',
        msgSent: isAr ? 'تم استلام شكواك وسيتم مراجعتها من قبل الإدارة.' : 'Your complaint has been received and will be reviewed by administration.',
        autoReply: isAr ? 'شكراً لاستفسارك. سيتم الرد عليك قريباً.' : 'Thank you for your inquiry. We will respond shortly.',
        autoReplyVio: isAr ? "يمكنك الاطلاع على تفاصيل المخالفات في صفحة 'المخالفات'." : "You can check violations details on the 'Violations' page.",
        autoReplyTime: isAr ? "ساعات العمل الرسمية من 8 صباحاً حتى 6 مساءً." : "Official working hours are 8 AM to 6 PM.",
        autoReplyComp: isAr ? "لرفع شكوى، يرجى الضغط على زر 'رفع شكوى للإدارة'." : "To file a complaint, please click the 'File a Complaint' button."
    };

    chatWindow.innerHTML = `
        <div style="background:#0b0e2b; padding:15px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; border-radius: 20px 20px 0 0;">
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:1.5rem;">🤖</span>
                <span style="font-weight:bold; color:#fff;">${txt.title}</span>
            </div>
            <button id="close-chat" style="background:none; border:none; color:#a0c4ff; cursor:pointer; font-size:1.5rem; padding:0 10px;">×</button>
        </div>
        <div id="chat-messages" style="flex:1; padding:15px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; scroll-behavior: smooth;">
            <div style="background:#2d6cdf; color:#fff; padding:10px 15px; border-radius:15px 15px 0 15px; align-self:flex-end; max-width:85%; line-height:1.4;">${txt.welcome}</div>
        </div>
        <div style="padding:15px; background:#0b0e2b; display:grid; gap:10px; border-top:1px solid rgba(255,255,255,0.05); border-radius: 0 0 20px 20px;">
            <div style="display:flex; gap:10px;">
                <input type="text" id="chat-input" placeholder="${txt.placeholder}" style="flex:1; padding:12px; border-radius:12px; border:1px solid #334155; background:#1e293b; color:#fff;">
                <button id="send-btn" style="padding:0 20px; background:#00d2be; border:none; border-radius:12px; cursor:pointer; font-size:1.2rem; transition:transform 0.1s;">➤</button>
            </div>
            <button id="complaint-btn" style="width:100%; padding:10px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid #ef4444; border-radius:12px; cursor:pointer; font-weight:bold; font-size:0.9rem; transition:all 0.2s;">${txt.complaintBtn}</button>
        </div>
        
        <!-- Complaint Form Overlay -->
        <div id="complaint-form" style="position:absolute; top:0; left:0; width:100%; height:100%; background:#16213e; padding:20px; display:none; flex-direction:column; gap:15px; z-index:10; border-radius:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3 style="color:#fff; margin:0;">${txt.complaintTitle}</h3>
                <button id="cancel-comp-x" style="background:none; border:none; color:#64748b; font-size:1.5rem; cursor:pointer;">×</button>
            </div>
            <input id="comp-name" placeholder="${txt.namePlace}" style="padding:12px; background:#0f172a; border:1px solid #334155; color:#fff; border-radius:8px;">
            <input id="comp-contact" placeholder="${txt.contactPlace}" style="padding:12px; background:#0f172a; border:1px solid #334155; color:#fff; border-radius:8px;">
            <textarea id="comp-text" placeholder="${txt.detailsPlace}" style="flex:1; padding:12px; background:#0f172a; border:1px solid #334155; color:#fff; border-radius:8px; resize:none;"></textarea>
            <div style="display:flex; gap:10px;">
                <button id="submit-comp" style="flex:2; padding:12px; background:#ef4444; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">${txt.send}</button>
                <button id="cancel-comp" style="flex:1; padding:12px; background:#334155; color:#fff; border:none; border-radius:8px; cursor:pointer;">${txt.cancel}</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWindow);

    // Toggle Function
    window.toggleAIChat = function() {
        const isHidden = chatWindow.style.visibility === 'hidden' || chatWindow.style.visibility === '';
        
        if (isHidden) {
            chatWindow.style.visibility = 'visible';
            chatWindow.style.transform = 'translateY(0)';
        } else {
            chatWindow.style.transform = 'translateY(110%)';
            setTimeout(() => chatWindow.style.visibility = 'hidden', 300);
        }

        // Close Sidebar if open
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu && sideMenu.classList.contains('active')) {
            if (typeof toggleMenu === 'function') toggleMenu();
        }
    };

    // Event Listeners
    document.getElementById('close-chat').onclick = () => window.toggleAIChat();
    
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const msgs = document.getElementById('chat-messages');

    function addMsg(text, isUser = false) {
        const div = document.createElement('div');
        div.textContent = text;
        div.style.padding = '10px 15px';
        div.style.maxWidth = '85%';
        div.style.borderRadius = isUser ? '15px 15px 0 15px' : '15px 15px 15px 0';
        div.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
        div.style.background = isUser ? '#2d6cdf' : '#334155';
        div.style.color = '#fff';
        div.style.lineHeight = '1.4';
        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function handleSend() {
        const txtInput = input.value.trim();
        if (!txtInput) return;
        addMsg(txtInput, true);
        input.value = '';
        
        // Simple AI Logic
        setTimeout(() => {
            let response = txt.autoReply;
            if (txtInput.includes('مخالفة') || txtInput.includes('غرامة') || txtInput.toLowerCase().includes('violation')) response = txt.autoReplyVio;
            else if (txtInput.includes('دوام') || txtInput.includes('وقت') || txtInput.toLowerCase().includes('time')) response = txt.autoReplyTime;
            else if (txtInput.includes('شكوى') || txtInput.toLowerCase().includes('complaint')) response = txt.autoReplyComp;
            
            addMsg(response);
        }, 1000);
    }

    sendBtn.onclick = handleSend;
    input.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };

    // Complaint Logic
    const compBtn = document.getElementById('complaint-btn');
    const compForm = document.getElementById('complaint-form');
    const submitComp = document.getElementById('submit-comp');
    const cancelComp = document.getElementById('cancel-comp');
    const cancelCompX = document.getElementById('cancel-comp-x');

    compBtn.onclick = () => compForm.style.display = 'flex';
    const closeComp = () => compForm.style.display = 'none';
    cancelComp.onclick = closeComp;
    cancelCompX.onclick = closeComp;

    submitComp.onclick = () => {
        const name = document.getElementById('comp-name').value;
        const contact = document.getElementById('comp-contact').value;
        const text = document.getElementById('comp-text').value;
        
        if (!name || !text) {
            alert(txt.alertFill);
            return;
        }

        const complaint = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            name,
            contact,
            text,
            status: 'new'
        };

        const existing = safeParse('complaints', []);
        existing.push(complaint);
        localStorage.setItem('complaints', JSON.stringify(existing));

        alert(txt.alertSent);
        closeComp();
        document.getElementById('comp-name').value = '';
        document.getElementById('comp-contact').value = '';
        document.getElementById('comp-text').value = '';
        
        addMsg(txt.msgSent);
    };
}

// ==========================================
// Global Error Handler & Admin Access Control
// ==========================================

// Global Error Handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Error Caught:", message);
    
    // Avoid showing it multiple times
    if (document.getElementById('maintenance-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'maintenance-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#0b0e2b';
    overlay.style.color = '#fff';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '999999';
    overlay.style.fontFamily = 'Arial, sans-serif';
    overlay.style.textAlign = 'center';
    
    // Add content
    overlay.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">🤖</div>
        <h1 style="font-size: 2.5rem; margin-bottom: 10px;" dir="rtl">سنعود قريباً</h1>
        <h2 style="font-size: 1.2rem; color: #a0c4ff; font-weight: normal;">We Will Be Back Soon</h2>
        <p style="margin-top: 20px; color: #ff6b6b; font-size: 0.9rem; direction: ltr; font-family: monospace; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">Error: ${message}<br><small>${source}:${lineno}</small></p>
        <button onclick="document.getElementById('maintenance-overlay').remove()" style="margin-top:20px;padding:10px 20px;cursor:pointer;background:#4facfe;border:none;border-radius:5px;color:white;">Dismiss / إغلاق</button>
    `;
    
    document.body.appendChild(overlay);
    return true; 
};

// Admin Access Control
    document.addEventListener('DOMContentLoaded', () => {
        // Check if user is admin (simple localStorage check)
        const isAdmin = localStorage.getItem('isAdmin') === 'true' || localStorage.getItem('is_admin') === 'true';
        
        const adminLink = document.getElementById('admin-link');
        if (adminLink) {
             // Force show
             adminLink.style.display = 'flex'; 
        }

    
    // Elements restricted to admin
    const restrictedSelectors = [
        'a[onclick*="toggleServicesDashboard"]', // Services Dashboard Link
        '.services-modal' // The modal itself
    ];
    
    restrictedSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!isAdmin) {
                // Hide it
                el.style.display = 'none';
                el.onclick = null; // Remove interaction
            }
        });
    });
    
    // If we are on admin.html and not admin, show access denied
    if (window.location.pathname.includes('admin.html') && !isAdmin) {
         // Check if it's the login screen, we should allow access
         if(document.getElementById('login-section') && document.getElementById('login-section').style.display !== 'none') {
             // Allow
         } else {
             // It might be trying to show dashboard content
             // But admin.html handles its own display logic (login vs dashboard)
             // So this block in app.js is actually REDUNDANT and HARMFUL if it runs before admin.js sets things up.
             // We should remove this block or make it smarter.
             // Given admin.html has a login form, we should NOT block access to the file itself.
             // admin.js handles showing the login form if not authenticated.
         }
    }
    
    // Initialize Inspirational Quotes Globally
    initGlobalInspirationalQuotes();
});

// --- Global Inspirational Quotes ---
function initGlobalInspirationalQuotes() {
    const quotes = [
        { en: "Success is the sum of small efforts, repeated day-in and day-out.", ar: "النجاح هو مجموع مجهودات صغيرة تتكرر يوماً بعد يوم." },
        { en: "Don't wait for opportunity. Create it.", ar: "لا تنتظر الفرصة، بل اصنعها." },
        { en: "Excellence is not an act, but a habit.", ar: "التميز ليس فعلاً، بل هو عادة." },
        { en: "Your only limit is your mind.", ar: "حدودك الوحيدة هي عقلك." },
        { en: "Dream big and dare to fail.", ar: "احلم كبيراً وتجرأ على الفشل." },
        { en: "Quality is not an act, it is a habit.", ar: "الجودة ليست فعلاً، بل هي عادة." },
        { en: "Believe you can and you're halfway there.", ar: "آمن بأنك تستطيع وستكون قد قطعت نصف الطريق." }
    ];

    // Selectors for elements to be inspired
    // 1. .dev-badge (Admin pages)
    // 2. p tags with data-en/data-ar (Generic localized subtitles like in tasks.html)
    // 3. Special class .inspire-me (Future use)
    const selectors = ['.dev-badge', 'p[data-en][data-ar]', '.inspire-me'];
    const elements = document.querySelectorAll(selectors.join(','));

    if (elements.length === 0) return;

    elements.forEach(el => {
        // Skip if it looks like a specific value we shouldn't touch (e.g. copyright)
        // But usually data-en/ar are for labels.
        // Let's check if it's the main header subtitle which usually has short text.
        // Or we can just apply random quotes to all of them as requested.
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        el.setAttribute('data-en', `💡 ${randomQuote.en}`);
        el.setAttribute('data-ar', `💡 ${randomQuote.ar}`);
        
        // Update current text based on lang
        // Check html lang or body class
        const isAr = document.body.classList.contains('ar') || document.documentElement.lang === 'ar' || document.body.dir === 'rtl';
        
        el.textContent = isAr ? `💡 ${randomQuote.ar}` : `💡 ${randomQuote.en}`;
        
        // Optional: Add some style if it's a plain p
        if (el.tagName === 'P' && !el.classList.contains('dev-badge')) {
            el.style.transition = 'opacity 0.5s';
            // We don't force background style on main headers as it might break design
            // But we can add a subtle text shadow or color change if needed.
            // For now, just changing text is enough.
        }
    });
}
