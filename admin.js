
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
    const langArBtn = document.getElementById('btn-lang-ar');
    const langEnBtn = document.getElementById('btn-lang-en');

    if(loginBtn) loginBtn.onclick=login; 
    if(setupBtn) setupBtn.onclick=setup; 
    if(logoutBtn) logoutBtn.onclick=logout; 
    if(langArBtn) langArBtn.onclick=()=>setAdminLang('ar');
    if(langEnBtn) langEnBtn.onclick=()=>setAdminLang('en');
    
    checkLogin();
    applyAdminLang();
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
        
        // Initial Employee Load
        loadEmployeesFromCSV();
        
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
        'dashboard': 'الرئيسية',
        'users': 'الأعضاء',
        'employees': 'الموظفين',
        'cms': 'إعدادات البيانات (CMS)',
        'services': 'الشكاوى والطلبات',
        'media': 'وسائط',
        'pages': 'صفحات',
        'comments': 'تعليقات',
        'appearance': 'مظهر',
        'plugins': 'إضافات',
        'tools': 'أدوات',
        'settings': 'الإعدادات',
        'email': 'ايميل'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

function setAdminLang(lang){
    localStorage.setItem('admin_lang', lang);
    applyAdminLang();
}

function applyAdminLang(){
    const lang = localStorage.getItem('admin_lang') || 'ar';
    document.body.classList.toggle('ar', lang==='ar');
    document.dir = lang==='ar' ? 'rtl' : 'ltr';
    const t = {
        ar: {
            pageTitles: { dashboard:'الرئيسية', users:'الأعضاء', employees:'الموظفين', cms:'إعدادات البيانات (CMS)', services:'الشكاوى والطلبات', media:'وسائط', pages:'صفحات', comments:'تعليقات', appearance:'مظهر', plugins:'إضافات', tools:'أدوات', settings:'الإعدادات', email:'ايميل' },
            th: { emp:'الموظف', iqama:'رقم الهوية/الإقامة', brand:'العلامة التجارية', branch:'الفرع', region:'المنطقة', health:'الشهادة الصحية', training:'حالة التدريب', view:'عرض' },
            labels: { name:'الاسم', iqama:'رقم الهوية/الإقامة', brand:'العلامة التجارية', branch:'الفرع', region:'المنطقة', health:'انتهاء الصحية', train1:'تدريب 1', train2:'تدريب 2', email:'البريد الإلكتروني' },
            buttons: { save:'حفظ', cancel:'إلغاء' }
        },
        en: {
            pageTitles: { dashboard:'Dashboard', users:'Users', employees:'Employees', cms:'Data Settings (CMS)', services:'Complaints', media:'Media', pages:'Pages', comments:'Comments', appearance:'Appearance', plugins:'Plugins', tools:'Tools', settings:'Settings', email:'Email' },
            th: { emp:'Employee', iqama:'ID/Iqama', brand:'Brand', branch:'Branch', region:'Region', health:'Health Card', training:'Training', view:'View' },
            labels: { name:'Name', iqama:'ID/Iqama', brand:'Brand', branch:'Branch', region:'Region', health:'Health Expiry', train1:'Training 1', train2:'Training 2', email:'Email' },
            buttons: { save:'Save', cancel:'Cancel' }
        }
    }[lang];
    const mapTh = { emp:'th-emp', iqama:'th-iqama', brand:'th-brand', branch:'th-branch', region:'th-region', health:'th-health', training:'th-training', view:'th-view' };
    Object.keys(mapTh).forEach(k=>{
        const el = document.getElementById(mapTh[k]);
        if(el) el.textContent = t.th[k];
    });
    const mapLbl = { name:'lbl-name', iqama:'lbl-iqama', brand:'lbl-brand', branch:'lbl-branch', region:'lbl-region', health:'lbl-health', train1:'lbl-train1', train2:'lbl-train2', email:'lbl-email' };
    Object.keys(mapLbl).forEach(k=>{
        const el = document.getElementById(mapLbl[k]);
        if(el) el.textContent = t.labels[k];
    });
    const btnSave = document.getElementById('btn-save-emp');
    const btnCancel = document.getElementById('btn-close-emp');
    if(btnSave) btnSave.textContent = t.buttons.save;
    if(btnCancel) btnCancel.textContent = t.buttons.cancel;
}

// --- EMPLOYEES LOGIC ---

async function loadEmployeesFromCSV() {
    try {
        const response = await fetch('Data.csv');
        if (!response.ok) throw new Error('CSV file not found');
        const text = await response.text();
        const data = parseCSV(text);

        if (data && data.length > 0) {
            // Transform CSV data to Employee object structure
            // CSV Indices:
            // 2: ID#, 3: Name, 4: Band, 5: Cost center, 9: Training End, 10: Status1, 12: Health Exp, 13: Status2, 16: Region, 20: Email
            const employees = data.map((row, index) => {
                const branchRaw = row[5] || '';
                // Attempt to extract branch name from "Code - Band - Name" format
                let branchName = branchRaw;
                if (branchRaw.includes('-')) {
                    const parts = branchRaw.split('-');
                    if (parts.length >= 3) branchName = parts.slice(2).join('-').trim();
                    else if (parts.length === 2) branchName = parts[1].trim();
                }

                return {
                    id: (index + 1).toString(),
                    name: row[3] || '',
                    iqama: row[2] || '',
                    brand: row[4] || '',
                    branch: branchName,
                    region: row[16] || '',
                    health_expiry: row[12] || '', 
                    train_status_1: row[10] || '',
                    train_status_2: row[13] || '',
                    training_end: row[9] || '',
                    email: row[20] || ''
                };
            }).filter(e => e.name && e.name.trim() !== '' && e.iqama); // Filter empty rows

            localStorage.setItem('admin_employees', JSON.stringify(employees));
            extractBranchesFromData(employees);
            loadEmployees();
            console.log(`Loaded ${employees.length} employees from CSV`);
        }
    } catch (err) {
        console.error('CSV Load Error:', err);
        // Fallback to existing local storage if CSV fails
        loadEmployees();
    }
}

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        // Robust CSV Split (handles commas in quotes)
        const row = [];
        let inQuote = false;
        let currentField = '';
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                row.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        row.push(currentField.trim());
        result.push(row);
    }
    return result;
}

function extractBranchesFromData(employees) {
    const branches = [...new Set(employees.map(e => e.branch).filter(b => b))];
    localStorage.setItem('admin_branches', JSON.stringify(branches));
}

function generateRandomEmployees() {
    if (!confirm('سيتم مسح البيانات الحالية وتوليد بيانات عشوائية جديدة. هل أنت متأكد؟')) return;

    const names = ["محمد علي", "فهد السالم", "خالد العتيبي", "سعيد القحطاني", "عمر الدوسري", "ياسر الشمري", "أحمد الحربي", "عبدالله العنزي", "تركي المطيري", "سلطان المالكي"];
    const branches = ["الرياض - العليا", "الرياض - الملز", "جدة - التحلية", "الدمام - الكورنيش", "مكة - العزيزية", "المدينة - الدائري", "الطائف - شهار", "أبها - الحزام"];
    const positions = ["مدير فرع", "كاشير", "مشرف صالة", "طباخ", "محاسب", "أمن وسلامة", "خدمة عملاء"];
    const regions = ["الوسطى", "الغربية", "الشرقية", "الجنوبية", "الشمالية"];
    const brands = ["BK", "TC", "BWW"];

    const employees = [];
    
    for (let i = 0; i < 50; i++) {
        const today = new Date();
        const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

        const healthExp = randomDate(new Date(2023, 0, 1), new Date(2026, 0, 1));
        const train1Status = Math.random() > 0.2 ? "Valid" : "Expired";
        const train2Status = Math.random() > 0.3 ? "Valid" : "Expired";

        employees.push({
            id: (1000 + i).toString(),
            name: names[Math.floor(Math.random() * names.length)],
            iqama: "2" + Math.floor(Math.random() * 1000000000),
            brand: brands[Math.floor(Math.random() * brands.length)],
            branch: branches[Math.floor(Math.random() * branches.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            health_expiry: healthExp,
            train_status_1: train1Status,
            train_status_2: train2Status
        });
    }

    localStorage.setItem('admin_employees', JSON.stringify(employees));
    loadEmployees();
    alert('تم توليد 50 موظف بنجاح!');
}

function loadEmployees(filterText = "") {
    const tbody = document.getElementById('employees-table-body');
    if (!tbody) return;

    let employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    
    // Auto-generate if empty (and no CSV loaded yet)
    if (employees.length === 0) {
        // Optional: Trigger random generation if needed, but better to wait for CSV
        // generateRandomEmployees(); 
    }

    tbody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    employees.forEach(emp => {
        // Filter Logic
        if (filterText) {
            const txt = filterText.toLowerCase();
            const match = (emp.name && emp.name.toLowerCase().includes(txt)) || 
                          (emp.iqama && emp.iqama.includes(txt)) || 
                          (emp.branch && emp.branch.toLowerCase().includes(txt));
            if (!match) return;
        }

        const tr = document.createElement('tr');
        
        // Health Date Check
        const isHealthExpired = emp.health_expiry < today;
        const healthStyle = isHealthExpired ? 'color: #ef4444; font-weight: bold;' : 'color: #22c55e;';
        
        // Training Check (L1)
        const t1Style = emp.train_status_1 && emp.train_status_1.toLowerCase().includes('valid') ? 'background: #dcfce7; color: #15803d;' : 'background: #fee2e2; color: #b91c1c;';
        
        // Training Check (L2) - assuming similar logic or just display
        const t2Style = emp.train_status_2 && emp.train_status_2.toLowerCase().includes('valid') ? 'background: #dcfce7; color: #15803d;' : 'background: #fee2e2; color: #b91c1c;';

        tr.innerHTML = `
            <td style="font-weight:bold;">${emp.name}</td>
            <td>${emp.iqama}</td>
            <td><span class="badge badge-brand">${emp.brand}</span></td>
            <td>${emp.branch}</td>
            <td>${emp.region}</td>
            <td style="${healthStyle}">${emp.health_expiry} ${isHealthExpired ? '⚠️' : ''}</td>
            <td>
                <div style="font-size:0.75rem;">L1: <span style="padding: 1px 4px; border-radius: 3px; ${t1Style}">${emp.train_status_1}</span></div>
                <div style="font-size:0.75rem; margin-top:2px;">L2: <span style="padding: 1px 4px; border-radius: 3px; ${t2Style}">${emp.train_status_2}</span></div>
            </td>
            <td>
                <button class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.8rem;" onclick="viewEmployee('${emp.iqama}')">👁️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Update Counter
    const countEl = document.getElementById('emp-pagination');
    if (countEl) countEl.textContent = `عرض ${tbody.children.length} من أصل ${employees.length} موظف`;
}

function viewEmployee(iqama) {
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    const emp = employees.find(e=>e.iqama===iqama);
    if(!emp) return;
    const initials = (emp.name||'').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    const color = getEmpColor(emp);
    const banner = document.getElementById('emp-banner');
    const avatar = document.getElementById('emp-avatar');
    const nameD = document.getElementById('emp-name-display');
    const roleD = document.getElementById('emp-role-display');
    const idD = document.getElementById('emp-id-display');
    const m = document.getElementById('employee-modal');
    if(banner) banner.style.background = `linear-gradient(135deg, ${color}, #0b0e2b)`;
    if(avatar){ avatar.textContent = initials; avatar.style.background = color; }
    if(nameD) nameD.textContent = emp.name||'';
    if(roleD) roleD.textContent = emp.brand||'';
    if(idD) idD.textContent = `ID: ${emp.id||'-'}`;
    const set = (id,val)=>{ const el=document.getElementById(id); if(el) el.value = val||''; };
    set('emp-name', emp.name);
    set('emp-iqama', emp.iqama);
    set('emp-brand', emp.brand);
    set('emp-branch', emp.branch);
    set('emp-region', emp.region);
    set('emp-health', emp.health_expiry);
    set('emp-train1', emp.train_status_1);
    set('emp-train2', emp.train_status_2);
    set('emp-email', emp.email);
    if(m) m.style.display = 'flex';
}

function filterEmployees(text) {
    loadEmployees(text);
}

// Attach event listener to search input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('emp-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterEmployees(e.target.value));
    }
});

function sortEmployees(key) {
    // Sort logic implementation if needed
}

function exportEmployees() {
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Arabic support
    csvContent += "الاسم,رقم الإقامة,العلامة التجارية,الفرع,المنطقة,انتهاء الصحية,تدريب 1,تدريب 2\n";

    employees.forEach(e => {
        csvContent += `"${e.name}","${e.iqama}","${e.brand}","${e.branch}","${e.region}","${e.health_expiry}","${e.train_status_1}","${e.train_status_2}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees_data_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getEmpColor(emp){
    const brand = (emp.brand||'').toUpperCase();
    const region = emp.region||'';
    if(brand==='BK') return '#f5c518';
    if(brand==='TC') return '#e11d48';
    if(brand==='BWW') return '#f59e0b';
    if(region.includes('الوسطى')||region.toLowerCase().includes('central')) return '#60a5fa';
    if(region.includes('الغربية')||region.toLowerCase().includes('west')) return '#10b981';
    if(region.includes('الشرقية')||region.toLowerCase().includes('east')) return '#a78bfa';
    return '#4facfe';
}

document.addEventListener('DOMContentLoaded', ()=>{
    const closeBtn = document.getElementById('btn-close-emp');
    const saveBtn = document.getElementById('btn-save-emp');
    const modal = document.getElementById('employee-modal');
    if(closeBtn) closeBtn.onclick = ()=>{ if(modal) modal.style.display='none'; };
    if(saveBtn) saveBtn.onclick = saveEmployeeChanges;
});

function saveEmployeeChanges(){
    const iqama = document.getElementById('emp-iqama').value.trim();
    let employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    const idx = employees.findIndex(e=>e.iqama===iqama);
    if(idx===-1) return;
    employees[idx] = {
        ...employees[idx],
        name: document.getElementById('emp-name').value.trim(),
        brand: document.getElementById('emp-brand').value.trim(),
        branch: document.getElementById('emp-branch').value.trim(),
        region: document.getElementById('emp-region').value.trim(),
        health_expiry: document.getElementById('emp-health').value.trim(),
        train_status_1: document.getElementById('emp-train1').value.trim(),
        train_status_2: document.getElementById('emp-train2').value.trim(),
        email: document.getElementById('emp-email').value.trim()
    };
    localStorage.setItem('admin_employees', JSON.stringify(employees));
    const modal = document.getElementById('employee-modal');
    if(modal) modal.style.display='none';
    loadEmployees();
    alert('تم حفظ بيانات الموظف');
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

// GITHUB PUBLISH
function saveTokenAndPublish() {
    const tokenInput = document.getElementById('gh-token').value.trim();
    const token = tokenInput || localStorage.getItem('gh_token');
    if(!token){
        alert('يرجى إدخال Token!');
        return;
    }
    localStorage.setItem('gh_token', token);
    const msgEl = document.getElementById('save-msg');
    const setMsg = (t) => { if (msgEl) { msgEl.textContent = t; } };
    setMsg('جاري تجهيز البيانات للنشر...');

    try {
        const val = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : '';
        };

        const header_kpis = {
            roi: { value: val('cms-roi') || "37.8%", trend: "up", color: "#4caf50" },
            effectiveness: { value: val('cms-eff') || "93.0%", trend: "flat", color: "#FFC107" },
            risks: { value: val('cms-risk') || "12.0", trend: "down", color: "#f44336" }
        };

        const gauges = [
            { label: { en: "Western", ar: "الغربية" }, value: val('cms-reg-west') || "67%", p: (parseInt(val('cms-reg-west')) || 67) + "deg" },
            { label: { en: "Central", ar: "الوسطى" }, value: val('cms-reg-cen') || "85%", p: (parseInt(val('cms-reg-cen')) || 85) + "deg" },
            { label: { en: "Eastern", ar: "الشرقية" }, value: val('cms-reg-east') || "92%", p: (parseInt(val('cms-reg-east')) || 92) + "deg" }
        ];

        const projects = [
            { name: { en: "Strengths", ar: "نقاط القوة" }, roi: val('cms-proj-strength') || "14.5%", color: "#4caf50", petals: [1, 0.8, 1.1, 0.9, 1.2] },
            { name: { en: "Weaknesses", ar: "نقاط الضعف" }, roi: val('cms-proj-weak') || "11.2%", color: "#a0c4ff", petals: [0.9, 1.1, 0.8, 1.0, 0.9] },
            { name: { en: "Goal", ar: "الهدف" }, roi: val('cms-proj-goal') || "18.1%", color: "#FFC107", petals: [1.2, 1.2, 1.1, 1.3, 1.2] }
        ];

        const stars = [
            { label: { en: "IT", ar: "التقنية" }, value: val('cms-dept-it') || "77%" },
            { label: { en: "Finance", ar: "المالية" }, value: val('cms-dept-fin') || "83%" },
            { label: { en: "Maintenance", ar: "الصيانة" }, value: val('cms-dept-maint') || "90%" }
        ];

        const financials = {
            revenue: [
                { sector: { en: "Burger King", ar: "برجر كنج" }, actual: "209.8m", target: "204.9m", var: "2.4%", trend: "up" },
                { sector: { en: "Texas Chicken", ar: "تكساس تشيكن" }, actual: "3,323m", target: "2,266m", var: "2.5%", trend: "up" },
                { sector: { en: "Buffalo Wild Wings", ar: "بافلو وايلد وينجز" }, actual: "189.5m", target: "186.6m", var: "(1.6%)", trend: "down" }
            ],
            expenses: [
                { type: { en: "Municipal", ar: "البلدية" }, actual: "2,156", budget: "2,058", var: "(4.8%)", trend: "down" },
                { type: { en: "Labor Office", ar: "مكتب العمل" }, actual: "410.5", budget: "393.2", var: "4.4%", trend: "up" },
                { type: { en: "Civil Defense", ar: "الدفاع المدني" }, actual: "264.3", budget: "255.9", var: "3.3%", trend: "up" }
            ]
        };

        const boardData = {
            header_kpis,
            financials,
            projects,
            gauges,
            stars
        };

        const owner = 'beno0o96-del';
        const repo = 'olayan-compliance-dashboard';
        const path = 'board_data.json';
        const commitMsg = `Data Sync via Admin: ${new Date().toISOString()}`;

        const encodeBase64 = (obj) => {
            const jsonStr = JSON.stringify(obj, null, 2);
            return btoa(unescape(encodeURIComponent(jsonStr)));
        };

        const contentB64 = encodeBase64(boardData);

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json'
        };

        const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        fetch(getUrl, { headers })
            .then(r => r.json())
            .then(meta => {
                const sha = meta && meta.sha ? meta.sha : undefined;
                const body = {
                    message: commitMsg,
                    content: contentB64,
                    sha
                };
                return fetch(getUrl, {
                    method: 'PUT',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            })
            .then(resp => {
                if (!resp.ok) throw new Error('GitHub publish failed');
                return resp.json();
            })
            .then(() => {
                setMsg('✅ تم تحديث البيانات في المستودع (board_data.json)');
                setTimeout(() => setMsg(''), 4000);
            })
            .catch(err => {
                console.error(err);
                setMsg('❌ فشل النشر إلى GitHub. تحقق من الـ Token أو الصلاحيات.');
            });
    } catch (e) {
        console.error(e);
        setMsg('❌ حدث خطأ أثناء تجهيز البيانات للنشر.');
    }
}
