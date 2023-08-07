/* VPN Uzantısı */
const { BrowserWindow,
nativeTheme,
ipcMain,
app,
Menu,
ipcRenderer,
session } = require('@electron/remote');
const { join } = require('path');
const remote = require('@electron/remote');

/* Uzantıların Olduğu Yeri Bul - plugingoreas */
var headDivSelecetVPN = document.getElementById('extensionsMod');

var idkey = 'vpn';

/* Eklentiler Üst Menüye Ekle */
if(document.getElementById(idkey)){
document.getElementById(idkey).addEventListener('click', async () => { 
exVPN();
});
} else {
var vpnproxyopend = store.get('vpn-proxy-opend');
if(vpnproxyopend){
var logoss = join(__dirname, 'BLOCK-VPN.png');
} else {
var logoss = join(__dirname, 'BLOCK-VPN-Closed.png');
}

headDivSelecetVPN.innerHTML += `
<button id="${idkey}" style="width: 39px;" class="re-site-info">
<img id="vpnimage${idkey}" style="width: 100%;" src="${logoss}">
</button>`;

setTimeout(()=>{  
document.getElementById(idkey).addEventListener('click', async () => {
exVPN();
});
}, 1000);
}

async function exVPN() {
let mainWindowVPN = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
//skipTaskbar: true,
width: 300,
height: 400,
x: Math.ceil(document.getElementById(idkey).getBoundingClientRect().left + window.screenX),
y: Math.ceil(document.getElementById(idkey).getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(document.getElementById(idkey), null).height.replace("px", ""))),
//alwaysOnTop: true,
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

let create_loadModalVPN = require('url').format({
pathname: join(__dirname, 'index.html'),
protocol: 'file:',
slashes: true
});

mainWindowVPN.focus();
mainWindowVPN.webContents.once('dom-ready', async () => {
});

mainWindowVPN.on('blur', async () => {
mainWindowVPN.close();
});

//mainWindowVPN.openDevTools({ mode: 'detach' });

mainWindowVPN.loadURL(create_loadModalVPN);
}