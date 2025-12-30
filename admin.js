
// UTILS
function hash(s){ return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(b=>{ const a=Array.from(new Uint8Array(b)); return a.map(x=>x.toString(16).padStart(2,'0')).join(''); }); }
function setMsg(t){ const m=document.getElementById('msg'); if(m) m.textContent=t; }

// AUTH
async function setup(){ 
    const u=document.getElementById('username').value.trim(); 
    const p=document.getElementById('pin').value.trim(); 
    if(!u||!p){ setMsg('أدخل اسم ورقم'); return; } 
    const h=await hash(u+':'+p); 
    localStorage.setItem('admin_hash',h); 
    localStorage.setItem('admin_root_user', u); // Save root username
    setMsg('تم الحفظ بنجاح! يمكنك تسجيل الدخول الآن.'); 
}

async function login(){ 
    const u=document.getElementById('username').value.trim(); 
    const p=document.getElementById('pin').value.trim(); 
    
    // Check Root Admin
    const savedHash=localStorage.getItem('admin_hash'); 
    
    // Check Secondary Users
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const foundUser = users.find(user => user.username === u && user.pin === p); // Simple check for secondary

    if(!savedHash && !foundUser){ setMsg('لا يوجد مستخدمين. قم بالإعداد أولاً.'); return; } 

    let isAuthenticated = false;
    let currentUser = null;

    if (savedHash) {
        const h=await hash(u+':'+p); 
        if(h===savedHash) {
            isAuthenticated = true;
            currentUser = { username: u, role: 'Super Admin' };
        }
    }
    
    if (!isAuthenticated && foundUser) {
        isAuthenticated = true;
        currentUser = foundUser;
    }

    if(isAuthenticated){ 
        localStorage.setItem('is_admin','true'); 
        localStorage.setItem('current_admin_user', JSON.stringify(currentUser)); 
        setMsg('تم تسجيل الدخول...');
        setTimeout(() => checkLogin(), 500);
    } else { 
        setMsg('بيانات غير صحيحة'); 
    } 
}

function logout(){ 
    localStorage.removeItem('is_admin'); 
    localStorage.removeItem('current_admin_user');
    location.reload();
}

// INIT
document.addEventListener('DOMContentLoaded',()=>{ 
    const loginBtn = document.getElementById('login');
    const setupBtn = document.getElementById('setup');
    const logoutBtn = document.getElementById('logout');

    if(loginBtn) loginBtn.onclick=login; 
    if(setupBtn) setupBtn.onclick=setup; 
    if(logoutBtn) logoutBtn.onclick=logout; 
    
    checkLogin();
});

function checkLogin() {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const loginSection = document.getElementById('login-section');
    const adminContent = document.getElementById('admin-content');
    
    if(isAdmin) {
        if(loginSection) loginSection.style.display = 'none';
        if(adminContent) adminContent.style.display = 'flex'; // Flex for sidebar layout
        
        // Load User Info
        const userStr = localStorage.getItem('current_admin_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const nameEl = document.getElementById('admin-user-name');
            if(nameEl) nameEl.textContent = user.username;
        }

        // Load Data
        loadActivityLog();
        loadComplaints();
        loadUsers();
        loadCMSData();
        updateAdminStats();
        
        // Default Section
        showSection('dashboard');
    } else {
        if(loginSection) loginSection.style.display = 'flex';
        if(adminContent) adminContent.style.display = 'none';
    }
}

// NAVIGATION
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-content-wrapper > div').forEach(el => el.classList.add('d-none'));
    
    // Show target section
    document.getElementById('section-' + sectionId).classList.remove('d-none');
    
    // Update Sidebar Active State
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('nav-' + sectionId).classList.add('active');

    // Update Header Title
    const titles = {
        'dashboard': 'ملخص النظام',
        'users': 'إدارة المستخدمين',
        'cms': 'إعدادات البيانات (CMS)',
        'services': 'الشكاوى والطلبات'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

// USER MANAGEMENT
function loadUsers() {
    const tbody = document.getElementById('users-table-body');
    if (!tbody) return;

    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const rootUser = localStorage.getItem('admin_root_user') || 'Admin';
    
    tbody.innerHTML = '';

    // Add Root User (Visual only, cannot delete)
    const rootTr = document.createElement('tr');
    rootTr.innerHTML = `
        <td>${rootUser} <span style="font-size:0.8rem; color:#4caf50;">(أنت)</span></td>
        <td><span style="background:#e8f5e9; color:#2e7d32; padding:2px 8px; borderRadius:4px; font-size:0.8rem;">Super Admin</span></td>
        <td>-</td>
        <td><button class="btn" style="padding:2px 5px; opacity:0.5; cursor:not-allowed;" disabled>🔒</button></td>
    `;
    tbody.appendChild(rootTr);

    // Add Secondary Users
    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${user.date}</td>
            <td>
                <button onclick="deleteUser(${index})" class="btn btn-danger" style="padding: 5px 10px; font-size: 0.8rem;">حذف</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openAddUserModal() {
    // Simple prompt for now
    const name = prompt("أدخل اسم المستخدم الجديد:");
    if (!name) return;
    
    const pin = prompt("أدخل كلمة المرور:");
    if (!pin) return;

    const role = prompt("أدخل الصلاحية (مثال: مدير، مشاهد، محرر):", "مدير");
    
    addUser(name, pin, role);
}

function addUser(username, pin, role) {
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    
    // Check duplicate
    if (users.find(u => u.username === username)) {
        alert('اسم المستخدم موجود بالفعل!');
        return;
    }

    users.push({
        username,
        pin, // In real app, hash this!
        role: role || 'User',
        date: new Date().toLocaleDateString('ar-SA')
    });

    localStorage.setItem('admin_users', JSON.stringify(users));
    loadUsers();
    alert('تم إضافة المستخدم بنجاح');
}

function deleteUser(index) {
    if(!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    users.splice(index, 1);
    localStorage.setItem('admin_users', JSON.stringify(users));
    loadUsers();
}

// CMS & DATA LOGIC (Reused & Updated)
function loadCMSData() {
    const saved = localStorage.getItem('board_overrides');
    const data = saved ? JSON.parse(saved) : {}; 
    
    if (data.header_kpis) {
        if(data.header_kpis.roi) setVal('cms-roi', data.header_kpis.roi.value);
        if(data.header_kpis.effectiveness) setVal('cms-eff', data.header_kpis.effectiveness.value);
        if(data.header_kpis.risks) setVal('cms-risk', data.header_kpis.risks.value);
    }
    
    if (data.projects) {
        setVal('cms-proj-strength', data.projects[0]?.roi);
        setVal('cms-proj-weak', data.projects[1]?.roi);
        setVal('cms-proj-goal', data.projects[2]?.roi);
    }
    
    if (data.gauges) {
        setVal('cms-reg-west', data.gauges[0]?.value);
        setVal('cms-reg-cen', data.gauges[1]?.value);
        setVal('cms-reg-east', data.gauges[2]?.value);
    }
    
    if (data.stars) {
        setVal('cms-dept-it', data.stars[0]?.value);
        setVal('cms-dept-fin', data.stars[1]?.value);
        setVal('cms-dept-maint', data.stars[2]?.value);
    }
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if(el && val) el.value = val;
}

function saveCMSData() {
    const val = (id) => document.getElementById(id).value.trim();
    
    const overrides = {
        header_kpis: {
            roi: { value: val('cms-roi') || "37.8%", trend: "up", color: "#4caf50" },
            effectiveness: { value: val('cms-eff') || "93.0%", trend: "flat", color: "#FFC107" },
            risks: { value: val('cms-risk') || "12.0", trend: "down", color: "#f44336" }
        },
        financials: {
            revenue: [
               { sector: { en: "Burger King", ar: "برجر كنج" }, actual: "209.8m", target: "204.9m", var: "2.4%", trend: "up" },
               { sector: { en: "Texas Chicken", ar: "تكساس تشيكن" }, actual: "3,323m", target: "2,266m", var: "2.5%", trend: "up" },
               { sector: { en: "Buffalo Wild Wings", ar: "بافلو وايلد وينجز" }, actual: "189.5m", target: "186.6m", var: "(1.6%)", trend: "down" }
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
            { label: { en: "Maintenance", ar: "الصيانة" }, value: val('cms-dept-maint') || "90%" }
        ]
    };
    
    localStorage.setItem('board_overrides', JSON.stringify(overrides));
    
    const msg = document.getElementById('save-msg');
    if(msg) {
        msg.textContent = '✅ تم الحفظ بنجاح! سيتم تحديث اللوحة.';
        setTimeout(() => msg.textContent = '', 3000);
    }
}

function resetCMSData() {
    if(confirm('هل أنت متأكد من استعادة القيم الافتراضية؟')) {
        localStorage.removeItem('board_overrides');
        location.reload();
    }
}

// LOGS & COMPLAINTS
async function loadActivityLog() {
    const logDiv = document.getElementById('activity-log');
    if(!logDiv) return;
    
    logDiv.innerHTML = '';
    const addLog = (msg, time) => {
        const d = document.createElement('div');
        d.style.borderBottom = '1px solid #eee';
        d.style.padding = '8px 0';
        d.innerHTML = `<span style="color:var(--primary-color); font-weight:bold;">[${time}]</span> ${msg}`;
        logDiv.appendChild(d);
    };

    addLog('تسجيل دخول ناجح', new Date().toLocaleTimeString());
    
    try {
         const response = await fetch('https://api.github.com/repos/beno0o96-del/olayan-compliance-dashboard/commits?per_page=3');
         if(response.ok) {
             const data = await response.json();
             data.forEach(c => {
                 addLog(`تحديث GitHub: ${c.commit.message}`, new Date(c.commit.author.date).toLocaleTimeString());
             });
         }
    } catch(e) {
        // Silent error
    }
}

function loadComplaints() {
    const list = document.getElementById('complaints-list');
    if(!list) return;
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    list.innerHTML = '';

    if(complaints.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">لا توجد شكاوى جديدة</p>';
        return;
    }

    complaints.reverse().forEach(c => {
        const item = document.createElement('div');
        item.style.border = '1px solid #eee';
        item.style.borderRadius = '8px';
        item.style.padding = '15px';
        item.style.marginBottom = '10px';
        item.style.background = '#fff';
        
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span style="font-weight:bold; color:var(--secondary-color);">${c.name}</span>
                <span style="font-size:0.8rem; color:#888;">${c.date}</span>
            </div>
            <div style="font-size:0.9rem; color:var(--primary-color); margin-bottom:5px;">${c.contact}</div>
            <p style="background:#f9f9f9; padding:10px; border-radius:5px; margin-bottom:10px; color:#333;">${c.text}</p>
            <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button onclick="alert('سيتم فتح نافذة الرد قريباً')" class="btn btn-secondary" style="padding:5px 15px; font-size:0.8rem;">رد</button>
                <button onclick="deleteComplaint(${c.id})" class="btn btn-danger" style="padding:5px 15px; font-size:0.8rem;">حذف</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function deleteComplaint(id) {
    if(!confirm('هل أنت متأكد من حذف هذه الشكوى؟')) return;
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    complaints = complaints.filter(c => c.id !== id);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    loadComplaints();
}

// GITHUB PUBLISH (Keep existing logic but update msg target)
const REPO_OWNER = 'beno0o96-del';
const REPO_NAME = 'olayan-compliance-dashboard';
const FILE_PATH = 'board_data.json';

function saveTokenAndPublish() {
    const token = document.getElementById('gh-token').value.trim();
    if(!token && !localStorage.getItem('gh_token')) {
        alert('الرجاء إدخال التوكن');
        return;
    }
    if(token) localStorage.setItem('gh_token', token);
    performGitHubUpdate(localStorage.getItem('gh_token'));
}

async function performGitHubUpdate(token) {
    const msg = document.getElementById('save-msg');
    msg.textContent = '⏳ جاري الاتصال بـ GitHub...';
    
    try {
        const getRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        
        if(!getRes.ok) throw new Error('فشل الاتصال');
        const fileData = await getRes.json();
        
        // Use saveCMSData logic to get the object, but we need to return it, not save to local only.
        // For simplicity, let's read from localStorage which we just saved
        saveCMSData(); // Ensure local is fresh
        const overrides = JSON.parse(localStorage.getItem('board_overrides'));
        
        const jsonString = JSON.stringify(overrides, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(jsonString)));
        
        msg.textContent = '⏳ جاري رفع البيانات...';
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
                sha: fileData.sha
            })
        });
        
        if(putRes.ok) {
            msg.textContent = '✅ تم النشر بنجاح! سيظهر التحديث خلال دقيقة.';
        } else {
            throw new Error('فشل الرفع');
        }
    } catch (e) {
        msg.textContent = '❌ خطأ: ' + e.message;
        if(e.message.includes('401')) localStorage.removeItem('gh_token');
    }
}
