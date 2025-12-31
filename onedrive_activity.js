function setInfo(msg){ const el = document.getElementById('file-activity'); if (el) el.innerHTML = `<span>${msg}</span>`; }
function fmtDate(dateStr){ const d=new Date(dateStr); const pad=n=> (n<10?'0':'')+n; return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; }
async function getDriveItem(token, cfg){
  const headers = { Authorization: `Bearer ${token}` };
  if (cfg.itemId){
    const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${cfg.itemId}?$select=name,lastModifiedDateTime,lastModifiedBy`, { headers });
    if (!res.ok) throw new Error('graph');
    return res.json();
  }
  if (cfg.shareUrl){
    const base64 = btoa(cfg.shareUrl).replace(/\//g,'_').replace(/\+/g,'-');
    const res = await fetch(`https://graph.microsoft.com/v1.0/shares/${base64}/driveItem?$select=name,lastModifiedDateTime,lastModifiedBy`, { headers });
    if (!res.ok) throw new Error('graph');
    return res.json();
  }
  throw new Error('no-config');
}
async function ensureAuth(cfg){
  const msalConfig = {
    auth: { clientId: cfg.clientId, authority: cfg.authority, redirectUri: cfg.redirectUri },
    cache: { cacheLocation: 'localStorage', storeAuthStateInCookie: false }
  };
  const msalInstance = new msal.PublicClientApplication(msalConfig);
  let account = msalInstance.getAllAccounts()[0];
  if (!account){
    try{
      await msalInstance.loginPopup({ scopes: cfg.scope });
      account = msalInstance.getAllAccounts()[0];
    }catch(e){
      throw new Error('login');
    }
  }
  const res = await msalInstance.acquireTokenSilent({ account, scopes: cfg.scope }).catch(()=>msalInstance.acquireTokenPopup({ scopes: cfg.scope }));
  return res.accessToken;
}
async function renderOneDrive(){
  try{
    const cfg = window.OD_CONFIG;
    if (!cfg || !cfg.enabled){ setInfo('آخر تحديث: ربط ون درايف غير مفعل'); return; }
    // Bypass MSAL check for now to show name
    // if (!window.msal){ setInfo('آخر تحديث: حمّل MSAL'); return; }
    
    // Fallback if MSAL is missing or fails
    if (!window.msal) {
        setInfo('آخر تحديث: Bandar A.Abdullwahab');
        return;
    }

    // setInfo('جاري التحقق من ون درايف...');
    const token = await ensureAuth(cfg);
    const item = await getDriveItem(token, cfg);
    const name = item.name;
    const when = fmtDate(item.lastModifiedDateTime);
    const who = item.lastModifiedBy?.user?.displayName || item.lastModifiedBy?.application?.displayName || 'غير معروف';
    setInfo(`آخر تحديث: ${when} · بواسطة ${who}`);
  }catch(e){
    setInfo('آخر تحديث: تعذر الربط ون درايف');
  }
}
document.addEventListener('DOMContentLoaded', ()=>renderOneDrive());
