const APPNAME = "BLOCK Browser";
const { app, crashReporter, BrowserWindow, BrowserView, dialog, ipcMain, ipcRenderer, Menu, session, protocol, components, systemPreferences, nativeTheme } = require('electron');

// in the main process:
require('@electron/remote/main').initialize();

const isDevMode = require('electron-is-dev');

const { format } = require('url');
const { join } = require('path');
const os = require('os');


const path = require('path');
const { promises: fs } = require('fs');
const url = require('url');
const { Extensions, ElectronChromeExtensions } = require('electron-chrome-extensions');
let extensions = null;

const shell = require('electron').shell;
//import { shell } from 'electron';

//STORAGE - DEPOLAMA
const Store = require('electron-store');
let store = new Store();
//let store = new Store({ name: 'sadsad' });

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
process.env['ELECTRON_ENABLE_LOGGING'] = true;

const extensionsPath = app.getPath('userData')+'/extensions';

//user agent set
if (!store.get('settings.user_agent')) {
store.set('settings.user_agent', 'BLOCK');
}

if (!store.get('userAgent')) {
store.set('userAgent', []);
}

if (!store.get('settings.sidebar')) {}
store.set('settings.sidebar', [/*
{ name: 'New Tab', url: 'block://new-tab', status: true, widht: 600, uisytem: true, logo: '<svg class="real-iconssvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16"> <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/> </svg>' },
{ name: 'Settings', url: 'block://settings', status: true, widht: 1024, uisytem: true, logo: '<svg class="real-iconssvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> </svg>', subitem: true },
*/
{ name: 'Coinstats', url: 'https://coinstats.app/refer/CoinStatsAffiliate?utm_source=CoinStatsAffiliate&utm_medium=aff&utm_campaign=inf&utm_id=CoinStatsAffiliate&fpr=patrick88', status: true, widht: 500, uisytem: false  },
{ name: 'Moralismoney', url: 'https://moralismoney.com/?ref=odk1nmz&tapid=&program=moralis-money&tap_s=4082136-207e21', status: true, widht: 500, uisytem: false  },
{ name: 'Defillama', url: 'https://defillama.com', status: true, widht: 500, uisytem: false  },
{ name: 'Dexscreener', url: 'https://dexscreener.com/', status: true, widht: 600, uisytem: false },
{ name: 'DexTools', url: 'https://www.dextools.io/app/en/ether/pairs', status: true, widht: 600, uisytem: false },
{ name: 'Etherscan', url: 'https://etherscan.io/', status: true, widht: 600, uisytem: false },
{ name: 'TradingView', url: 'https://www.tradingview.com/?aff_id=121632&aff_sub=blockbrowser&source=browser', status: true, widht: 600, uisytem: false },
{ name: 'ChatGPT', url: 'https://chat.openai.com', status: true, widht: 600, uisytem: false },
{ name: 'Telegram', url: 'https://web.telegram.org/k/', status: true, widht: 450, uisytem: false  },
{ name: 'Discord', url: 'https://discord.com/app', status: true, widht: 1024, uisytem: false  },
{ name: 'Twitter', url: 'https://x.com/blockbrowser', status: true, widht: 550, uisytem: false  },
{ name: 'Zerion', url: 'https://app.zerion.io/tokens/ETH-eth', status: true, widht: 550, uisytem: false  },
{ name: 'Opensea', url: 'https://opensea.io ', status: true, widht: 550, uisytem: false  },
{ name: 'Marketciphertrading', url: 'https://marketciphertrading.com?ref=54922', status: true, widht: 550, uisytem: false  },
{ name: 'Twitch', url: 'https://www.twitch.tv', status: true, widht: 590, uisytem: false  },
{ name: 'Uniswap', url: 'https://app.uniswap.org/#/swap', status: true, widht: 550, uisytem: false },
// { name: 'Arkham intelligence', url: 'https://www.arkhamintelligence.com/', status: true, widht: 550, uisytem: false },
{ name: 'Youtube', url: 'https://www.youtube.com', status: true, widht: 550, uisytem: false  },
{ name: 'Netflix', url: 'https://www.netflix.com', status: true, widht: 550, uisytem: false  },
]);


if (!store.get('settings.leftbarmenuCacheStarter')) {
store.set('settings.leftbarmenu', true);
store.set('settings.leftbarmenuCacheStarter', true);
}

//TYPE = bing or block
if (!store.get('settings.newtabmode')) {
store.set('settings.newtabmode', 'block');
}
//TYPE = OPERA OR BLOCK
if (!store.get('settings.generalViews')) {
store.set('settings.generalViews', 'BlockTheme1');
}
//TYPE = 58 OR 40
if (!store.get('settings.leftbarmenuSize')) {
store.set('settings.leftbarmenuSize', 58);
}



store.set('vpn-proxy-opend', false);
let mainWindow;

process.noDeprecation = true;

app.setAppUserModelId(APPNAME);

//Google Ayarları
// Google Settings -> https://console.cloud.google.com/
process.env.GOOGLE_API_KEY = 'AIzaSyBArCL81W8enc16MMuYy4Sj-xfZFNKyYSo';
process.env.GOOGLE_DEFAULT_CLIENT_ID = '590185167148-f09884kcvf5p736tcv9ahjtepttbttk6.apps.googleusercontent.com';
process.env.GOOGLE_DEFAULT_CLIENT_SECRET = 'MuenKtdB49ve9GKnEea8hpbA';

/*
//Flash Sistemi Kullanımdan Kaldırıldı
//Flash System Deprecated -> https://www.blog.google/products/chrome/saying-goodbye-flash-chrome/

//Bu kitaplığı kendiniz manuel olarak ekleyebilirsiniz

//You can manually add this library yourself
app.commandLine.appendSwitch('ppapi-flash-path', os.homedir()+'/AppData/Local/block/PepperFlash/29.0.0.171/pepflashplayer.dll');
// Specify flash version, for example, v32.0.0.453
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.171');

// You have to pass the directory that contains widevine library here, it is
// * `libwidevinecdm.dylib` on macOS,
// * `widevinecdm.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', os.homedir()+'/AppData/Local/block/WidevineCdm/_platform_specific/win_x64/widevinecdm.dll');
// The version of plugin can be got from `chrome://components` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2209.0');
*/

//no GPU - Disables hardware acceleration for current app.
if(store.get('settings.gpu')){
app.disableHardwareAcceleration();
}


//Yeni Pencere Aç - Open New Window 
ipcMain.on('newWindowsOpens', () => {
var executablePath = process.execPath;
var parameters = ["--newtab"];
var spawn = require('child_process').spawn;
var child = spawn(executablePath,parameters, {'detached':true});
});

//Yeni Gizli Pencere Aç - Open Incognito New Window 
ipcMain.on('newIncognitoWindowsOpens', () => {
var executablePath = process.execPath;
var parameters = ["--incognitotab"];
var spawn = require('child_process').spawn;
var child = spawn(executablePath,parameters, {'detached':true});
});


//create extensions folder
const fsss = require('fs') ;
!fsss.existsSync(extensionsPath) && fsss.mkdirSync(extensionsPath, { recursive: true });



const manifestExists = async (dirPath) => {
if (!dirPath) return false
const manifestPath = path.join(dirPath, 'manifest.json')
try {
return (await fs.stat(manifestPath)).isFile()
} catch {
return false
}
}

async function loadExtensions(session, extensionsPath) {
const subDirectories = await fs.readdir(extensionsPath, {
withFileTypes: true,
})

const extensionDirectories = await Promise.all(
subDirectories
.filter((dirEnt) => dirEnt.isDirectory())
.map(async (dirEnt) => {
const extPath = path.join(extensionsPath, dirEnt.name)

if (await manifestExists(extPath)) {
return extPath
}

const extSubDirs = await fs.readdir(extPath, {
withFileTypes: true,
})

const versionDirPath =
extSubDirs.length === 1 && extSubDirs[0].isDirectory()
? path.join(extPath, extSubDirs[0].name)
: null

if (await manifestExists(versionDirPath)) {
return versionDirPath
}
})
)

const results = []

for (const extPath of extensionDirectories.filter(Boolean)) {
console.log(`Loading extension from ${extPath}`)
try {
const extensionInfo = await session.loadExtension(extPath)
results.push(extensionInfo)
//const plugs = await session.getExtension(extensionInfo.id); ipcMain.on('dom-loadExtension', async (event, arg) => { await event.reply('dom-addExtension', plugs) });
} catch (e) {
console.error(e)
}
}

return results
}
    

async function addtabs(url) { mainWindow.webContents.send('newTab', url); }

async function createWindow() { 

const dsession = session.defaultSession;

const ExtensionsPreload = path.join(__dirname, 'ExtensionsPreload.js');
dsession.setPreloads([ExtensionsPreload]);


extensions = new Extensions({
session: dsession,
createTab(event, details) {
// Optionally implemented for chrome.tabs.create support
addtabs(event.url);
},
selectTab(event, tab) {
// Optionally implemented for chrome.tabs.update support
},
removeTab(event, tab) {
// Optionally implemented for chrome.tabs.remove support
},
createWindow(details) {
// Optionally implemented for chrome.windows.create support
console.log(details);

if(details.url.startsWith('chrome-extension')){
let idexp = details.url.split("/")[2];
if(idexp){
mainWindow.webContents.executeJavaScript(`document.getElementsByTagName("browser-action-list")[0].shadowRoot.getElementById("${idexp}").click();`);
} else {

const window = new BrowserWindow({
minWidth: 25,
minHeight: 25,
maxWidth: 800,
maxHeight: 600,
width:details.width,
height:details.height,
left: details.left,
top: details.top,
show: true,
frame: true,
parent: mainWindow,
movable: false,
maximizable: false,
minimizable: false,
resizable: false,
skipTaskbar: true,
transparent: true,
webPreferences: {
//session: mainWindow.webContents.session,
session: dsession,
sandbox: false,
},
})

window.on('blur', () => {
window.hide();
window.close();
});


window.on('close', () => {
window.hide();
window.close();
});

window.loadURL(details.url);

return window;

}
} else {
setTimeout(() => {
mainWindow.webContents.executeJavaScript('document.getElementsByTagName("browser-action-list")[0].shadowRoot.getElementById("nkbihfbeogaeaoehlefnkodbefgpgknn").click();');
}, 50);
}

}
});



extensions.on('browser-action-popup-created', (popup) => {
console.log(popup);
});

/*
protocol.registerFileProtocol('chrome-extension', (request, callback) => {
var filePath = request.url.replace(new URL(request.url).protocol, '');
const asdsad = filePath.replace('//', '');
const myArray = asdsad.split("/", 1);
const asdsaddd = asdsad.replace(myArray[0], '');
const plugs = dsession.getExtension(myArray[0]);
if(plugs){ callback(plugs?.path+'/'+asdsaddd) }
else {
callback(extensionsPath+'/'+myArray[0]+''+asdsaddd)
}
});
*/

protocol.registerFileProtocol('chrome-extension', (request, callback) => {
var filePath = request.url.replace(new URL(request.url).protocol, '');
const asdsad = filePath.replace('//', '');
const myArray = asdsad.split("/", 1);
const asdsaddd = asdsad.replace(myArray[0], '');
const plugs = dsession.getExtension(myArray[0]);
callback(plugs?.path+'/'+asdsaddd) 
});



//var parameters_newtab = app.commandLine.getSwitchValue("newtab");
//var parameters_incognitotab = app.commandLine.getSwitchValue("incognitotab");

var bgcolors;
if(process.argv[1] == '--incognitotab'){
bgcolors = '#202124';
} else{ bgcolors = '#FFFFFF'; }



mainWindow = new BrowserWindow({
title: APPNAME,
frame: false,
width: 1280,
height: 720,
minWidth: 412,
minHeight: 720,
//fullscreen: true,
//transparent: true,
backgroundColor: bgcolors,
show: false,
webPreferences: {
session: dsession,
sandbox: false,
plugins: true,
nodeIntegration: true,
contextIsolation: false,
enableRemoteModule: true,
worldSafeExecuteJavaScript: true,
//preload: path.join(__dirname, 'ExtensionsPreload.js')
},
icon: join(__dirname, '/systemui/css/images/icon.png'),
//transparent: true
});
require('@electron/remote/main').enable(mainWindow.webContents);

if (isDevMode) {
mainWindow.openDevTools({ mode: 'detach' });
}

mainWindow.loadFile('index.html');

mainWindow.extensions = extensions;

mainWindow.webContents.on('crashed', async (e) => {
console.log('crashed', e);
e.preventDefault();
shell.beep();
//shell.openExternal('https://github.com');
});

/*Pencere kapatıldığında yayınlanır.
//Emitted when the window is closed.*/
mainWindow.on('closed', async () => {
store.delete('--incognitotab'); 
store.set('vpn-proxy-opend', false);
mainWindow = null; 
});

mainWindow.on('close', async (event) => {
// Pencereyi kapatmayı engellemek için aşağıdaki satırı kullanabilirsiniz
event.preventDefault();
app.exit(); app.quit();
});


if(process.argv[1] == '--newtab'){
/*console.log(parameters_newtab);*/
}

if(process.argv[1] == '--incognitotab'){
app.commandLine.appendSwitch('incognito');
store.set('--incognitotab', '--incognitotab');
}


mainWindow.webContents.on('did-finish-load', function () {

if(process.argv[1] == '--incognitotab'){
mainWindow.webContents.send('--incognitotab');
}

//causing it to crash when running on the production version. meaningless mistake. so giving pass time is solution
setTimeout(() => {
loadExtensions(dsession,extensionsPath); 
}, 3000/2);


ipcMain.on('loadextaks', async (e, xwebContentsid, path) =>{
//Restarting is recommended for more efficient operation and safety reasons.
app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
app.exit(0);
});


ipcMain.on('addTabselectTab', async (e, type, xwebContentsid) =>{});
ipcMain.on('viewtabclick', async (e, type, xwebContentsid) =>{});


createUpdater();

setTimeout(() => {
mainWindow.show(); 
mainWindow.maximize();
}, 525);
});


}

async function createUpdater() {
const { autoUpdater } = require("electron-updater");

//Bir güncelleme bulunduğunda otomatik olarak indirilip indirilemeyeceği.
//Whether an update can be downloaded automatically when it is found.
autoUpdater.autoDownload = false;
//İndirilen bir güncellemenin uygulamadan çıkıldığında otomatik olarak yüklenip yüklenmeyeceği ( quitAndInstalldaha önce çağrılmadıysa).
//Whether a downloaded update will be installed automatically upon exiting the application (if quitAndInstall was not called before).
autoUpdater.autoInstallOnAppQuit = false;
//Otomatik alpha beta testleri al indir özelliği
//Get automatic alpha beta tests download feature
autoUpdater.allowPrerelease = false;

mainWindow.once('ready-to-show', () => {
//Sunucuya güncelleme olup olmadığını sorar. Bildirim göndermez
//It asks the server if there is an update. Does not send notification
autoUpdater.checkForUpdates();
//Sunucuya bir güncelleme olup olmadığını sorar, indirme ve güncelleme varsa masaüstü bildirir.
//It asks the server if an update is available, and the desktop reports if there is a download or update.
//autoUpdater.checkForUpdatesAndNotify();
});

//Güncellemeleri kontrol etmek
//Checking for updates
autoUpdater.on("checking-for-update", () => {
//Güncellemeler Kontrol Ediliyor !! Komutlar Buraya
//Checking for Updates !! Commands Here
});

//Güncelleme yok
//No updates available
autoUpdater.on("update-not-available", info => {
//Yeni Güncelleme Bulunamadı !! Komutlar Buraya
//No New Update Found !! Commands Here
});

//Yeni güncelleme mevcut
//New Update Available
autoUpdater.on("update-available", info => {
if(info){ store.set('stroe_au_releaseInfo', info); }
mainWindow.webContents.send('update_available'); 
});

//Durum Raporunu İndir
//Download Status Report
autoUpdater.on("download-progress", progressObj => {
//Yeni Güncelleme Şu anda indiriliyor !!
//New Update is currently downloading !!
});

//İndirme Tamamlandı Mesajı
//Download Completion Message
autoUpdater.on("update-downloaded", info => {
//Artık yeni bir sürüm mevcut. Yeni sürüm indirildi.
//A new version is now available. I downloaded a new version.
store.set('stroe_au_app_download', false);
store.set('stroe_update_downloaded', true);
});

//İndirilmiş Olan Güncellemeyi Yüklemesini Başlat
//Start the Downloaded Update Installation
ipcMain.on('au_app_install_reset', () => {
store.delete('stroe_au_releaseInfo');
store.delete('stroe_au_app_download');
store.delete('stroe_update_downloaded');
setTimeout(function(){ autoUpdater.quitAndInstall(); }, 250);
});

//Güncellemeyi İndirmeye Başlat
//Start Downloading Update
ipcMain.on('au_app_download', () => {
store.set('stroe_au_app_download', true);
autoUpdater.downloadUpdate();
});
}


app.on('login', (event, webContents, request, authInfo, callback) => {
event.preventDefault();
//if(authInfo.isProxy) { callback('username', 'password'); }
})

//Tüm pencereler kapatıldığında çıkın.
//Quit when all windows are closed.
app.on('window-all-closed', async () => {

// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
if (mainWindow) {
mainWindow.webContents.closeDevTools();
}
app.quit();
}
store.delete('--incognitotab');
store.set('vpn-proxy-opend', false);
});

//Uygulama Hatası, Kilitlendi
//Application Error, Crashed
app.on('renderer-process-crashed', async (e) => {
e.preventDefault();
shell.beep();
console.log('rp-crashed');
});

app.on('activate', async () => {
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (mainWindow === null) createWindow();
});

app.on('ready', () => {
// Do other early initialization...
//Otomatik Dil Ayarlar // Auto Lang Select
if (!store.get('settings.langs')) {
let lanlives = "en";
if(app.getLocale() == "tr" || app.getLocale() == "en"){ lanlives = app.getLocale(); }
if(isDevMode){lanlives = "en";}
store.set('settings.langs', lanlives);
}
store.set('tabslengthOnlys', 0);
store.set('loadEnableAdBlockings', false);
store.set('setDowloandLoads', false);
if(!store.get('appGetPath')){ store.set('appGetPath', app.getPath('downloads')); }
//app.on('login');

});



app.whenReady().then(async () => {
await components.whenReady();
console.log('components ready:', components.status());
createWindow();
});




/* eski
app.on('browser-window-created', (e, win) => {});

app.on('web-contents-created', (e,webContents) => {
webContents.on('new-window', async (e, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
console.log(disposition);
if(disposition == 'foreground-tab' || disposition == 'background-tab'){ e.preventDefault(); }
});

});
*/