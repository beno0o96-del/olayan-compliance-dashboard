function hash(s){ return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(b=>{ const a=Array.from(new Uint8Array(b)); return a.map(x=>x.toString(16).padStart(2,'0')).join(''); }); }
function setMsg(t){ const m=document.getElementById('msg'); if(m) m.textContent=t; const s=document.getElementById('admin-status'); if(s) s.textContent=t; }
async function setup(){ const u=document.getElementById('username').value.trim(); const p=document.getElementById('pin').value.trim(); if(!u||!p){ setMsg('أدخل اسم ورقم'); return; } const h=await hash(u+':'+p); localStorage.setItem('admin_hash',h); setMsg('تم الحفظ'); }
async function login(){ const u=document.getElementById('username').value.trim(); const p=document.getElementById('pin').value.trim(); const saved=localStorage.getItem('admin_hash'); if(!saved){ setMsg('عيّن البيانات أولاً'); return; } const h=await hash(u+':'+p); if(h===saved){ localStorage.setItem('is_admin','true'); localStorage.setItem('admin_user',u); setMsg('تم تسجيل الدخول'); } else { setMsg('بيانات غير صحيحة'); } }
function logout(){ 
    localStorage.removeItem('is_admin'); 
    setMsg('تم تسجيل الخروج'); 
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

document.addEventListener('DOMContentLoaded',()=>{ 
    document.getElementById('login').onclick=login; 
    document.getElementById('setup').onclick=setup; 
    document.getElementById('logout').onclick=logout; 
    
    checkLogin();
});

function checkLogin() {
    const a=localStorage.getItem('is_admin')==='true'; 
    setMsg(a?'أنت مسجّل كأدمن':'غير مسجّل');
    if(a) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        loadActivityLog();
        loadComplaints();
        loadCMSData(); // Load data into inputs
        fetchBoardData(); // Render the board
    } else {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
    }
}

// CMS LOGIC
function loadCMSData() {
    // Attempt to load from localStorage or fall back to Board Data (which app.js handles)
    // We wait for fetchBoardData to populate FALLBACK_BOARD or fetched data first?
    // Actually, we can read what's in localStorage directly.
    
    const saved = localStorage.getItem('board_overrides');
    const data = saved ? JSON.parse(saved) : {}; // Empty if nothing saved
    
    // If empty, we might want to populate inputs from the current live data? 
    // But getting live data is async. 
    // Let's rely on placeholders or leave empty if not overridden.
    
    if (data.header_kpis) {
        if(data.header_kpis.roi) document.getElementById('cms-roi').value = data.header_kpis.roi.value;
        if(data.header_kpis.effectiveness) document.getElementById('cms-eff').value = data.header_kpis.effectiveness.value;
        if(data.header_kpis.risks) document.getElementById('cms-risk').value = data.header_kpis.risks.value;
    }
    
    if (data.projects) {
        document.getElementById('cms-proj-strength').value = data.projects[0]?.roi || '';
        document.getElementById('cms-proj-weak').value = data.projects[1]?.roi || '';
        document.getElementById('cms-proj-goal').value = data.projects[2]?.roi || '';
    }
    
    if (data.gauges) {
        document.getElementById('cms-reg-west').value = data.gauges[0]?.value || '';
        document.getElementById('cms-reg-cen').value = data.gauges[1]?.value || '';
        document.getElementById('cms-reg-east').value = data.gauges[2]?.value || '';
    }
    
    if (data.stars) {
        document.getElementById('cms-dept-it').value = data.stars[0]?.value || '';
        document.getElementById('cms-dept-fin').value = data.stars[1]?.value || '';
        document.getElementById('cms-dept-hr').value = data.stars[2]?.value || '';
    }
}

function saveCMSData() {
    // Construct the object structure matching board_data.json
    // We only save what we want to override.
    
    // Helper to get value
    const val = (id) => document.getElementById(id).value.trim();
    
    const overrides = {
        header_kpis: {
            roi: { value: val('cms-roi') || "37.8%", trend: "up", color: "#4caf50" },
            effectiveness: { value: val('cms-eff') || "93.0%", trend: "flat", color: "#FFC107" },
            risks: { value: val('cms-risk') || "12.0", trend: "down", color: "#f44336" }
        },
        projects: [
            { name: { en: "Strengths", ar: "نقاط القوة" }, roi: val('cms-proj-strength') || "14.5%", color: "#4caf50", petals: [1, 0.8, 1.1, 0.9, 1.2] },
            { name: { en: "Weaknesses", ar: "نقاط الضعف" }, roi: val('cms-proj-weak') || "11.2%", color: "#a0c4ff", petals: [0.9, 1.1, 0.8, 1.0, 0.9] },
            { name: { en: "Goal", ar: "الهدف" }, roi: val('cms-proj-goal') || "18.1%", color: "#FFC107", petals: [1.2, 1.2, 1.1, 1.3, 1.2] }
        ],
        gauges: [
            { label: { en: "Western", ar: "الغربية" }, value: val('cms-reg-west') || "67%", p: parseInt(val('cms-reg-west')) + "deg" },
            { label: { en: "Central", ar: "الوسطى" }, value: val('cms-reg-cen') || "85%", p: parseInt(val('cms-reg-cen')) + "deg" },
            { label: { en: "Eastern", ar: "الشرقية" }, value: val('cms-reg-east') || "92%", p: parseInt(val('cms-reg-east')) + "deg" }
        ],
        stars: [
            { label: { en: "IT", ar: "التقنية" }, value: val('cms-dept-it') || "77%" },
            { label: { en: "Finance", ar: "المالية" }, value: val('cms-dept-fin') || "83%" },
            { label: { en: "HR", ar: "الموارد البشرية" }, value: val('cms-dept-hr') || "90%" }
        ]
    };
    
    localStorage.setItem('board_overrides', JSON.stringify(overrides));
    
    document.getElementById('save-msg').textContent = 'تم الحفظ بنجاح! جاري التحديث...';
    
    // Refresh the view
    fetchBoardData();
    
    setTimeout(() => {
        document.getElementById('save-msg').textContent = '';
    }, 2000);
}

function resetCMSData() {
    if(confirm('هل أنت متأكد من استعادة القيم الافتراضية؟')) {
        localStorage.removeItem('board_overrides');
        location.reload();
    }
}

// GITHUB PUBLISH LOGIC
const REPO_OWNER = 'beno0o96-del';
const REPO_NAME = 'olayan-compliance-dashboard';
const FILE_PATH = 'board_data.json';

function publishToGitHub() {
    const token = localStorage.getItem('gh_token');
    if(!token) {
        document.getElementById('github-auth-area').style.display = 'block';
        return;
    }
    
    performGitHubUpdate(token);
}

function saveTokenAndPublish() {
    const token = document.getElementById('gh-token').value.trim();
    if(!token) {
        alert('الرجاء إدخال التوكن');
        return;
    }
    localStorage.setItem('gh_token', token);
    document.getElementById('github-auth-area').style.display = 'none';
    performGitHubUpdate(token);
}

async function performGitHubUpdate(token) {
    const msg = document.getElementById('save-msg');
    msg.textContent = 'جاري الاتصال بـ GitHub...';
    
    try {
        // 1. Get current SHA of the file
        const getRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if(!getRes.ok) throw new Error('فشل الاتصال بـ GitHub. تأكد من التوكن.');
        const fileData = await getRes.json();
        const sha = fileData.sha;
        
        // 2. Prepare new content
        // We need to construct the FULL json object.
        // First, fetch the ORIGINAL board_data.json logic to get base structure?
        // Or better, just use what we have in memory + overrides.
        // Wait, 'data' in fetchBoardData is local variable. We need to reconstruct it.
        
        // Let's reconstruct the full object based on current inputs (which represent the desired state)
        // Note: This assumes inputs are populated.
        
        // Helper to get value
        const val = (id) => document.getElementById(id).value.trim();
        
        const newContent = {
            header_kpis: {
                roi: { value: val('cms-roi') || "37.8%", trend: "up", color: "#4caf50" },
                effectiveness: { value: val('cms-eff') || "93.0%", trend: "flat", color: "#FFC107" },
                risks: { value: val('cms-risk') || "12.0", trend: "down", color: "#f44336" }
            },
            financials: {
                revenue: [
                   { sector: "Retail", actual: "4.2M", target: "4.0M", var: "+5%", trend: "up" },
                   { sector: "Logistics", actual: "2.8M", target: "3.1M", var: "-9%", trend: "down" }
                ],
                expenses: [] 
            },
            projects: [
                { name: { en: "Strengths", ar: "نقاط القوة" }, roi: val('cms-proj-strength') || "14.5%", color: "#4caf50", petals: [1, 0.8, 1.1, 0.9, 1.2] },
                { name: { en: "Weaknesses", ar: "نقاط الضعف" }, roi: val('cms-proj-weak') || "11.2%", color: "#a0c4ff", petals: [0.9, 1.1, 0.8, 1.0, 0.9] },
                { name: { en: "Goal", ar: "الهدف" }, roi: val('cms-proj-goal') || "18.1%", color: "#FFC107", petals: [1.2, 1.2, 1.1, 1.3, 1.2] }
            ],
            gauges: [
                { label: { en: "Western", ar: "الغربية" }, value: val('cms-reg-west') || "67%", p: parseInt(val('cms-reg-west')) + "deg" },
                { label: { en: "Central", ar: "الوسطى" }, value: val('cms-reg-cen') || "85%", p: parseInt(val('cms-reg-cen')) + "deg" },
                { label: { en: "Eastern", ar: "الشرقية" }, value: val('cms-reg-east') || "92%", p: parseInt(val('cms-reg-east')) + "deg" }
            ],
            stars: [
                { label: { en: "IT", ar: "التقنية" }, value: val('cms-dept-it') || "77%" },
                { label: { en: "Finance", ar: "المالية" }, value: val('cms-dept-fin') || "83%" },
                { label: { en: "HR", ar: "الموارد البشرية" }, value: val('cms-dept-hr') || "90%" }
            ]
        };
        
        // Encode to Base64
        // Unicode problem with btoa: need to escape first
        const jsonString = JSON.stringify(newContent, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(jsonString)));
        
        // 3. PUT update
        msg.textContent = 'جاري رفع البيانات...';
        const putRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Update board data via Admin CMS",
                content: encodedContent,
                sha: sha
            })
        });
        
        if(putRes.ok) {
            msg.textContent = '✅ تم النشر بنجاح! قد يستغرق التحديث دقيقة للظهور.';
            // Clear overrides since now live is updated? 
            // Maybe keep them to be safe.
        } else {
            const err = await putRes.json();
            throw new Error('فشل الرفع: ' + (err.message || 'خطأ غير معروف'));
        }
        
    } catch (e) {
        msg.textContent = '❌ خطأ: ' + e.message;
        if(e.message.includes('401') || e.message.includes('credentials')) {
            localStorage.removeItem('gh_token');
            document.getElementById('github-auth-area').style.display = 'block';
        }
    }
}



async function loadActivityLog() {
    const logDiv = document.getElementById('activity-log');
    if(!logDiv) return;
    
    logDiv.innerHTML = '';
    const addLog = (msg, time) => {
        const d = document.createElement('div');
        d.style.borderBottom = '1px solid #333';
        d.style.padding = '5px 0';
        d.innerHTML = `<span style="color:#00d2be">[${time}]</span> ${msg}`;
        logDiv.appendChild(d);
    };

    // 1. Add Login Event
    addLog('Admin Login Successful', new Date().toLocaleTimeString());

    // 2. Fetch OneDrive Status (Simulated from existing logic)
    try {
        if (window.OD_CONFIG && window.OD_CONFIG.enabled) {
             addLog('Checking OneDrive Link...', 'System');
             // We can re-use logic if needed, or just show status
             addLog(`OneDrive Config: Enabled`, 'System');
        }
    } catch(e) {
        addLog('Error checking OneDrive', 'System');
    }

    // 3. GitHub Activity
    try {
         const response = await fetch('https://api.github.com/repos/beno0o96-del/olayan-compliance-dashboard/commits?per_page=3');
         if(response.ok) {
             const data = await response.json();
             data.forEach(c => {
                 addLog(`GitHub Update: ${c.commit.message} by ${c.commit.author.name}`, new Date(c.commit.author.date).toLocaleString());
             });
         }
    } catch(e) {
        addLog('Could not fetch GitHub logs', 'System');
    }
}

function loadComplaints() {
    const list = document.getElementById('complaints-list');
    if(!list) return;
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    list.innerHTML = '';

    if(complaints.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888;">لا توجد شكاوى جديدة</p>';
        return;
    }

    complaints.reverse().forEach(c => {
        const item = document.createElement('div');
        item.className = 'data-card';
        item.style.border = '1px solid rgba(255,255,255,0.1)';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span style="font-weight:bold; color:#fff;">${c.name}</span>
                <span style="font-size:0.8rem; color:#aaa;">${c.date}</span>
            </div>
            <div style="font-size:0.9rem; color:#a0c4ff; margin-bottom:5px;">${c.contact}</div>
            <p style="background:#0b0e2b; padding:10px; border-radius:5px; margin-bottom:10px;">${c.text}</p>
            <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button onclick="openReplyModal(${c.id}, '${c.name}')" style="background:#0078d4; color:#fff; border:none; padding:5px 15px; border-radius:4px; cursor:pointer;">رد</button>
                <button onclick="deleteComplaint(${c.id})" style="background:#c62828; color:#fff; border:none; padding:5px 15px; border-radius:4px; cursor:pointer;">حذف</button>
            </div>
        `;
        list.appendChild(item);
    });
}

let currentReplyId = null;

function openReplyModal(id, name) {
    currentReplyId = id;
    document.getElementById('reply-modal').style.display = 'flex';
    document.getElementById('reply-to-info').textContent = `الرد على: ${name}`;
}

function closeReplyModal() {
    document.getElementById('reply-modal').style.display = 'none';
    currentReplyId = null;
}

function sendReply() {
    const text = document.getElementById('reply-text').value;
    if(!text) return;
    
    // In a real app, this would send an email or API request.
    // Here we just simulate it.
    alert(`تم إرسال الرد بنجاح إلى صاحب الشكوى (ID: ${currentReplyId})\n\nمحتوى الرد: ${text}`);
    
    closeReplyModal();
    document.getElementById('reply-text').value = '';
}

function deleteComplaint(id) {
    if(!confirm('هل أنت متأكد من حذف هذه الشكوى؟')) return;
    
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    complaints = complaints.filter(c => c.id !== id);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    loadComplaints();
}
