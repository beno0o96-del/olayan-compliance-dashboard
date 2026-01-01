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

function togglePassword() {
    const pin = document.getElementById('pin');
    const icon = document.getElementById('toggle-password');
    if (pin.type === 'password') {
        pin.type = 'text';
        // SVG for Crossed Eye (Hide)
        if(icon) icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    } else {
        pin.type = 'password';
        // SVG for Eye (Show)
        if(icon) icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    }
}

async function login(){ 
    const u=document.getElementById('username').value.trim(); 
    const p=document.getElementById('pin').value.trim(); 

    // Default Credentials (Fallback)
    if (u === 'admin' && p === '123456') {
        localStorage.setItem('is_admin','true'); 
        localStorage.setItem('current_admin_user', JSON.stringify({ username: 'admin', role: 'Super Admin' })); 
        setMsg('تم تسجيل الدخول (Default)...');
        setTimeout(() => checkLogin(), 500);
        return;
    }
    
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

function forgotPassword() {
    alert(document.documentElement.lang === 'ar' ? 
        'يرجى التواصل مع الدعم الفني لإعادة تعيين كلمة المرور.' : 
        'Please contact technical support to reset your password.');
}

// INIT
document.addEventListener('DOMContentLoaded',()=>{ 
    const loginBtn = document.getElementById('login');
    const setupBtn = document.getElementById('setup');
    const logoutBtn = document.getElementById('logout');
    // Corrected IDs for language buttons
    const langArBtn = document.getElementById('login-lang-ar');
    const langEnBtn = document.getElementById('login-lang-en');
    const btnModeMerge = document.getElementById('btn-mode-merge');
    const btnModeReplace = document.getElementById('btn-mode-replace');
    const btnModeMergeCms = document.getElementById('btn-mode-merge-cms');
    const btnModeReplaceCms = document.getElementById('btn-mode-replace-cms');
    const chkShowUpdateTime = document.getElementById('chk-show-update-time');
    const selDateFormat = document.getElementById('sel-date-format');
    const btnBranchSave = document.getElementById('btn-branch-save');
    const btnBranchNew = document.getElementById('btn-branch-new');
    const btnBranchExport = document.getElementById('btn-branch-export');
    const btnBranchImport = document.getElementById('btn-branch-import');
    const brJsonFile = document.getElementById('br-json-file');
    const btnBranchImportText = document.getElementById('btn-branch-import-text');
    const btnControlMenu = document.getElementById('btn-control-menu');
    const controlMenu = document.getElementById('control-menu');
    const btnChangePhoto = document.getElementById('btn-change-photo');
    const empPhotoInput = document.getElementById('emp-photo');
    const forgotBtn = document.getElementById('forgot-pass-link');
    const toggleBtn = document.getElementById('toggle-password');

    if(loginBtn) loginBtn.onclick=login; 
    if(setupBtn) setupBtn.onclick=setup; 
    if(logoutBtn) logoutBtn.onclick=logout; 
    if(forgotBtn) forgotBtn.onclick=forgotPassword;
    if(toggleBtn) toggleBtn.onclick=togglePassword;
    if(langArBtn) langArBtn.onclick=()=>setAdminLang('ar');
    if(langEnBtn) langEnBtn.onclick=()=>setAdminLang('en');
    if(btnModeMerge) btnModeMerge.onclick=()=>setMergeMode('merge');
    if(btnModeReplace) btnModeReplace.onclick=()=>setMergeMode('replace');
    if(btnModeMergeCms) btnModeMergeCms.onclick=()=>setMergeMode('merge');
    if(btnModeReplaceCms) btnModeReplaceCms.onclick=()=>setMergeMode('replace');
    if(chkShowUpdateTime){
        chkShowUpdateTime.checked = getShowUpdateTime();
        chkShowUpdateTime.onchange = ()=>setShowUpdateTime(chkShowUpdateTime.checked);
    }
    if(selDateFormat){
        selDateFormat.value = getDateFormat();
        selDateFormat.onchange = ()=>setDateFormat(selDateFormat.value);
    }
    if(btnBranchSave) btnBranchSave.onclick=saveBranch;
    if(btnBranchNew) btnBranchNew.onclick=newBranchForm;
    if(btnBranchExport) btnBranchExport.onclick=exportBranchesJSON;
    if(btnBranchImport) btnBranchImport.onclick=()=>brJsonFile && brJsonFile.click();
    if(brJsonFile) brJsonFile.onchange=importBranchesJSON;
    if(btnBranchImportText) btnBranchImportText.onclick=importBranchesFromText;
    if(btnControlMenu && controlMenu){
        btnControlMenu.onclick=()=>{
            const open = controlMenu.style.height && controlMenu.style.height!=='0px';
            if(open){
                controlMenu.style.height = '0px';
            }else{
                controlMenu.style.height = controlMenu.scrollHeight + 'px';
            }
        };
        window.addEventListener('click',(e)=>{
            if(!controlMenu.contains(e.target) && e.target!==btnControlMenu){
                controlMenu.style.height = '0px';
            }
        });
        window.addEventListener('resize',()=>{
            const open = controlMenu.style.height && controlMenu.style.height!=='0px';
            if(open){
                controlMenu.style.height = controlMenu.scrollHeight + 'px';
            }
        });
    }
    if(btnChangePhoto && empPhotoInput){
        btnChangePhoto.onclick = ()=>empPhotoInput.click();
        empPhotoInput.onchange = ()=>{
            const file = empPhotoInput.files?.[0];
            if(!file) return;
            const r=new FileReader();
            r.onload = ()=>{
                const avatar = document.getElementById('emp-avatar');
                if(avatar){
                    avatar.innerHTML = `<img src="${r.result}" alt="" style="width:100%;height:100%;">`;
                    avatar.style.background = 'transparent';
                }
            };
            r.readAsDataURL(file);
        };
    }
    
    checkLogin();
    applyAdminLang();
    renderMergeModeUI();
    renderUpdateSourceIndicator();
    renderBranchesTable();
});

function checkLogin() {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const loginSection = document.getElementById('login-section');
    const adminContent = document.getElementById('admin-content');
    
    if(isAdmin) {
        if(loginSection) loginSection.style.display = 'none';
        if(adminContent) adminContent.style.display = 'flex'; // Flex for sidebar layout
        
        // Load User Info
        try {
            const userStr = localStorage.getItem('current_admin_user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const nameEl = document.getElementById('admin-user-name');
                if(nameEl) nameEl.textContent = user.username;
            }
        } catch(e) {
            console.error('Error parsing user info', e);
        }

        // Load Data - Wrapped in try-catch to prevent crash
        try { loadActivityLog(); } catch(e){}
        try { loadComplaints(); } catch(e){}
        try { loadUsers(); } catch(e){}
        try { loadCMSData(); } catch(e){}
        
        // Initial Employee Load
        try { loadEmployeesFromCSV(); } catch(e){}
        try { autoImportEmployeesFromGitHub(); } catch(e){}
        
        // Default Section
        showSection('dashboard');
    } else {
        if(loginSection) loginSection.style.display = 'flex';
        if(adminContent) adminContent.style.display = 'none';
    }
}

// Navigation Group Toggle
function toggleSidebarGroup(groupId) {
    const group = document.getElementById(groupId);
    if(!group) return;
    
    const content = group.querySelector('.nav-group-content');
    const arrow = group.querySelector('.arrow-icon');
    
    const isActive = group.classList.contains('active');
    
    if(isActive) {
        group.classList.remove('active');
        content.style.display = 'none';
        if(arrow) arrow.textContent = '▶';
    } else {
        group.classList.add('active');
        content.style.display = 'block';
        if(arrow) arrow.textContent = '▼';
    }
}

// NAVIGATION
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-content-wrapper > div').forEach(el => el.classList.add('d-none'));
    
    // Show target section
    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    } else {
        console.error(`Section #section-${sectionId} not found!`);
        // Fallback to dashboard if section not found to prevent empty screen
        if(sectionId !== 'dashboard') showSection('dashboard');
        return;
    }
    
    // Update Sidebar Active State
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.getElementById('nav-' + sectionId);
    if(navItem) {
        navItem.classList.add('active');
        
        // Auto-expand parent group
        const parentGroup = navItem.closest('.nav-group');
        if(parentGroup && !parentGroup.classList.contains('active')) {
            toggleSidebarGroup(parentGroup.id);
        }
    }

    // Update Header Title
    const titles = {
        'dashboard': 'الرئيسية',
        'users': 'الأعضاء',
        'employees': 'الموظفين',
        'cms': 'إعدادات البيانات (CMS)',
        'services': 'الشكاوى والطلبات',
        'media': 'وسائط',
        'branches': 'الفروع',
        'pages': 'صفحات',
        'comments': 'تعليقات',
        'appearance': 'مظهر',
        'plugins': 'إضافات',
        'tools': 'أدوات',
        'settings': 'الإعدادات',
        'email': 'ايميل',
        'violations': 'إدارة المخالفات',
        'tasks': 'إدارة المهام',
        'licenses': 'إدارة التراخيص والتصاريح',
        'advanced-data': 'إدارة البيانات المتقدمة',
        'master-upload': 'إدارة البيانات المركزية'
    };
    const titleEl = document.getElementById('page-title');
    if(titleEl && titles[sectionId]) titleEl.textContent = titles[sectionId];

    // Section Specific Loaders
    if(sectionId === 'services') {
        loadComplaints();
        loadServicesJson();
    } else if(sectionId === 'tasks') {
        renderTasksSummary();
    } else if(sectionId === 'advanced-data') {
        loadBoardJson();
    }
}

function setAdminLang(lang){
    localStorage.setItem('admin_lang', lang);
    applyAdminLang();
}

function applyAdminLang(){
    const lang = localStorage.getItem('admin_lang') || 'ar';
    document.body.classList.toggle('ar', lang==='ar');
    document.dir = lang==='ar' ? 'rtl' : 'ltr';
    const generic = document.querySelectorAll('[data-en],[data-ar]');
    generic.forEach(el=>{
        if(lang==='en'){
            if(el.dataset.en) el.textContent = el.dataset.en;
        }else{
            if(el.dataset.ar) el.textContent = el.dataset.ar;
        }
    });
    const t = {
        ar: {
            login: { title:'تسجيل دخول الإدارة', user:'اسم المستخدم', pass:'كلمة المرور', btn:'تسجيل الدخول', forgot:'نسيت كلمة المرور؟' },
            pageTitles: { dashboard:'الرئيسية', users:'الأعضاء', employees:'الموظفين', cms:'إعدادات البيانات (CMS)', services:'الشكاوى والطلبات', media:'وسائط', pages:'صفحات', comments:'تعليقات', appearance:'مظهر', plugins:'إضافات', tools:'أدوات', settings:'الإعدادات', email:'ايميل' },
            th: { emp:'الموظف', iqama:'رقم الهوية/الإقامة', brand:'العلامة التجارية', branch:'الفرع', region:'المنطقة', health:'الشهادة الصحية', training:'حالة التدريب', view:'عرض' },
            labels: { 
                name:'الاسم', position:'الوظيفة', sap:'SAP ID', iqama:'رقم الهوية/الإقامة', brand:'العلامة التجارية', branch:'الفرع', region:'المنطقة', city:'المدينة',
                status:'الحالة', status1:'الحالة 1', status2:'الحالة 2',
                health:'انتهاء الصحية', hire:'بداية الكرت الصحي', train_end:'انتهاء التدريب الصحي',
                train1:'تدريب 1', train2:'تدريب 2',
                ops1:'التشغيل OPS1', ref:'الرقم المرجعي',
                days_train:'المتبقي انتهاء التدريب الصحي', days_health:'المتبقي انتهاء الكرت الصحي',
                email:'البريد الإلكتروني', photo:'صورة الموظف',
                band:'Band', cost:'مركز التكلفة', tede:'T. E. D.E', remarks:'ملاحظات'
            },
            buttons: { save:'حفظ', cancel:'إلغاء' },
            merge: { title:'وضع الدمج:', update:'تحديث فقط', replace:'استبدال كامل' }
        },
        en: {
            login: { title:'Admin Login', user:'Username', pass:'Password', btn:'Sign In', forgot:'Forgot Password?' },
            pageTitles: { dashboard:'Dashboard', users:'Users', employees:'Employees', cms:'Data Settings (CMS)', services:'Complaints', media:'Media', pages:'Pages', comments:'Comments', appearance:'Appearance', plugins:'Plugins', tools:'Tools', settings:'Settings', email:'Email' },
            th: { emp:'Employee', iqama:'ID/Iqama', brand:'Brand', branch:'Branch', region:'Region', health:'Health Card', training:'Training', view:'View' },
            labels: { 
                name:'Name', position:'Position', sap:'SAP ID', iqama:'ID/Iqama', brand:'Brand', branch:'Branch', region:'Region', city:'City',
                status:'Status', status1:'Status1', status2:'Status2',
                health:'Health card expired Date', hire:'Health card start Date', train_end:'Training END Date',
                train1:'Training 1', train2:'Training 2',
                ops1:'OPS1', ref:'REF',
                days_train:'Days Left (Training)', days_health:'Days Left (Health card)',
                email:'Email', photo:'Employee Photo',
                band:'Band', cost:'Cost center', tede:'T. E. D.E', remarks:'Remarks'
            },
            buttons: { save:'Save', cancel:'Cancel' },
            merge: { title:'Merge Mode:', update:'Update Only', replace:'Replace All' }
        }
    }[lang];
    const mapTh = { emp:'th-emp', iqama:'th-iqama', brand:'th-brand', branch:'th-branch', region:'th-region', health:'th-health', training:'th-training', view:'th-view' };
    Object.keys(mapTh).forEach(k=>{
        const el = document.getElementById(mapTh[k]);
        if(el) el.textContent = t.th[k];
    });
    const mapLbl = { 
        name:'lbl-name', position:'lbl-position', sap:'lbl-sap', iqama:'lbl-iqama', brand:'lbl-brand', branch:'lbl-branch', region:'lbl-region', city:'lbl-city',
        status:'lbl-status', status1:'lbl-status1', status2:'lbl-status2',
        health:'lbl-health', hire:'lbl-hire', train_end:'lbl-train-end',
        train1:'lbl-train1', train2:'lbl-train2',
        ops1:'lbl-ops1', ref:'lbl-ref',
        days_train:'lbl-days-train', days_health:'lbl-days-health',
        email:'lbl-email', photo:'lbl-photo',
        band:'lbl-band', cost:'lbl-cost', tede:'lbl-tede', remarks:'lbl-remarks'
    };
    Object.keys(mapLbl).forEach(k=>{
        const el = document.getElementById(mapLbl[k]);
        if(el) el.textContent = t.labels[k];
    });
    const btnSave = document.getElementById('btn-save-emp');
    const btnCancel = document.getElementById('btn-close-emp');
    if(btnSave) btnSave.textContent = t.buttons.save;
    if(btnCancel) btnCancel.textContent = t.buttons.cancel;
    const lblMerge = document.getElementById('lbl-merge-mode');
    const btnMerge = document.getElementById('btn-mode-merge');
    const btnReplace = document.getElementById('btn-mode-replace');
    if(lblMerge) lblMerge.textContent = t.merge.title;
    if(btnMerge) btnMerge.textContent = t.merge.update;
    if(btnReplace) btnReplace.textContent = t.merge.replace;
    const lblMergeCms = document.getElementById('lbl-merge-mode-cms');
    const btnMergeCms = document.getElementById('btn-mode-merge-cms');
    const btnReplaceCms = document.getElementById('btn-mode-replace-cms');
    if(lblMergeCms) lblMergeCms.textContent = t.merge.title;
    if(btnMergeCms) btnMergeCms.textContent = t.merge.update;
    if(btnReplaceCms) btnReplaceCms.textContent = t.merge.replace;
    const descUpdate = document.getElementById('desc-merge-update');
    const descReplace = document.getElementById('desc-merge-replace');
    const descSources = document.getElementById('desc-merge-sources');
    if(descUpdate) descUpdate.textContent = lang==='ar' ? 'تحديث فقط: دمج ذكي يحافظ على الموجود ويحدّث القيم ويضيف الجديد.' : 'Update Only: Smart merge that keeps existing, updates fields, and adds new.';
    if(descReplace) descReplace.textContent = lang==='ar' ? 'استبدال كامل: يستبدل القائمة بالكامل بالمصدر القادم.' : 'Replace All: Replaces the entire list with the incoming source.';
    if(descSources) descSources.textContent = lang==='ar' ? 'مصادر التحديث: Excel، JSON من GitHub، JSON محلي، تعديل يدوي عبر اللوحة.' : 'Update sources: Excel, GitHub JSON, local JSON, manual edits via the admin panel.';
    const lblShowTime = document.getElementById('lbl-show-update-time');
    const lblDateFormat = document.getElementById('lbl-date-format');
    const optLocale = document.getElementById('opt-format-locale');
    const optIso = document.getElementById('opt-format-iso');
    const optRelative = document.getElementById('opt-format-relative');
    if(lblShowTime) lblShowTime.textContent = lang==='ar' ? 'عرض الوقت بجانب آخر تحديث' : 'Show time next to Last Update';
    if(lblDateFormat) lblDateFormat.textContent = lang==='ar' ? 'تنسيق التاريخ' : 'Date format';
    if(optLocale) optLocale.textContent = lang==='ar' ? 'محلي' : 'Locale';
    if(optIso) optIso.textContent = 'ISO';
    if(optRelative) optRelative.textContent = lang==='ar' ? 'نسبي' : 'Relative';

    // Login Page Updates
    const loginTitle = document.getElementById('login-title');
    const lblUser = document.getElementById('lbl-user');
    const inpUser = document.getElementById('username');
    const lblPass = document.getElementById('lbl-pass');
    const inpPass = document.getElementById('pin');
    const btnLogin = document.getElementById('login');
    const btnSetup = document.getElementById('setup');
    const lnkForgot = document.getElementById('forgot-pass-link');

    if(t.login) {
        if(loginTitle) loginTitle.textContent = t.login.title;
        if(lblUser) lblUser.textContent = t.login.user;
        if(inpUser) inpUser.placeholder = t.login.user;
        if(lblPass) lblPass.textContent = t.login.pass;
        if(inpPass) inpPass.placeholder = t.login.pass;
        if(btnLogin) btnLogin.textContent = t.login.btn;
        if(lnkForgot) lnkForgot.textContent = t.login.forgot;
    }

    renderMergeModeUI();
    renderUpdateSourceIndicator();
    renderBranchesTable();
}

// --- SHARED UTILS ---

// Helper to fuzzy find value in row object
const find = (row, ...keywords) => {
    const key = Object.keys(row).find(k => {
        const lower = k.toLowerCase();
        return keywords.some(kw => lower.includes(kw.toLowerCase()));
    });
    return key ? row[key] : null;
};

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
                    cost_center: branchRaw,
                    region: row[16] || '',
                    health_expiry: row[12] || '', 
                    status1: row[10] || '',
                    status2: row[13] || '',
                    training_end: row[9] || '',
                    email: row[20] || ''
                };
            }).filter(e => e.name && e.name.trim() !== '' && e.iqama); // Filter empty rows

            localStorage.setItem('admin_employees', JSON.stringify(employees));
            extractBranchesFromData(employees);
            loadEmployees();
            setLastUpdateSource('csv');
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
    // 1. Get raw names
    const rawBranches = [...new Set(employees.map(e => e.branch).filter(b => b && b !== 'Unknown Branch'))];
    localStorage.setItem('admin_branches', JSON.stringify(rawBranches));

    // 2. Update rich branches data (admin_branches_data) for UI
    let richData = JSON.parse(localStorage.getItem('admin_branches_data') || '[]');
    const existingNames = new Set(richData.map(b => typeof b === 'string' ? b : b.name));
    
    let addedCount = 0;
    rawBranches.forEach(name => {
        if(!existingNames.has(name)) {
            // Auto-detect brand
            let brand = 'Olayan';
            const lower = name.toLowerCase();
            if(lower.includes('bk') || lower.includes('burger')) brand = 'Burger King';
            else if(lower.includes('texas') || lower.includes('chicken')) brand = 'Texas Chicken';
            else if(lower.includes('bww') || lower.includes('buffalo')) brand = 'Buffalo Wild Wings';

            richData.push({
                name: name,
                type: 'basic',
                brand: brand,
                source: 'auto'
            });
            addedCount++;
        }
    });

    if(addedCount > 0) {
        localStorage.setItem('admin_branches_data', JSON.stringify(richData));
        console.log(`Auto-added ${addedCount} branches to display list.`);
    }
}

function generateRandomEmployees() {
    if (!confirm('سيتم مسح البيانات الحالية وتوليد بيانات عشوائية جديدة. هل أنت متأكد؟')) return;

    const names = ["محمد علي", "فهد السالم", "خالد العتيبي", "سعيد القحطاني", "عمر الدوسري", "ياسر الشمري", "أحمد الحربي", "عبدالله العنزي", "تركي المطيري", "سلطان المالكي"];
    const branches = ["الرياض - العليا", "الرياض - الملز", "جدة - التحلية", "الدمام - الكورنيش", "مكة - العزيزية", "المدينة - الدائري", "الطائف - شهار", "أبها - الحزام"];
    const positions = ["مدير فرع", "كاشير", "مشرف صالة", "طباخ", "محاسب", "أمن وسلامة", "خدمة عملاء"];
    const regions = ["الوسطى", "الغربية", "الشرقية", "الجنوبية", "الشمالية"];
    const brands = ["BK", "TC", "BWW"];
    const statuses = ["نشط", "إجازة", "موقوف"];

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
            position: positions[Math.floor(Math.random() * positions.length)],
            branch: branches[Math.floor(Math.random() * branches.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
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
        const s1 = emp.train_status_1 || 'N/A';
        const s2 = emp.train_status_2 || 'N/A';
        
        const getTrainStyle = (s) => {
            if(s.toLowerCase().includes('valid') || s.includes('ساري')) return 'background: rgba(16, 185, 129, 0.2); color: #10b981;';
            if(s === 'N/A' || s === '') return 'background: rgba(100, 116, 139, 0.2); color: #94a3b8;';
            return 'background: rgba(239, 68, 68, 0.2); color: #ef4444;';
        };

        tr.innerHTML = `
            <td style="font-weight:bold;">${emp.name}</td>
            <td>${emp.iqama}</td>
            <td><span class="badge badge-brand">${emp.brand}</span></td>
            <td>${emp.branch}</td>
            <td>${emp.region}</td>
            <td style="${healthStyle}">${emp.health_expiry} ${isHealthExpired ? '⚠️' : ''}</td>
            <td>
                <div style="font-size:0.75rem; margin-bottom:4px;">L1: <span style="padding: 2px 6px; border-radius: 4px; font-weight:600; ${getTrainStyle(s1)}">${s1}</span></div>
                <div style="font-size:0.75rem;">L2: <span style="padding: 2px 6px; border-radius: 4px; font-weight:600; ${getTrainStyle(s2)}">${s2}</span></div>
            </td>
            <td>
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="viewEmployee('${emp.iqama}')">👁️</button>
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
    if(avatar){ 
        if(emp.photo){
            avatar.innerHTML = `<img src="${emp.photo}" alt="" style="width:100%;height:100%;">`;
            avatar.style.background = 'transparent';
        } else {
            avatar.textContent = initials; 
            avatar.style.background = color; 
        }
    }
    if(nameD) nameD.textContent = emp.name||'';
    if(roleD) roleD.textContent = emp.brand||'';
    
    // Improved ID Display Logic
    let idText = '';
    if(emp.sap_id && emp.sap_id !== '-') idText += `SAP: ${emp.sap_id}`;
    if(emp.iqama) {
        if(idText) idText += ' | ';
        idText += `ID: ${emp.iqama}`;
    }
    if(idD) {
        idD.textContent = idText;
        idD.style.color = '#e2e8f0'; // Brighter text for better visibility
    }
    
    // Store original iqama for saving logic
    if(m) m.dataset.originalIqama = emp.iqama;

    const set = (id,val)=>{ const el=document.getElementById(id); if(el) el.value = val||''; };
    set('emp-sap', emp.sap_id);
    set('emp-ref', emp.ref);
    set('emp-iqama', emp.iqama);
    set('emp-name', emp.name);
    set('emp-band', emp.brand);
    set('emp-cost', emp.cost_center);
    set('emp-ops1', emp.ops1);
    set('emp-hire', emp.hire_date);
    set('emp-tede', emp.training_end);
    set('emp-train-end', emp.training_end);
    set('emp-status1', emp.status1);
    set('emp-health', emp.health_expiry);
    set('emp-status2', emp.status2);
    set('emp-city', emp.city);
    set('emp-region', emp.region);
    set('emp-remarks', emp.remarks);
    
    // Days left
    const daysLeft = (dateStr)=>{
        if(!dateStr) return '';
        const d = new Date(dateStr);
        if(isNaN(d.getTime())) return '';
        const ms = d.getTime() - new Date().setHours(0,0,0,0);
        const days = Math.ceil(ms / (1000*60*60*24));
        return days >= 0 ? `${days} يوم` : `منتهي منذ ${Math.abs(days)} يوم`;
    };
    set('emp-days-train', daysLeft(emp.training_end));
    set('emp-days-health', daysLeft(emp.health_expiry));

    // Badge Logic
    const updateBadge = (bid, val) => {
        const el = document.getElementById(bid);
        if(!el) return;
        const v = (val||'').toLowerCase();
        if(v.includes('valid') || v.includes('ساري') || v.includes('active')) {
            el.textContent = 'Valid';
            el.style.background = 'rgba(16, 185, 129, 0.2)';
            el.style.color = '#10b981';
            el.style.display = 'block';
        } else if(v.includes('expired') || v.includes('منتهي')) {
            el.textContent = 'Expired';
            el.style.background = 'rgba(225, 29, 72, 0.2)';
            el.style.color = '#e11d48';
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    };
    updateBadge('badge-status1', emp.status1);
    updateBadge('badge-status2', emp.status2);
    
    const s1 = document.getElementById('emp-status1');
    const s2 = document.getElementById('emp-status2');
    if(s1) s1.oninput = (e)=>updateBadge('badge-status1', e.target.value);
    if(s2) s2.oninput = (e)=>updateBadge('badge-status2', e.target.value);

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
        csvContent += `"${e.name}","${e.iqama}","${e.brand}","${e.branch}","${e.region}","${e.health_expiry}","${e.status1}","${e.status2}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees_data_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setMergeMode(mode){
    localStorage.setItem('employees_merge_mode', mode);
    renderMergeModeUI();
}

function getMergeMode(){
    return localStorage.getItem('employees_merge_mode') || 'merge';
}

function renderMergeModeUI(){
    const mode = getMergeMode();
    const btnMerge = document.getElementById('btn-mode-merge');
    const btnReplace = document.getElementById('btn-mode-replace');
    const btnMergeCms = document.getElementById('btn-mode-merge-cms');
    const btnReplaceCms = document.getElementById('btn-mode-replace-cms');
    const badge = document.getElementById('merge-mode-indicator');
    if(btnMerge) {
        btnMerge.style.opacity = mode==='merge' ? '1' : '0.6';
        btnMerge.style.border = mode==='merge' ? '2px solid #4facfe' : '';
    }
    if(btnReplace) {
        btnReplace.style.opacity = mode==='replace' ? '1' : '0.6';
        btnReplace.style.border = mode==='replace' ? '2px solid #e11d48' : '';
    }
    if(btnMergeCms) {
        btnMergeCms.style.opacity = mode==='merge' ? '1' : '0.6';
        btnMergeCms.style.border = mode==='merge' ? '2px solid #4facfe' : '';
    }
    if(btnReplaceCms) {
        btnReplaceCms.style.opacity = mode==='replace' ? '1' : '0.6';
        btnReplaceCms.style.border = mode==='replace' ? '2px solid #e11d48' : '';
    }
    if(badge){
        const lang = localStorage.getItem('admin_lang') || 'ar';
        const title = lang==='ar' ? 'وضع الدمج:' : 'Merge Mode:';
        const text = lang==='ar' ? (mode==='merge' ? 'تحديث فقط' : 'استبدال كامل') : (mode==='merge' ? 'Update Only' : 'Replace All');
        badge.textContent = `${title} ${text}`;
        const color = mode==='merge' ? '#4facfe' : '#e11d48';
        badge.style.color = color;
        badge.style.border = `1px solid ${color}`;
    }
}

function setLastUpdateSource(src){
    localStorage.setItem('employees_last_source', src);
    localStorage.setItem('employees_last_source_time', new Date().toISOString());
    renderUpdateSourceIndicator();
}

function getShowUpdateTime(){
    const v = localStorage.getItem('employees_show_update_time');
    if(v===null) return true;
    return v==='true';
}

function setShowUpdateTime(v){
    localStorage.setItem('employees_show_update_time', v ? 'true' : 'false');
    renderUpdateSourceIndicator();
}

function getDateFormat(){
    return localStorage.getItem('employees_date_format') || 'locale';
}

function setDateFormat(fmt){
    localStorage.setItem('employees_date_format', fmt);
    renderUpdateSourceIndicator();
}

function renderUpdateSourceIndicator(){
    const src = localStorage.getItem('employees_last_source') || 'csv';
    const lang = localStorage.getItem('admin_lang') || 'ar';
    const badge = document.getElementById('update-source-indicator');
    if(!badge) return;
    const title = lang==='ar' ? 'آخر تحديث:' : 'Last Update:';
    const map = {
        csv: { ar:'Excel', en:'Excel', color:'#4facfe', emoji:'📊' },
        github_json: { ar:'GitHub JSON', en:'GitHub JSON', color:'#6f42c1', emoji:'☁️' },
        local_json: { ar:'JSON محلي', en:'Local JSON', color:'#a78bfa', emoji:'💾' },
        manual: { ar:'تعديل يدوي', en:'Manual', color:'#10b981', emoji:'✏️' }
    };
    const m = map[src] || map.csv;
    const text = lang==='ar' ? m.ar : m.en;
    const timeISO = localStorage.getItem('employees_last_source_time');
    let timeText = '';
    if (timeISO && getShowUpdateTime()) {
        const d = new Date(timeISO);
        const fmt = getDateFormat();
        if(fmt==='iso'){
            const s = d.toISOString();
            timeText = s.slice(0,16).replace('T',' ');
        }else if(fmt==='relative'){
            const diffMs = Date.now() - d.getTime();
            const sec = Math.floor(diffMs/1000);
            const min = Math.floor(sec/60);
            const hr = Math.floor(min/60);
            const day = Math.floor(hr/24);
            if(day>0) timeText = lang==='ar' ? `منذ ${day} يوم` : `${day} day(s) ago`;
            else if(hr>0) timeText = lang==='ar' ? `منذ ${hr} ساعة` : `${hr} hour(s) ago`;
            else if(min>0) timeText = lang==='ar' ? `منذ ${min} دقيقة` : `${min} minute(s) ago`;
            else timeText = lang==='ar' ? 'الآن' : 'just now';
        }else{
            const locale = lang==='ar' ? 'ar-SA' : 'en-US';
            timeText = d.toLocaleString(locale, { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
        }
    }
    badge.textContent = `${title} ${m.emoji} ${text}${timeText ? ' — ' + timeText : ''}`;
    badge.style.color = m.color;
    badge.style.border = `1px solid ${m.color}`;
}
function mergeEmployees(existingArr, incomingArr){
    const existing = Array.isArray(existingArr) ? existingArr : [];
    const incoming = Array.isArray(incomingArr) ? incomingArr : [];
    const byIqama = new Map(existing.map(e => [e.iqama, { ...e }]));
    let updated = 0, added = 0;
    incoming.forEach(n => {
        const prev = byIqama.get(n.iqama);
        if (prev) {
            const fields = ['id','name','position','sap_id','brand','branch','region','city','status','status1','status2','health_expiry','hire_date','training_end','train_status_1','train_status_2','ops1','ref','email','photo'];
            fields.forEach(f => {
                const val = n[f];
                if (val !== undefined && val !== null && String(val).trim() !== '') {
                    if (prev[f] !== val) {
                        prev[f] = val;
                        updated++;
                    }
                }
            });
            byIqama.set(n.iqama, prev);
        } else {
            byIqama.set(n.iqama, { ...n });
            added++;
        }
    });
    return { merged: Array.from(byIqama.values()), stats: { updated, added, total: byIqama.size } };
}

function autoImportEmployeesFromGitHub(){
    const token = localStorage.getItem('gh_token') || '';
    if(!token) return;
    const owner = 'beno0o96-del';
    const repo = 'olayan-compliance-dashboard';
    const path = 'employees_data.json';
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
    }).then(r=>r.json()).then(json=>{
        if(json && json.content){
            const decoded = decodeURIComponent(escape(atob(json.content)));
            const incoming = JSON.parse(decoded);
            const mode = getMergeMode();
            if(mode==='replace'){
                localStorage.setItem('admin_employees', JSON.stringify(incoming));
            } else {
                const existing = JSON.parse(localStorage.getItem('admin_employees') || '[]');
                const { merged } = mergeEmployees(existing, incoming);
                localStorage.setItem('admin_employees', JSON.stringify(merged));
            }
            setLastUpdateSource('github_json');
            loadEmployees();
        }
    }).catch(()=>{});
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

async function saveEmployeeChanges(){
    const modal = document.getElementById('employee-modal');
    const newIqama = document.getElementById('emp-iqama').value.trim();
    const originalIqama = modal?.dataset.originalIqama; // Get original ID

    let employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    
    // Find by original ID if available, otherwise try new ID (for safety)
    const idx = employees.findIndex(e => e.iqama === (originalIqama || newIqama));
    
    if(idx===-1) return;

    const readPhoto = (file)=>new Promise(res=>{
        if(!file) return res(null);
        const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(file);
    });
    const photoFile = document.getElementById('emp-photo')?.files?.[0] || null;
    const photo = await readPhoto(photoFile);

    employees[idx] = {
        ...employees[idx],
        iqama: newIqama, // Update ID to new value
        name: document.getElementById('emp-name')?.value?.trim() || employees[idx].name,
        sap_id: document.getElementById('emp-sap')?.value?.trim() || employees[idx].sap_id,
        brand: document.getElementById('emp-band')?.value?.trim() || employees[idx].brand,
        cost_center: document.getElementById('emp-cost')?.value?.trim() || employees[idx].cost_center,
        region: document.getElementById('emp-region')?.value?.trim() || employees[idx].region,
        city: document.getElementById('emp-city')?.value?.trim() || employees[idx].city,
        status1: document.getElementById('emp-status1')?.value?.trim() || employees[idx].status1,
        status2: document.getElementById('emp-status2')?.value?.trim() || employees[idx].status2,
        health_expiry: document.getElementById('emp-health')?.value?.trim() || employees[idx].health_expiry,
        hire_date: document.getElementById('emp-hire')?.value?.trim() || employees[idx].hire_date,
        training_end: document.getElementById('emp-train-end')?.value?.trim() || employees[idx].training_end,
        ops1: document.getElementById('emp-ops1')?.value?.trim() || employees[idx].ops1,
        ref: document.getElementById('emp-ref')?.value?.trim() || employees[idx].ref,
        remarks: document.getElementById('emp-remarks')?.value?.trim() || employees[idx].remarks,
        photo: photo || employees[idx].photo
    };
    localStorage.setItem('admin_employees', JSON.stringify(employees));
    if(modal) modal.style.display='none';
    loadEmployees();
    setLastUpdateSource('manual');
    alert('تم حفظ بيانات الموظف');
}

function importEmployeesFromJSON(){
    const owner = 'beno0o96-del';
    const repo = 'olayan-compliance-dashboard';
    const path = 'employees_data.json';
    const token = localStorage.getItem('gh_token') || '';
    if(!token){ alert('يرجى إدخال GitHub Token في لوحة CMS أولاً.'); return; }
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
    }).then(r=>r.json()).then(json=>{
        if(json && json.content){
            const decoded = decodeURIComponent(escape(atob(json.content)));
            const incoming = JSON.parse(decoded);
            const mode = getMergeMode();
            let stats = { added:0, updated:0, total:0 };
            if(mode==='replace'){
                localStorage.setItem('admin_employees', JSON.stringify(incoming));
                stats.total = incoming.length;
            } else {
                const existing = JSON.parse(localStorage.getItem('admin_employees') || '[]');
                const res = mergeEmployees(existing, incoming);
                localStorage.setItem('admin_employees', JSON.stringify(res.merged));
                stats = res.stats;
            }
            loadEmployees();
            setLastUpdateSource('github_json');
            alert(`تم الدمج من GitHub: مضاف ${stats.added}، محدث ${stats.updated}، الإجمالي ${stats.total}`);
        } else {
            alert('لم يتم العثور على ملف employees_data.json في المستودع');
        }
    }).catch(()=>alert('فشل الاستيراد من GitHub'));
}

function publishEmployeesJSON(){
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    const owner = 'beno0o96-del';
    const repo = 'olayan-compliance-dashboard';
    const path = 'employees_data.json';
    const token = localStorage.getItem('gh_token') || '';
    if(!token){ alert('يرجى إدخال GitHub Token في لوحة CMS أولاً.'); return; }
    const contentB64 = btoa(unescape(encodeURIComponent(JSON.stringify(employees, null, 2))));
    // Get current SHA if file exists
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' }
    }).then(r=>r.ok ? r.json() : Promise.resolve({})).then(meta=>{
        const body = {
            message: `Employees Sync: ${new Date().toISOString()}`,
            content: contentB64
        };
        if(meta.sha) body.sha = meta.sha;
        return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' },
            body: JSON.stringify(body)
        });
    }).then(r=>r.json()).then(()=>alert('تم نشر ملف الموظفين إلى GitHub JSON بنجاح')).catch(()=>alert('فشل النشر إلى GitHub'));
}

function handleEmployeesExcelUpload(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Smart Header Detection
            const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (!rawData || rawData.length === 0) { alert('الملف فارغ'); return; }

            let headerRowIndex = 0;
            const keywords = ['name', 'iqama', 'id', 'branch', 'الاسم', 'الهوية', 'الفرع', 'cost center'];
            
            for (let i = 0; i < Math.min(20, rawData.length); i++) {
                const rowStr = JSON.stringify(rawData[i]).toLowerCase();
                const matchCount = keywords.filter(k => rowStr.includes(k)).length;
                if (matchCount >= 2) { 
                    headerRowIndex = i;
                    break;
                }
            }
            console.log('Employees Header Row:', headerRowIndex);

            // Parse with correct header
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: headerRowIndex });
            
            if(jsonData.length === 0){ alert('الملف فارغ'); return; }
            
            processEmployeesDataInternal(jsonData);
            
            setLastUpdateSource('manual'); // Mark as manual/excel upload
            alert(`تم تحديث الموظفين من Excel بنجاح`);
            
        } catch(err){
            console.error(err);
            alert('خطأ في قراءة ملف Excel');
        }
    };
    reader.readAsArrayBuffer(file);
}

function exportEmployeesToExcel(){
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    if(employees.length === 0){ alert('لا توجد بيانات للتصدير'); return; }
    
    // Map to nice headers
    const data = employees.map(e => ({
        "Name": e.name,
        "ID#": e.iqama,
        "Band": e.brand,
        "Branch": e.branch,
        "Region": e.region,
        "Health Expired": e.health_expiry,
        "Training End": e.training_end,
        "Status1": e.status1,
        "Status2": e.status2,
        "Email": e.email,
        "Cost Center": e.cost_center,
        "SAP ID": e.sap_id,
        "OPS": e.ops1
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "Employees_Data.xlsx");
}

function exportViolationsToExcel(){
    const localData = localStorage.getItem('violations_data_override');
    if (!localData) { alert('لا توجد بيانات مخالفات مخصصة'); return; }
    
    // We don't store raw rows for violations currently, only aggregated stats in the current implementation of processViolationsData.
    // Wait, processViolationsData saves aggregates. If the user wants to EXPORT the raw data back, we can't if we didn't save it.
    // Checking handleViolationsExcelUpload... it saves `finalData` which is aggregates.
    // So we can only export the aggregates or we need to change logic to save raw rows.
    // For now, let's export the Summary and Top Branches which we have.
    
    const data = JSON.parse(localData);
    
    // Create a multi-sheet workbook
    const wb = XLSX.utils.book_new();
    
    // Summary Sheet
    const summary = [
        { Metric: "Total Violations", Value: data.summary.total_violations },
        { Metric: "Total Amount", Value: data.summary.total_amount },
        { Metric: "Open", Value: data.summary.open_violations },
        { Metric: "Closed", Value: data.summary.closed_violations }
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summary);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    
    // Regions Sheet
    if(data.regions){
        const wsRegions = XLSX.utils.json_to_sheet(data.regions);
        XLSX.utils.book_append_sheet(wb, wsRegions, "Regions");
    }
    
    // Top Branches Sheet
    if(data.top_branches_frequency){
        const wsBranches = XLSX.utils.json_to_sheet(data.top_branches_frequency);
        XLSX.utils.book_append_sheet(wb, wsBranches, "Top Branches");
    }

    XLSX.writeFile(wb, "Violations_Summary.xlsx");
}

function downloadEmployeesJSON(){
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    const blob = new Blob([JSON.stringify(employees, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees_data_download.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

let branchEditIndex = -1;

function getBranchesData(){
    try{
        return JSON.parse(localStorage.getItem('admin_branches_data') || '[]');
    }catch(e){
        return [];
    }
}
function setBranchesData(arr){
    localStorage.setItem('admin_branches_data', JSON.stringify(arr));
    localStorage.setItem('admin_branches', JSON.stringify(arr.map(b=>b.name)));
}

function clearBranchForm(){
    const ids = ['br-name','br-type','br-brand','br-email','br-cost','br-ops','br-kpi-target','br-kpi-value','br-logo'];
    ids.forEach(id=>{
        const el = document.getElementById(id);
        if(!el) return;
        if(el.tagName==='SELECT') el.value='basic';
        else if(el.type==='file') el.value='';
        else el.value='';
    });
}

function newBranchForm(){
    branchEditIndex = -1;
    clearBranchForm();
}

function readLogoFile(file){
    return new Promise((resolve)=>{
        if(!file){ resolve(null); return; }
        const r = new FileReader();
        r.onload = ()=>resolve(r.result);
        r.readAsDataURL(file);
    });
}

async function saveBranch(){
    const name = document.getElementById('br-name')?.value?.trim();
    const type = document.getElementById('br-type')?.value || 'basic';
    const brand = document.getElementById('br-brand')?.value?.trim() || '';
    const email = document.getElementById('br-email')?.value?.trim() || '';
    const cost = document.getElementById('br-cost')?.value?.trim() || '';
    const ops = document.getElementById('br-ops')?.value?.trim() || '';
    const kpiTarget = parseFloat(document.getElementById('br-kpi-target')?.value || '0') || 0;
    const kpiValue = parseFloat(document.getElementById('br-kpi-value')?.value || '0') || 0;
    const logoFile = document.getElementById('br-logo')?.files?.[0] || null;
    const logo = await readLogoFile(logoFile);
    if(!name) return;
    const kpiScore = kpiTarget>0 ? Math.round((kpiValue / kpiTarget) * 100) : 0;
    const item = { 
        name, 
        type, 
        brand, 
        email, 
        cost_center: cost, 
        ops1: ops, 
        kpi_target: kpiTarget, 
        kpi_value: kpiValue, 
        kpi_score: kpiScore, 
        logo,
        hidden: false // Default to visible
    };
    const data = getBranchesData();
    if(branchEditIndex>=0){
        data[branchEditIndex] = { ...data[branchEditIndex], ...item };
    }else{
        data.push(item);
    }
    setBranchesData(data);
    renderBranchesTable();
    clearBranchForm();
}

function renderBranchesTable(){
    const tbody = document.getElementById('branches-table-body');
    if(!tbody) return;
    const data = getBranchesData();
    tbody.innerHTML = '';
    data.forEach((b, idx)=>{
        const tr = document.createElement('tr');
        const logoCell = b.logo ? `<img src="${b.logo}" alt="" style="width:28px;height:28px;border-radius:50%;">` : '';
        const typeText = b.type==='opening' ? 'افتتاح' : 'أساسي';
        const kpi = typeof b.kpi_score==='number' ? `${b.kpi_score}%` : '';
        const isHidden = !!b.hidden;
        
        tr.innerHTML = `
            <td>${b.name||''}</td>
            <td>${typeText}</td>
            <td>${b.brand||''}</td>
            <td>${b.email||''}</td>
            <td>${b.cost_center||''}</td>
            <td>${b.ops1||''}</td>
            <td>${kpi}</td>
            <td>${logoCell}</td>
            <td>
                <label class="switch" style="font-size: 12px;">
                    <input type="checkbox" ${!isHidden ? 'checked' : ''} data-act="toggle-vis">
                    <span class="slider round"></span>
                </label>
                <span style="font-size:0.8rem; margin-right:5px; color:${!isHidden?'#4ade80':'#94a3b8'}">${!isHidden?'ظاهر':'مخفي'}</span>
            </td>
            <td>
                <button class="btn btn-secondary" data-act="edit">تعديل</button>
                <button class="btn btn-danger" data-act="delete">حذف</button>
            </td>
        `;
        
        // Visibility Toggle
        tr.querySelector('[data-act="toggle-vis"]').onchange = (e) => {
            const arr = getBranchesData();
            arr[idx].hidden = !e.target.checked;
            setBranchesData(arr);
            renderBranchesTable();
        };

        tr.querySelector('[data-act="edit"]').onclick=()=>{
            branchEditIndex = idx;
            document.getElementById('br-name').value = b.name||'';
            document.getElementById('br-type').value = b.type||'basic';
            document.getElementById('br-brand').value = b.brand||'';
            document.getElementById('br-email').value = b.email||'';
            document.getElementById('br-cost').value = b.cost_center||'';
            document.getElementById('br-ops').value = b.ops1||'';
            document.getElementById('br-kpi-target').value = b.kpi_target||'';
            document.getElementById('br-kpi-value').value = b.kpi_value||'';
            const top = document.getElementById('br-name');
            if(top) top.scrollIntoView({ behavior:'smooth', block:'center' });
        };
        tr.querySelector('[data-act="delete"]').onclick=()=>{
            if(confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
                const arr = getBranchesData();
                arr.splice(idx,1);
                setBranchesData(arr);
                renderBranchesTable();
            }
        };
        tbody.appendChild(tr);
    });
}

function exportBranchesJSON(){
    const data = getBranchesData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'branches.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importBranchesJSON(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = ()=>{
        try{
            const data = JSON.parse(r.result);
            if(Array.isArray(data)){
                setBranchesData(data);
                renderBranchesTable();
                e.target.value='';
            }
        }catch(err){}
    };
    r.readAsText(file);
}

function importBranchesFromText(){
    const ta = document.getElementById('br-bulk-text');
    if(!ta) return;
    const lines = ta.value.split('\n').map(l=>l.trim()).filter(l=>l);
    const out = [];
    lines.forEach(line=>{
        const parts = line.split('\t').map(p=>p.trim());
        if(parts.length>=3){
            const name = parts[0];
            const cost = parts[1];
            const email = parts[2];
            let brand = '';
            if(cost.includes('BK')) brand='BK';
            else if(cost.includes('TC')) brand='TC';
            else if(cost.toUpperCase().includes('BWW')) brand='BWW';
            const type = 'basic';
            out.push({ name, type, brand, email, cost_center: cost, ops1: '' });
        }
    });
    if(out.length){
        const data = getBranchesData();
        const merged = data.concat(out);
        setBranchesData(merged);
        renderBranchesTable();
        ta.value='';
    }
}

// Mobile Sidebar Toggle
window.toggleAdminSidebar = function() {
    const sidebar = document.querySelector('.admin-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if(sidebar) sidebar.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('sidebar-toggle');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', toggleAdminSidebar);
    }

    // Interactive Background Mouse Tracking
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.body.style.setProperty('--mouse-x', x + 'px');
        document.body.style.setProperty('--mouse-y', y + 'px');
        
        // Parallax effect for "floating" elements if any
        document.body.style.setProperty('--parallax-x', (x / window.innerWidth - 0.5) * 20 + 'px');
        document.body.style.setProperty('--parallax-y', (y / window.innerHeight - 0.5) * 20 + 'px');
    });
});

// --- VIOLATIONS MANAGEMENT LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // Master Excel Upload
    const masterUpload = document.getElementById('master-excel-upload');
    if (masterUpload) {
        masterUpload.addEventListener('change', handleMasterExcelUpload);
    }
    const listEl = document.getElementById('upload-files-list');
    if (listEl) renderUploadFilesList();

    // Violations Excel Upload (Old & New inputs)
    const vioExcelInput = document.getElementById('vio-excel-file');
    if (vioExcelInput) {
        vioExcelInput.addEventListener('change', handleViolationsExcelUpload);
    }
    const vioExcelInputHeader = document.getElementById('excel-violations-file');
    if (vioExcelInputHeader) {
        vioExcelInputHeader.addEventListener('change', handleViolationsExcelUpload);
    }

    // Employees Excel Upload
    const empExcelInput = document.getElementById('excel-employees-file');
    if (empExcelInput) {
        empExcelInput.addEventListener('change', handleEmployeesExcelUpload);
    }

    // Violations JSON Upload
    const vioJsonInput = document.getElementById('vio-json-file');
    if (vioJsonInput) {
        vioJsonInput.addEventListener('change', handleViolationsJsonUpload);
    }

    // Licenses Excel Upload
    const licExcelInput = document.getElementById('lic-excel-file');
    if (licExcelInput) {
        licExcelInput.addEventListener('change', handleLicensesExcelUpload);
    }

    // Initial Load
    loadViolationsStats();
});

function loadViolationsStats() {
    const preview = document.getElementById('vio-stats-preview');
    if (!preview) return;

    // Check LocalStorage first
    const localData = localStorage.getItem('violations_data_override');
    if (localData) {
        try {
            const data = JSON.parse(localData);
            const summary = data.summary || {};
            preview.innerHTML = `
                <div style="color: #4facfe; font-weight: bold;">مصدر البيانات: تحديث محلي (Local Storage)</div>
                <ul style="margin-top: 10px; padding-right: 20px;">
                    <li>إجمالي المخالفات: <strong>${summary.total_violations || 0}</strong></li>
                    <li>إجمالي الغرامات: <strong>${(summary.total_amount || 0).toLocaleString()}</strong></li>
                    <li>المخالفات المفتوحة: <strong>${summary.open_violations || 0}</strong></li>
                    <li>آخر تحديث: ${new Date().toLocaleString()}</li>
                </ul>
            `;
        } catch (e) {
            preview.innerHTML = '<div style="color: red;">خطأ في قراءة البيانات المحلية</div>';
        }
    } else {
        preview.innerHTML = `
            <div style="color: #666;">مصدر البيانات: ملف JSON الافتراضي (الخادم)</div>
            <p style="font-size: 0.8rem; margin-top: 5px;">لم يتم رفع أي بيانات مخصصة بعد.</p>
        `;
    }
}

async function handleViolationsExcelUpload(e) {
    if(typeof XLSX === 'undefined'){ alert('مكتبة SheetJS غير محملة. تأكد من الاتصال بالإنترنت.'); return; }
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById('vio-file-name').textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assume first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Smart Header Detection
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (!rawData || rawData.length === 0) { alert('الملف فارغ!'); return; }

        let headerRowIndex = 0;
        // Keywords for Violations
        const keywords = ['branch', 'violation', 'amount', 'type', 'الفرع', 'المخالفة', 'الغرامة', 'region', 'المنطقة'];
        
        for (let i = 0; i < Math.min(20, rawData.length); i++) {
            const rowStr = JSON.stringify(rawData[i]).toLowerCase();
            const matchCount = keywords.filter(k => rowStr.includes(k)).length;
            if (matchCount >= 2) { 
                headerRowIndex = i;
                break;
            }
        }
        console.log('Violations Header Row:', headerRowIndex);

        // Convert to JSON with correct header
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: headerRowIndex });
        
        processViolationsData(jsonData, false, file.name);
        upsertUploadHistory(file.name, ['violations']);
        renderUploadFilesList();
    };
    reader.readAsArrayBuffer(file);
}

// --- MASTER DATA & VIOLATIONS LOGIC ---

async function handleMasterExcelUpload(e) {
    if(typeof XLSX === 'undefined'){ alert('مكتبة SheetJS غير محملة.'); return; }
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const statusEl = document.getElementById('master-upload-status');
    if(statusEl) statusEl.textContent = `⏳ جاري معالجة ${files.length} ملفات...`;

    let globalLog = [];
    let processedCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            await processSingleFile(file, globalLog);
            processedCount++;
        } catch (err) {
            console.error(`Error processing ${file.name}:`, err);
            globalLog.push(`❌ فشل معالجة ${file.name}`);
        }
    }

    if (statusEl) {
        statusEl.innerHTML = globalLog.length > 0 ? globalLog.join('<br>') : '⚠️ لم يتم العثور على بيانات صالحة.';
        statusEl.style.color = globalLog.some(l => l.includes('❌')) ? '#f59e0b' : '#10b981';
    }
    
    // Refresh All Views - wrapped in try/catch for safety
    try { loadEmployees(); } catch(e){}
    try { recomputeViolationsFromRaw(); } catch(e){}
    try { renderLicensesTable(); } catch(e){}
    try { renderViolationsEditor(); } catch(e){}
    try { renderUploadFilesList(); } catch(e){}
}

function processSingleFile(file, log) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const typesFound = new Set();
                
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    
                    // 1. Smart Header & Type Detection
                    // Read as array of arrays first
                    const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    if (!rawRows || rawRows.length === 0) return;

                    let detectedType = 'unknown';
                    let headerIndex = 0;
                    
                    // Keywords Map
                    const typeKeywords = {
                        'employees': ['iqama', 'id#', 'رقم الهوية', 'cost center', 'nationality', 'hire date'],
                        'violations': ['violation', 'fine', 'amount', 'type', 'المخالفة', 'الغرامة', 'status', 'observation'],
                        'licenses': ['license', 'baladiya', 'civil defense', 'رخصة', 'انتهاء', 'expiry', 'permit']
                    };

                    // Check first 20 rows
                    for (let i = 0; i < Math.min(20, rawRows.length); i++) {
                        const rowStr = JSON.stringify(rawRows[i]).toLowerCase();
                        
                        // Check against each type
                        for (const [type, keywords] of Object.entries(typeKeywords)) {
                            const matchCount = keywords.filter(k => rowStr.includes(k.toLowerCase())).length;
                            if (matchCount >= 2) { // Threshold
                                detectedType = type;
                                headerIndex = i;
                                break;
                            }
                        }
                        if (detectedType !== 'unknown') break;
                    }

                    // Fallback to Sheet Name if content detection failed
                    if (detectedType === 'unknown') {
                        const lowerName = sheetName.toLowerCase();
                        if (lowerName.includes('employee') || lowerName.includes('staff') || lowerName.includes('موظف')) detectedType = 'employees';
                        else if (lowerName.includes('violation') || lowerName.includes('penal') || lowerName.includes('مخالف')) detectedType = 'violations';
                        else if (lowerName.includes('license') || lowerName.includes('permit') || lowerName.includes('رخص')) detectedType = 'licenses';
                    }

                    if (detectedType === 'unknown') {
                        log.push(`⚠️ [${file.name}] ورقة "${sheetName}" لم يتم التعرف عليها تلقائياً`);
                        return;
                    }

                    // 2. Parse with correct header
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: headerIndex });
                    if (jsonData.length === 0) return;

                    // 3. Process
                    if (detectedType === 'employees') {
                        processEmployeesDataInternal(jsonData); 
                        log.push(`✅ [${file.name}] تم تحديث الموظفين (${jsonData.length})`);
                        typesFound.add('employees');
                    } 
                    else if (detectedType === 'violations') {
                        processViolationsData(jsonData, true, file.name); 
                        log.push(`✅ [${file.name}] تم تحديث المخالفات (${jsonData.length})`);
                        typesFound.add('violations');
                    }
                    else if (detectedType === 'licenses') {
                        processLicensesData(jsonData); 
                        log.push(`✅ [${file.name}] تم تحديث التراخيص (${jsonData.length})`);
                        typesFound.add('licenses');
                    }
                });
                
                upsertUploadHistory(file.name, Array.from(typesFound));
                resolve();
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function detectDataType(sheetName, rows) {
    const lowerName = sheetName.toLowerCase();
    
    // 1. Check Sheet Name first
    if (lowerName.includes('employee') || lowerName.includes('موظف') || lowerName.includes('staff')) return 'employees';
    if (lowerName.includes('violation') || lowerName.includes('مخالف') || lowerName.includes('penal')) return 'violations';
    if (lowerName.includes('license') || lowerName.includes('permit') || lowerName.includes('تراخيص') || lowerName.includes('رخص')) return 'licenses';

    // 2. Smart Content Detection (Check first row headers)
    if (rows.length > 0) {
        const headers = Object.keys(rows[0]).map(k => k.toLowerCase());
        const headerStr = headers.join(' ');

        // Employees Keywords
        if ((headerStr.includes('iqama') || headerStr.includes('id#') || headerStr.includes('هوية')) && 
            (headerStr.includes('name') || headerStr.includes('اسم'))) {
            return 'employees';
        }

        // Violations Keywords
        if ((headerStr.includes('violation') || headerStr.includes('مخالفة') || headerStr.includes('fine') || headerStr.includes('غرامة')) && 
            (headerStr.includes('amount') || headerStr.includes('مبلغ') || headerStr.includes('status'))) {
            return 'violations';
        }

        // Licenses Keywords
        if ((headerStr.includes('license') || headerStr.includes('baladiya') || headerStr.includes('civil') || headerStr.includes('رخصة')) && 
            (headerStr.includes('expire') || headerStr.includes('انتهاء'))) {
            return 'licenses';
        }
    }

    return 'unknown';
}


function processEmployeesDataInternal(jsonData) {
    const employees = jsonData.map((row, index) => {
        const branchRaw = find(row, 'cost center', 'cost_center', 'الفرع') || '';
        let branchName = branchRaw;
        if (typeof branchRaw === 'string' && branchRaw.includes('-')) {
            const parts = branchRaw.split('-');
            if (parts.length >= 3) branchName = parts.slice(2).join('-').trim();
            else if (parts.length === 2) branchName = parts[1].trim();
        }

        const iqama = find(row, 'id', 'id#', 'iqama', 'رقم الهوية', 'رقم الإقامة') || '';
        
        return {
            id: (index + 1).toString(),
            name: find(row, 'name', 'الاسم') || '',
            iqama: String(iqama),
            brand: find(row, 'band', 'brand', 'العلامة التجارية') || '',
            branch: branchName || find(row, 'branch', 'الموقع') || '',
            cost_center: branchRaw,
            region: find(row, 'region', 'المنطقة') || '',
            health_expiry: find(row, 'health card', 'health_expiry', 'انتهاء الصحية', 'تاريخ انتهاء') || '',
            status1: find(row, 'status1', 'status', 'الحالة') || '',
            status2: find(row, 'status2') || '',
            training_end: find(row, 'training end', 'training_end', 'انتهاء التدريب') || '',
            email: find(row, 'email', 'البريد') || '',
            sap_id: find(row, 'sap id', 'sap') || '',
            position: find(row, 'position', 'job', 'الوظيفة') || '',
            ops1: find(row, 'ops', 'ops1') || '',
            hire_date: find(row, 'hire date', 'hire_date', 'تاريخ التعيين') || '',
            city: find(row, 'city', 'المدينة') || ''
        };
    }).filter(e => e.name && e.iqama);

    const mode = getMergeMode();
    if(mode === 'replace'){
        localStorage.setItem('admin_employees', JSON.stringify(employees));
    } else {
        const existing = JSON.parse(localStorage.getItem('admin_employees') || '[]');
        const res = mergeEmployees(existing, employees);
        localStorage.setItem('admin_employees', JSON.stringify(res.merged));
    }
    extractBranchesFromData(employees);
    loadEmployees();
    setLastUpdateSource('manual');
}

function processViolationsData(rows, silent = false, sourceFileName = '') {
    if (!rows || rows.length === 0) {
        if(!silent) alert('الملف فارغ!');
        return;
    }

    const rawViolations = rows.map((row, idx) => {
        // Use global 'find' helper for flexible column matching
        // Added more keywords based on user feedback and common excel formats
        const branch = find(row, 'branch', 'restaurant', 'store', 'site', 'location', 'cc', 'cost center', 'الفرع', 'الموقع', 'المتجر', 'مركز التكلفة') || 'Unknown Branch';
        let region = find(row, 'region', 'area', 'zone', 'المنطقة', 'النطاق') || 'Unknown';
        const type = find(row, 'violation', 'type', 'observation', 'desc', 'description', 'note', 'reason', 'المخالفة', 'نوع المخالفة', 'الملاحظة', 'السبب', 'البيان') || 'Other';
        const rawAmount = find(row, 'amount', 'fine', 'cost', 'total', 'price', 'sar', 'value', 'الغرامة', 'المبلغ', 'القيمة', 'الاجمالي', 'التكلفة') || 0;
        const status = find(row, 'status', 'state', 'paid', 'الحالة', 'الوضع', 'السداد') || 'Open';
        
        // Date handling - try multiple formats
        let dateVal = find(row, 'date', 'created', 'time', 'التاريخ', 'وقت', 'يوم');
        if (dateVal && typeof dateVal === 'number') {
            // Excel serial date
            const dateObj = new Date(Math.round((dateVal - 25569) * 86400 * 1000));
            dateVal = dateObj.toISOString().split('T')[0];
        } else if (!dateVal) {
             dateVal = new Date().toISOString().split('T')[0];
        }

        const date = dateVal;

        // Normalize Region if empty but branch exists (Try to guess or leave Unknown)
        // If Region is Unknown, maybe we can infer from Branch name if it contains city
        if (region === 'Unknown' && branch !== 'Unknown Branch') {
            const bLower = branch.toLowerCase();
            if (bLower.includes('riyadh') || bLower.includes('ruh') || bLower.includes('الرياض')) region = 'Riyadh';
            else if (bLower.includes('jeddah') || bLower.includes('jed') || bLower.includes('جدة') || bLower.includes('makkah') || bLower.includes('مكة')) region = 'Western';
            else if (bLower.includes('dammam') || bLower.includes('dmm') || bLower.includes('khobar') || bLower.includes('الدمام') || bLower.includes('الخبر')) region = 'Eastern';
        }

        // Normalize Region Standard Names
        if (region.toLowerCase().includes('riyadh') || region.includes('الرياض')) region = 'Riyadh'; 
        else if (region.toLowerCase().includes('central') || region.includes('الوسطى')) region = 'Central';
        else if (region.toLowerCase().includes('west') || region.includes('الغربية') || region.includes('جدة') || region.includes('مكة')) region = 'Western';
        else if (region.toLowerCase().includes('east') || region.includes('الشرقية') || region.includes('الدمام') || region.includes('الخبر')) region = 'Eastern';
        else if (region.toLowerCase().includes('north') || region.includes('الشمالية')) region = 'Northern';
        else if (region.toLowerCase().includes('south') || region.includes('الجنوبية') || region.includes('عسير') || region.includes('جيزان')) region = 'Southern';

        return {
            id: Date.now() + '_' + idx,
            branch: branch,
            region: region,
            type: type,
            amount: parseFloat(rawAmount.toString().replace(/[^\d.-]/g, '')) || 0,
            status: status,
            date: date,
            source_file: sourceFileName || ''
        };
    });

    const existing = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
    const merged = existing.concat(rawViolations);
    localStorage.setItem('admin_violations_raw', JSON.stringify(merged));
    recomputeViolationsFromRaw();
    if(!silent) alert('تم معالجة الملف وحفظ البيانات بنجاح!');
}

function calculateViolationsStats(rows) {
    let totalViolations = 0;
    let totalAmount = 0;
    let openViolations = 0;
    let closedViolations = 0;
    
    const regionsMap = {}; 
    const branchesMap = {}; 
    const typesMap = {}; 

    rows.forEach(row => {
        const isOpen = row.status.toLowerCase().includes('open') || row.status.includes('مفتوح');
        
        totalViolations++;
        totalAmount += row.amount;
        if (isOpen) openViolations++;
        else closedViolations++;

        if (!regionsMap[row.region]) regionsMap[row.region] = { count: 0, amount: 0 };
        regionsMap[row.region].count++;
        regionsMap[row.region].amount += row.amount;

        if (!branchesMap[row.branch]) branchesMap[row.branch] = { count: 0, amount: 0 };
        branchesMap[row.branch].count++;
        branchesMap[row.branch].amount += row.amount;

        if (!typesMap[row.type]) typesMap[row.type] = 0;
        typesMap[row.type]++;
    });

    const finalData = {
        summary: { total_violations: totalViolations, total_amount: totalAmount, open_violations: openViolations, closed_violations: closedViolations },
        regions: Object.keys(regionsMap).map(r => ({ name: r, count: regionsMap[r].count, amount: regionsMap[r].amount })),
        top_branches_frequency: Object.keys(branchesMap).map(b => ({ branch: b, count: branchesMap[b].count })).sort((a, b) => b.count - a.count).slice(0, 5),
        top_branches_risk: Object.keys(branchesMap).map(b => ({ branch: b, amount: branchesMap[b].amount })).sort((a, b) => b.amount - a.amount).slice(0, 5),
        common_types: Object.keys(typesMap).map(t => ({ type: t, count: typesMap[t], icon: "⚠️" })).sort((a, b) => b.count - a.count).slice(0, 5)
    };

    localStorage.setItem('violations_data_override', JSON.stringify(finalData));
}

function renderViolationsEditor() {
    const tbody = document.getElementById('violations-editor-body');
    if(!tbody) return;
    
    const rowsAll = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
    const enabled = getEnabledSourceNames();
    const rows = rowsAll.filter(r => !r.source_file || enabled.includes(r.source_file));
    const pagination = document.getElementById('vio-pagination');
    
    if(rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">لا توجد بيانات. قم برفع ملف Excel.</td></tr>';
        if(pagination) pagination.textContent = '';
        return;
    }

    const search = document.getElementById('vio-search')?.value.toLowerCase() || '';
    const filtered = rows.filter(r => 
        r.branch.toLowerCase().includes(search) || 
        r.region.toLowerCase().includes(search) ||
        r.type.toLowerCase().includes(search)
    );

    const displayRows = filtered.slice(0, 50);

    tbody.innerHTML = displayRows.map(r => `
        <tr>
            <td><input type="text" value="${r.branch}" onchange="updateViolation('${r.id}', 'branch', this.value)" class="form-control" style="width:150px;"></td>
            <td><input type="text" value="${r.region}" onchange="updateViolation('${r.id}', 'region', this.value)" class="form-control" style="width:100px;"></td>
            <td><input type="text" value="${r.type}" onchange="updateViolation('${r.id}', 'type', this.value)" class="form-control" style="width:150px;"></td>
            <td><input type="number" value="${r.amount}" onchange="updateViolation('${r.id}', 'amount', this.value)" class="form-control" style="width:80px;"></td>
            <td><input type="text" value="${r.date}" onchange="updateViolation('${r.id}', 'date', this.value)" class="form-control" style="width:100px;"></td>
            <td>
                <select onchange="updateViolation('${r.id}', 'status', this.value)" class="form-control" style="width:100px;">
                    <option value="Open" ${r.status==='Open'?'selected':''}>Open</option>
                    <option value="Closed" ${r.status==='Closed'?'selected':''}>Closed</option>
                </select>
            </td>
            <td><button onclick="deleteViolation('${r.id}')" class="btn btn-danger" style="padding:2px 6px;">🗑️</button></td>
        </tr>
    `).join('');

    if(pagination) pagination.textContent = `عرض ${displayRows.length} من أصل ${rows.length}`;
}

window.updateViolation = function(id, field, value) {
    const rows = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
    const idx = rows.findIndex(r => r.id === id);
    if(idx !== -1) {
        if(field === 'amount') value = parseFloat(value) || 0;
        rows[idx][field] = value;
        localStorage.setItem('admin_violations_raw', JSON.stringify(rows));
        recomputeViolationsFromRaw();
    }
};

window.deleteViolation = function(id) {
    if(!confirm('حذف هذه المخالفة؟')) return;
    let rows = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
    rows = rows.filter(r => r.id !== id);
    localStorage.setItem('admin_violations_raw', JSON.stringify(rows));
    recomputeViolationsFromRaw();
    renderViolationsEditor();
};

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('vio-search');
    if(search) search.addEventListener('input', renderViolationsEditor);
    renderViolationsEditor();
});

function handleViolationsJsonUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            // Basic validation
            if (!json.summary) {
                if(!confirm('هيكل الملف يبدو مختلفاً. هل أنت متأكد من الاستمرار؟')) return;
            }
            localStorage.setItem('violations_data_override', JSON.stringify(json));
            loadViolationsStats();
            alert('تم استيراد ملف JSON بنجاح!');
        } catch (err) {
            alert('خطأ في قراءة ملف JSON: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function downloadViolationsJSON() {
    const localData = localStorage.getItem('violations_data_override');
    if (!localData) {
        alert('لا توجد بيانات مخصصة لتصديرها (يتم استخدام الافتراضي).');
        return;
    }
    
    const blob = new Blob([localData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'violations_data_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearViolationsData() {
    if (confirm('هل أنت متأكد من مسح جميع بيانات المخالفات المخصصة والعودة للوضع الافتراضي؟')) {
        localStorage.removeItem('violations_data_override');
        loadViolationsStats();
        alert('تم مسح البيانات.');
    }
}

// --- STRATEGIC ANALYSIS & AI LOGIC ---

function generateStrategicReport() {
    const btn = document.querySelector('button[onclick="generateStrategicReport()"]');
    const yearFilter = document.getElementById('ai-year-filter')?.value || 'all';

    if(btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ جاري التحليل...';
    }

    // 1. Gather Data
    const violationsData = JSON.parse(localStorage.getItem('violations_data_override') || '{}');
    const employees = JSON.parse(localStorage.getItem('admin_employees') || '[]');
    const branches = JSON.parse(localStorage.getItem('admin_branches_data') || '[]');
    
    // Simulate Processing Delay
    setTimeout(() => {
        // FILTER DATA BASED ON YEAR
        let filteredRiskData = [];
        let filteredTrendData = [];
        
        if (yearFilter === 'all') {
            // Case: All Years (Show Yearly Trend)
            // A. Risk Map: Use aggregated cities from full dataset
            filteredRiskData = violationsData.cities || violationsData.regions || [];
            
            // B. Trend: Use Yearly Trend
            // We map 'year' key to 'month' key just for the chart renderer compatibility
            filteredTrendData = (violationsData.yearly_trend || []).map(y => ({ month: y.year, count: y.count }));

            const divEff = document.getElementById('insight-efficiency');
            if(divEff) divEff.innerHTML = '💡 <strong>تحليل سنوي شامل:</strong> يوضح الرسم البياني أعلاه إجمالي المخالفات لكل سنة.';

        } else {
            // Case: Specific Year
            // We need to re-aggregate from raw rows if available, otherwise we can't filter accurately.
            // If raw_rows exists:
            if (violationsData.raw_rows) {
                const rows = violationsData.raw_rows.filter(r => r.yearKey === yearFilter);
                
                // Re-aggregate Cities for this year
                const cityMap = {};
                const dateMap = {};
                rows.forEach(r => {
                    if(!cityMap[r.city]) cityMap[r.city] = 0;
                    cityMap[r.city]++;
                    
                    if(r.dateKey !== 'Unknown') {
                        if(!dateMap[r.dateKey]) dateMap[r.dateKey] = 0;
                        dateMap[r.dateKey]++;
                    }
                });

                filteredRiskData = Object.keys(cityMap).map(c => ({ name: c, count: cityMap[c] }));
                filteredTrendData = Object.keys(dateMap).sort().map(d => ({ month: d, count: dateMap[d] }));

            } else {
                // Fallback if no raw rows (old data format): Just show empty or warning
                filteredRiskData = [];
                filteredTrendData = [];
                alert('⚠️ لا توجد بيانات تفصيلية (Raw Rows) لهذا العام. يرجى إعادة رفع ملف Excel محدث.');
            }
            
            const divEff = document.getElementById('insight-efficiency');
            if(divEff) divEff.innerHTML = `💡 <strong>تحليل عام ${yearFilter}:</strong> يوضح الرسم البياني أعلاه اتجاه المخالفات الشهري لعام ${yearFilter}.`;
        }

        // A. Render Risk Map
        const sortedRisk = [...filteredRiskData].sort((a,b) => b.count - a.count).slice(0, 7);
        renderAdminChart('chart-risk-map', sortedRisk, 'count', 'name');

        // B. Render Trend (Efficiency/Trend Chart)
        if (filteredTrendData.length > 0) {
            renderAdminChart('chart-efficiency', filteredTrendData, 'count', 'month');
        } else {
            document.getElementById('chart-efficiency').innerHTML = '<div style="text-align:center;color:#888;padding:20px;">لا توجد بيانات لهذا العام</div>';
        }

        // C. Correlation (Training vs Violations - Mock/Simulated)
        // Logic: Find branches with high violations and check their training status
        // For now, we simulate a negative correlation
        const correlationData = [
            { label: 'High Training', value: 12 }, // Low Violations
            { label: 'Med Training', value: 45 },
            { label: 'Low Training', value: 88 }  // High Violations
        ];
        renderAdminChart('chart-correlation', correlationData, 'value', 'label');

        // D. Generate Insights
        const insights = [];
        
        // Insight 1: Violations
        const totalVio = violationsData.summary?.total_violations || 0;
        if(totalVio > 50) insights.push(`⚠️ <strong>ارتفاع المخالفات:</strong> تم رصد ${totalVio} مخالفة. يوصى بتكثيف الرقابة.`);
        else insights.push(`✅ <strong>وضع المخالفات:</strong> المعدل ضمن النطاق المقبول (${totalVio}).`);

        // Insight 2: Training (from Employees)
        const expiredHealth = employees.filter(e => {
            if(!e.health_expiry) return false;
            return new Date(e.health_expiry) < new Date();
        }).length;
        if(expiredHealth > 0) insights.push(`🚨 <strong>الشهادات الصحية:</strong> يوجد ${expiredHealth} موظف بشهادات منتهية. يجب التجديد فوراً.`);

        // Insight 3: AI Recommendation
        const commonType = violationsData.common_types?.[0]?.type || 'N/A';
        if(commonType !== 'N/A') insights.push(`💡 <strong>توصية AI:</strong> أكثر المخالفات تكراراً هي "${commonType}". اقترح عقد ورشة عمل مخصصة لهذا الموضوع.`);

        // Render Recommendations
        const recList = document.getElementById('ai-recommendations-list');
        if(recList) {
            recList.innerHTML = insights.map(i => `
                <div class="ai-rec-item">
                    <div class="rec-icon">🤖</div>
                    <div class="rec-content">${i}</div>
                </div>
            `).join('');
        }

        // Update Insight Boxes
        const divCorr = document.getElementById('insight-correlation');
        if(divCorr) divCorr.innerHTML = '💡 <strong>تحليل AI:</strong> توجد علاقة عكسية قوية. الفروع الملتزمة بالتدريب تقل مخالفاتها بنسبة 60%.';
        
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 تحديث التحليل';
        }
        
        // alert('تم تحديث التقرير الاستراتيجي بنجاح!'); // Removed alert to avoid annoyance

    }, 800);
}

function renderAdminChart(id, data, valKey, labelKey) {
    const container = document.getElementById(id);
    if(!container) return;
    container.innerHTML = '';
    
    if(!data || data.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#888;padding:20px;">لا توجد بيانات</div>';
        return;
    }

    const max = Math.max(...data.map(d => d[valKey] || 0)) || 100;

    data.forEach(item => {
        const val = item[valKey] || 0;
        const percent = (val / max) * 100;
        const label = item[labelKey] || 'Unknown';
        
        const bar = document.createElement('div');
        bar.style.marginBottom = '10px';
        bar.innerHTML = `
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:2px;">
                <span>${label}</span>
                <span>${val}</span>
            </div>
            <div style="background:rgba(255,255,255,0.1);height:8px;border-radius:4px;overflow:hidden;">
                <div style="width:${percent}%;height:100%;background:#4facfe;border-radius:4px;"></div>
            </div>
        `;
        container.appendChild(bar);
    });
}

function processAICommand() {
    const input = document.getElementById('ai-command-input');
    if(!input) return;
    const cmd = input.value.trim().toLowerCase();
    if(!cmd) return;

    // Simulate AI Parsing
    if(cmd.includes('مخالفات') || cmd.includes('violation')) {
        showSection('violations');
        alert('🤖 قمت بنقلك إلى صفحة إدارة المخالفات بناءً على طلبك.');
    } else if(cmd.includes('موظف') || cmd.includes('employee')) {
        showSection('employees');
        document.getElementById('emp-search').focus();
        alert('🤖 تفضل، هذه صفحة الموظفين. يمكنك البحث مباشرة.');
    } else if(cmd.includes('تقرير') || cmd.includes('report')) {
        generateStrategicReport();
    } else if(cmd.includes('خطة') || cmd.includes('plan')) {
        const recList = document.getElementById('ai-recommendations-list');
        if(recList) {
             recList.innerHTML += `
                <div class="ai-rec-item" style="border-right: 3px solid #00f260;">
                    <div class="rec-icon">📅</div>
                    <div class="rec-content"><strong>تم إنشاء خطة مقترحة:</strong> 1. تدريب مكثف (الأسبوع 1) - 2. تدقيق داخلي (الأسبوع 2) - 3. مراجعة النتائج.</div>
                </div>
            `;
            alert('🤖 تم إضافة خطة مقترحة في قسم التوصيات.');
        }
    } else {
        alert('🤖 عذراً، لم أفهم الأمر تماماً. جرب: "أظهر المخالفات"، "تقرير استراتيجي"، "ابحث عن موظف".');
    }
    
    input.value = '';
}

// --- NEW FUNCTIONS FOR TASKS & ADVANCED DATA ---

function renderTasksSummary() {
    const tbody = document.getElementById('admin-tasks-body');
    const tasks = JSON.parse(localStorage.getItem('admin_tasks') || '[]');
    
    // Update Stats
    const pending = tasks.filter(t => t.status === 'pending').length;
    const progress = tasks.filter(t => t.status === 'inprogress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    
    document.getElementById('admin-task-pending').textContent = pending;
    document.getElementById('admin-task-progress').textContent = progress;
    document.getElementById('admin-task-completed').textContent = completed;

    if (tbody) {
        tbody.innerHTML = '';
        if (tasks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">لا توجد مهام مسجلة</td></tr>';
            return;
        }

        // Show last 5 tasks
        tasks.slice(-5).reverse().forEach(t => {
            const tr = document.createElement('tr');
            
            let statusColor = '#f59e0b';
            if (t.status === 'inprogress') statusColor = '#4facfe';
            if (t.status === 'completed') statusColor = '#10b981';

            tr.innerHTML = `
                <td>${t.title}</td>
                <td>${t.assignee || 'غير محدد'}</td>
                <td><span class="badge" style="background: rgba(255,255,255,0.1);">${t.priority}</span></td>
                <td>${t.dueDate}</td>
                <td><span class="badge" style="background: ${statusColor}; color: #fff;">${t.status}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function loadServicesJson() {
    const editor = document.getElementById('services-json-editor');
    if (!editor) return;
    
    const saved = localStorage.getItem('services_data_override');
    if (saved) {
        // Pretty print existing override
        try {
            editor.value = JSON.stringify(JSON.parse(saved), null, 4);
        } catch (e) {
            editor.value = saved;
        }
    } else {
        // Load default structure hint
        editor.value = JSON.stringify({
            "kpis": {
                "activeRequests": 0,
                "completedToday": 0,
                "avgResponseTime": "0h",
                "employeeSatisfaction": "0%"
            },
            "requests": []
        }, null, 4);
    }
}

function saveServicesJson() {
    const editor = document.getElementById('services-json-editor');
    if (!editor) return;

    try {
        const json = JSON.parse(editor.value);
        localStorage.setItem('services_data_override', JSON.stringify(json));
        alert('تم حفظ بيانات الخدمات بنجاح!');
        loadComplaints(); // Refresh if needed
    } catch (e) {
        alert('خطأ في صيغة JSON: ' + e.message);
    }
}

function loadBoardJson() {
    const editor = document.getElementById('board-json-editor');
    if (!editor) return;

    const saved = localStorage.getItem('board_overrides');
    if (saved) {
        try {
            editor.value = JSON.stringify(JSON.parse(saved), null, 4);
        } catch (e) {
            editor.value = saved;
        }
    } else {
        editor.value = "// لا توجد بيانات مخصصة حالياً. سيتم استخدام البيانات الافتراضية.";
    }
}

function saveBoardJson() {
    const editor = document.getElementById('board-json-editor');
    if (!editor) return;

    try {
        const val = editor.value.trim();
        if (!val || val.startsWith('//')) {
             if(confirm('هل تريد مسح البيانات المخصصة؟')) {
                 localStorage.removeItem('board_overrides');
                 alert('تم مسح البيانات المخصصة.');
             }
             return;
        }
        const json = JSON.parse(val);
        localStorage.setItem('board_overrides', JSON.stringify(json));
        alert('تم حفظ بيانات اللوحة بنجاح!');
    } catch (e) {
        alert('خطأ في صيغة JSON: ' + e.message);
    }
}

function formatBoardJson() {
    const editor = document.getElementById('board-json-editor');
    if (!editor) return;
    try {
        const json = JSON.parse(editor.value);
        editor.value = JSON.stringify(json, null, 4);
    } catch (e) {
        alert('Cannot format invalid JSON');
    }
}

function getUploadHistory(){
    try{ return JSON.parse(localStorage.getItem('admin_upload_history') || '[]'); }catch(e){ return []; }
}
function setUploadHistory(arr){
    localStorage.setItem('admin_upload_history', JSON.stringify(arr));
}
function upsertUploadHistory(name, types){
    const hist = getUploadHistory();
    const idx = hist.findIndex(h => h.name === name);
    const entry = { name, types: Array.isArray(types)?types:[], enabled: true, ts: Date.now() };
    if(idx !== -1){
        hist[idx] = { ...hist[idx], types: entry.types, enabled: true, ts: entry.ts };
    } else {
        hist.push(entry);
    }
    setUploadHistory(hist);
}
function renderUploadFilesList(){
    const list = document.getElementById('upload-files-list');
    if(!list) return;
    const hist = getUploadHistory();
    list.innerHTML = '';
    
    // Add "Delete All" button if there are files
    if (hist.length > 0) {
        const headerActions = document.createElement('div');
        headerActions.style.marginBottom = '10px';
        headerActions.style.textAlign = 'right';
        
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'مسح جميع الملفات';
        clearBtn.className = 'btn btn-danger';
        clearBtn.style.fontSize = '0.8rem';
        clearBtn.style.padding = '4px 10px';
        clearBtn.onclick = () => {
            if(confirm('هل أنت متأكد من حذف سجل جميع الملفات المرفوعة؟ سيتم إعادة ضبط البيانات.')) {
                setUploadHistory([]);
                localStorage.removeItem('admin_violations_raw');
                localStorage.removeItem('violations_data_override');
                localStorage.removeItem('admin_employees'); // Optional: Clear employees too? Maybe safer to ask.
                // For now, let's clear history and re-render, user can re-upload.
                // Actually, clearing raw data is important to remove the effect of files.
                recomputeViolationsFromRaw(); 
                renderUploadFilesList();
                renderViolationsEditor();
                alert('تم مسح السجل والبيانات المرتبطة.');
            }
        };
        headerActions.appendChild(clearBtn);
        list.appendChild(headerActions);
    }

    hist.forEach(h => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.gap = '10px';
        row.style.padding = '8px';
        row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '10px';
        
        // Checkbox for enable/disable
        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.checked = !!h.enabled;
        toggle.style.cursor = 'pointer';
        toggle.onchange = () => {
            const hist2 = getUploadHistory();
            const idx2 = hist2.findIndex(x=>x.name===h.name);
            if(idx2!==-1){
                hist2[idx2].enabled = toggle.checked;
                setUploadHistory(hist2);
                recomputeViolationsFromRaw();
                renderViolationsEditor();
            }
        };

        const nameSpan = document.createElement('span');
        nameSpan.textContent = h.name;
        nameSpan.style.color = h.enabled ? '#e2e8f0' : '#64748b';
        nameSpan.style.fontSize = '0.9rem';

        left.appendChild(toggle);
        left.appendChild(nameSpan);

        const right = document.createElement('div');
        right.style.display = 'flex';
        right.style.alignItems = 'center';
        right.style.gap = '10px';

        const types = document.createElement('div');
        types.style.display = 'flex';
        types.style.gap = '4px';
        h.types.forEach(t=>{
            const badge = document.createElement('span');
            badge.textContent = t;
            badge.style.padding = '2px 6px';
            badge.style.border = '1px solid #334155';
            badge.style.borderRadius = '4px';
            badge.style.fontSize = '0.7rem';
            badge.style.color = '#94a3b8';
            types.appendChild(badge);
        });
        
        // Delete Single File Button
        const delBtn = document.createElement('button');
        delBtn.textContent = '×';
        delBtn.style.background = 'none';
        delBtn.style.border = 'none';
        delBtn.style.color = '#ef4444';
        delBtn.style.fontSize = '1.2rem';
        delBtn.style.cursor = 'pointer';
        delBtn.title = 'حذف الملف';
        delBtn.onclick = () => {
            if(confirm(`حذف الملف "${h.name}" من السجل؟`)) {
                const hist3 = getUploadHistory().filter(x => x.name !== h.name);
                setUploadHistory(hist3);
                // Also remove data associated with this file from raw storage
                const raw = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
                const newRaw = raw.filter(r => r.source_file !== h.name);
                localStorage.setItem('admin_violations_raw', JSON.stringify(newRaw));
                
                recomputeViolationsFromRaw();
                renderUploadFilesList();
                renderViolationsEditor();
            }
        };

        right.appendChild(types);
        right.appendChild(delBtn);
        
        row.appendChild(left);
        row.appendChild(right);
        list.appendChild(row);
    });
}
function getEnabledSourceNames(){
    return getUploadHistory().filter(h=>h.enabled).map(h=>h.name);
}
function recomputeViolationsFromRaw(){
    const raw = JSON.parse(localStorage.getItem('admin_violations_raw') || '[]');
    const enabled = getEnabledSourceNames();
    const filtered = raw.filter(r => !r.source_file || enabled.includes(r.source_file));
    calculateViolationsStats(filtered);
    loadViolationsStats();
}

// --- LICENSES & PERMITS LOGIC ---

function handleLicensesExcelUpload(e) {
    if(typeof XLSX === 'undefined'){ alert('مكتبة SheetJS غير محملة.'); return; }
    const file = e.target.files[0];
    if(!file) return;

    document.getElementById('lic-file-name').textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // 1. Get all data as array of arrays to find header row
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (!rawData || rawData.length === 0) { alert('الملف فارغ!'); return; }

        // 2. Find Header Row (look for keywords like "Branch", "Restaurant", "Store License")
        let headerRowIndex = 0;
        const keywords = ['branch', 'restaurant', 'store license', 'civil defense', 'region', 'الفرع', 'المنطقة'];
        
        for (let i = 0; i < Math.min(20, rawData.length); i++) {
            const rowStr = JSON.stringify(rawData[i]).toLowerCase();
            const matchCount = keywords.filter(k => rowStr.includes(k)).length;
            if (matchCount >= 2) { // At least 2 matches to be sure
                headerRowIndex = i;
                break;
            }
        }

        console.log('Detected Header Row Index:', headerRowIndex);

        // 3. Re-parse with correct header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: headerRowIndex });
        
        processLicensesData(jsonData);
        upsertUploadHistory(file.name, ['licenses']);
        renderUploadFilesList();
    };
    reader.readAsArrayBuffer(file);
}

function processLicensesData(rows) {
    if (!rows || rows.length === 0) { alert('الملف فارغ!'); return; }

    // Parse Rows
    const licenses = rows.map(row => {
        // 1. Branch Name
        const branch = find(row, 'restaurant', 'branch', 'name', 'الفرع', 'site') || 'Unknown';
        
        // 2. Cost (if exists in excel, otherwise keep existing or 0)
        
        // 3. Store License
        const storeExpH = find(row, 'store license expiration h', 'baladiya exp h', 'municipal license exp h');
        const storeExpG = find(row, 'store license expiration g', 'baladiya exp g', 'municipal license exp g');
        const storeStatus = find(row, 'store license status', 'baladiya status', 'municipal license status') || 'Unknown';
        
        // 4. Civil Defense
        const civilExpH = find(row, 'civil defense expiration h', 'civil exp h');
        const civilExpG = find(row, 'civil defense expiration g', 'civil exp g');
        const civilStatus = find(row, 'civil defense status', 'civil status') || 'Unknown';

        // 5. Permits
        const p24Status = find(row, '24 hours', '24 h', 'baladiya 24', 'operational permit') || 'No';
        const hdStatus = find(row, 'home delivery', 'hd permit', 'delivery') || 'No';

        // 6. Region & Brand (New Extraction Logic)
        const region = find(row, 'region', 'area', 'المنطقة') || '';
        const brand = find(row, 'brand', 'band', 'العلامة') || '';

        return {
            branch: branch,
            region: region,
            brand: brand,
            cost: 0, 
            store_license: {
                exp_h: storeExpH,
                exp_g: storeExpG,
                status: storeStatus
            },
            civil_defense: {
                exp_h: civilExpH,
                exp_g: civilExpG,
                status: civilStatus
            },
            permit_24: { status: p24Status },
            permit_hd: { status: hdStatus }
        };
    }).filter(l => l.branch && l.branch !== 'Unknown' && l.branch !== 'Branch' && l.branch !== 'Restaurant'); // Filter header repeats or empty

    // Merge with existing costs if any
    const existing = JSON.parse(localStorage.getItem('admin_licenses') || '[]');
    const costMap = {};
    existing.forEach(e => {
        if(e.cost) costMap[e.branch] = e.cost;
    });

    licenses.forEach(l => {
        if(costMap[l.branch]) l.cost = costMap[l.branch];
    });

    localStorage.setItem('admin_licenses', JSON.stringify(licenses));
    renderLicensesTable();
    alert(`تم معالجة ${licenses.length} فرع بنجاح!`);
}

function downloadLicensesTemplate() {
    const data = [
        {
            "Branch": "Riyadh - Olaya - 101",
            "Region": "Central",
            "Brand": "BK",
            "Store License Status": "Valid",
            "Store License Expiration G": "2026-01-01",
            "Civil Defense Status": "Valid",
            "Civil Defense Expiration G": "2026-05-01",
            "24 Hours": "Yes",
            "Home Delivery": "Yes"
        },
        {
            "Branch": "Jeddah - Corniche - 202",
            "Region": "Western",
            "Brand": "TC",
            "Store License Status": "Near Expiration",
            "Store License Expiration G": "2025-02-15",
            "Civil Defense Status": "Expired",
            "Civil Defense Expiration G": "2024-12-01",
            "24 Hours": "No",
            "Home Delivery": "Yes"
        }
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Licenses Template");
    XLSX.writeFile(wb, "Licenses_Template.xlsx");
}

function renderLicensesTable() {
    const tbody = document.getElementById('licenses-table-body');
    if(!tbody) return;

    const data = JSON.parse(localStorage.getItem('admin_licenses') || '[]');
    tbody.innerHTML = '';

    if(data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#888;">لا توجد بيانات. قم برفع ملف Excel.</td></tr>';
        return;
    }

    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        
        // Status Colors
        const getStatusColor = (s) => {
            const st = (s||'').toLowerCase();
            if(st.includes('valid') || st.includes('ساري')) return 'color:#10b981; font-weight:bold;'; // Green
            if(st.includes('near') || st.includes('expiring')) return 'color:#f59e0b; font-weight:bold;'; // Orange
            if(st.includes('expired') || st.includes('منتهي')) return 'color:#ef4444; font-weight:bold;'; // Red
            return '';
        };

        tr.innerHTML = `
            <td>${item.branch}</td>
            <td>
                <input type="number" class="form-control" style="width:80px; padding:2px 5px;" 
                       value="${item.cost || 0}" 
                       onchange="updateLicenseCost(${index}, this.value)">
            </td>
            <td style="${getStatusColor(item.store_license.status)}">
                ${item.store_license.status} <br>
                <small style="color:#666; font-weight:normal;">${item.store_license.exp_g || ''}</small>
            </td>
            <td style="${getStatusColor(item.civil_defense.status)}">
                ${item.civil_defense.status} <br>
                <small style="color:#666; font-weight:normal;">${item.civil_defense.exp_g || ''}</small>
            </td>
            <td>${item.permit_24.status}</td>
            <td>${item.permit_hd.status}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateLicenseCost(index, value) {
    const data = JSON.parse(localStorage.getItem('admin_licenses') || '[]');
    if(data[index]) {
        data[index].cost = parseFloat(value) || 0;
        localStorage.setItem('admin_licenses', JSON.stringify(data));
    }
}

function saveBranchCosts() {
    // Costs are saved on change, but this provides visual feedback
    alert('تم حفظ التكاليف بنجاح!');
    
    // Also update board KPIs if needed (Optional)
    // We could sum costs and update a CMS field
    const data = JSON.parse(localStorage.getItem('admin_licenses') || '[]');
    const totalCost = data.reduce((sum, item) => sum + (item.cost || 0), 0);
    console.log('Total Operational Cost:', totalCost);
}

function clearLicensesData() {
    if(confirm('هل أنت متأكد من مسح جميع بيانات التراخيص؟')) {
        localStorage.removeItem('admin_licenses');
        renderLicensesTable();
        alert('تم مسح البيانات.');
    }
}

function toggleLicensesVisibility() {
    const showDashboard = document.getElementById('chk-show-licenses-dashboard').checked;
    const showPublic = document.getElementById('chk-show-licenses-public').checked;
    
    localStorage.setItem('config_show_licenses_dashboard', showDashboard);
    localStorage.setItem('config_show_licenses_public', showPublic);
    
    // Also update board data override to sync with frontend if needed
    // But local storage config is enough for client-side logic on same domain
}

function loadLicensesConfig() {
    const showDashboard = localStorage.getItem('config_show_licenses_dashboard') === 'true';
    const showPublic = localStorage.getItem('config_show_licenses_public') === 'true';
    
    const chkDash = document.getElementById('chk-show-licenses-dashboard');
    const chkPub = document.getElementById('chk-show-licenses-public');
    
    if(chkDash) chkDash.checked = showDashboard;
    if(chkPub) chkPub.checked = showPublic;
}

// Initial Render for Licenses
document.addEventListener('DOMContentLoaded', () => {
    renderLicensesTable();
    loadLicensesConfig();
});
