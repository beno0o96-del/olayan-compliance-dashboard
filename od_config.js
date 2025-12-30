window.OD_CONFIG = {
  enabled: true,
  clientId: "YOUR_AZURE_AD_APP_CLIENT_ID",
  authority: "https://login.microsoftonline.com/common",
  redirectUri: (function(){
    try{
      const p = window.location.pathname;
      const idx = p.replace(/[^/]+$/, 'index.html');
      return window.location.origin + idx;
    }catch(e){
      return window.location.href;
    }
  })(),
  itemId: "",
  shareUrl: "https://olayanfinancingcompany-my.sharepoint.com/:x:/g/personal/b1_ahmed_olayanfood_com/IQATTkGdfgOoRJuk2xYJnVIEAeoAQnH8uAZX__W3thNLLaM?email=beno0o96%40gmail.com&e=UZAecn",
  tenantId: "",
  scope: ["User.Read", "Files.Read.All"]
};
try{
  const override = JSON.parse(localStorage.getItem('OD_CONFIG')||'{}');
  if (override && typeof override === 'object'){
    window.OD_CONFIG = Object.assign({}, window.OD_CONFIG, override);
  }
}catch(e){}
