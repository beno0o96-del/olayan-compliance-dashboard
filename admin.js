function hash(s){ return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(b=>{ const a=Array.from(new Uint8Array(b)); return a.map(x=>x.toString(16).padStart(2,'0')).join(''); }); }
function setMsg(t){ const m=document.getElementById('msg'); if(m) m.textContent=t; const s=document.getElementById('admin-status'); if(s) s.textContent=t; }
async function setup(){ const u=document.getElementById('username').value.trim(); const p=document.getElementById('pin').value.trim(); if(!u||!p){ setMsg('أدخل اسم ورقم'); return; } const h=await hash(u+':'+p); localStorage.setItem('admin_hash',h); setMsg('تم الحفظ'); }
async function login(){ const u=document.getElementById('username').value.trim(); const p=document.getElementById('pin').value.trim(); const saved=localStorage.getItem('admin_hash'); if(!saved){ setMsg('عيّن البيانات أولاً'); return; } const h=await hash(u+':'+p); if(h===saved){ localStorage.setItem('is_admin','true'); localStorage.setItem('admin_user',u); setMsg('تم تسجيل الدخول'); } else { setMsg('بيانات غير صحيحة'); } }
function logout(){ localStorage.removeItem('is_admin'); setMsg('تم تسجيل الخروج'); }
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
        loadActivityLog();
        loadComplaints();
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
