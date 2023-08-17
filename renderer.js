//PACKAGES
const { 
BrowserWindow,
nativeTheme,
ipcMain,
app,
Menu,
session,
dialog } = require('@electron/remote');
let remote = require('@electron/remote');
//Depolama - STORAGE
const Store = require('electron-store');
window.store = new Store();


let xleftbarmenuSize = 0;
let xtopbarHeight = 0;
let xtopbarHeightLarge = 0;
let leftopagam = 0;

let opraidus = 0; let opraidusalt = 0;
if(store.get('settings.generalViews') == "BlockTheme2"){
opraidus = -8; opraidusalt = -6

if(!store.get('settings.leftbarmenu')){
opraidus = 0; opraidusalt = 0;
}
}

function rloadmodeview(){
xtopbarHeight = 80;
xtopbarHeightLarge = 120;
xleftbarmenuSize = 40;
store.set('settings.leftbarmenuSize', xleftbarmenuSize);

if (store.get('settings.generalViews') == "BlockTheme2") {
xtopbarHeight = 95;
xtopbarHeightLarge = 130;
xleftbarmenuSize = 58;
leftopagam = 7;
store.set('settings.leftbarmenuSize', xleftbarmenuSize);
}
}
rloadmodeview();
if (!store.get('settings.home')) {
store.set('settings.home', false);
}
if (!store.get('settings.search_engine')) {
store.set('settings.search_engine', 'You');
}
if (!store.get('settings.theme')) {
store.set('settings.theme', 'default');
}
if (!store.get('settings.newTab')) {
store.set('settings.newTab', { items: ['https://www.instagram.com', 'https://www.google.com', 'https://youtube.com', 'https://facebook.com', 'https://netflix.com', 'https://twitter.com', 'https://aliexpress.com', 'https://bing.com', 'https://amazon.com', '', '', ''] });
}

if (!store.get('settings.newTabWallpaper')) {
store.set('settings.newTabWallpaper', { name: 'Reborn5', username: 'Opera Software',html: 'https://addons.opera.com/tr/wallpapers/details/reborn5/',  backgroundTheme: 'assets://images/newtab/opera.jpg' });
//store.set('settings.newTabWallpaper', { name: 'Pawel Czerwinski', username: 'Unsplash',html: 'https://unsplash.com/photos/7FqOISWr5V0', backgroundTheme: 'https://images.unsplash.com/photo-1637611331620-51149c7ceb94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=90' });
}

if (!store.get('settings.ssCache')) {
store.set('settings.ss', true);
store.set('settings.ssCache', true);
}

if (!store.get('settings.headerView')) {
store.set('settings.headerView', 'compact');
}
if (!store.get('settings.starter')) {
store.set('settings.starter', '2');
}
if (!store.get('settings.topbarHeight')) {
store.set('settings.topbarHeight', xtopbarHeight);
}
if (!store.get('settings.dowloadnAltPencereCache')) {
store.set('settings.dowloadnAltPencere', true);
store.set('settings.dowloadnAltPencereCache', true);
}

if (!store.get('vpn-proxy-ip')) {
store.set('vpn-proxy-ip', '117.251.103.186:8080');
}
if (!store.get('vpn-proxy-data')) {
store.set('vpn-proxy-data', [
{ id: 1, name: 'India Hazratpur', co: 'India TEST', ip: '117.251.103.186', port:'8080', protocol:'HTTPS', connection: '117.251.103.186:8080', security:'no' },
{ id: 2, name: 'Mozambique Maxixe', co: 'Mozambique TEST', ip: '41.76.145.136', port:'8080', protocol:'HTTPS', connection: '41.76.145.136:8080', security:'no' },
//{ name: 'xx', co: 'xx', ip: 'xx', port:'xx', protocol:'HTTPS', connection: 'xx', security:'no' }
]);
}
//TEST PROXY - https://hidemy.name/en/proxy-list/?type=s#list

if (!store.get('extensions')) {
let data = {
alexsa: true, vpn: true
};
store.set('extensions', data);
}

if (!store.get('searchEngines')) {
store.set('searchEngines', [
{ name: 'Bing', url: 'https://www.bing.com/search?q=' },
{ name: 'Google', url: 'https://google.com/search?q=' },
{ name: 'Yandex', url: 'https://yandex.com/search/?text=' },
{ name: 'Yaani', url: 'https://yaani.com/#q=' },
{ name: 'DuckDuckGo', url: 'https://duckduckgo.com/?t=yaani&q=' },
{ name: 'Startpage', url: 'https://startpage.com/do/metasearch.pl?query=' },
{ name: 'You', url: 'https://you.com/search?q=' }
]);
}

if (!store.get('permissions')) store.set('permissions', {});
if (!store.get('flags')) store.set('flags', [
/*
'--do-not-track',
'--no-referrers',
*/
'--no-pings',
'--no-crash-upload',
'--no-default-browser-check',
'--disable-breakpad',
'--disable-plugins',
'--https-only',
'--enable-smooth-scrolling',
'--dns-prefetch-disable',
/*
'--ppapi-flash-path',
'--webrtc-internals',
'--webrtc-capture-multi-channel-audio-processing',
'--webrtc-remote-event-log',
'--webrtc-hybrid-agc',
'--media-session-webrtc',
'autoplay-policy',
'no-user-gesture-required',
'--global-media-controls-for-cast',
'--enable-media-internals',
'--load-media-router-component-extension',
'--media-router-cast-allow-all-ips',
'--cast-media-route-provider',
'--global-media-controls-cast-start-stop',
'--allow-all-sites-to-initiate-mirroring',
'allow-all-sites-to-initiate-mirroring',
'enable-usermedia-screen-capturing',
'enable-features', 
'WebRTCPipeWireCapturer',
'enable-gcm',
*/
]);


let thmname = store.get('settings.generalViews');

if(thmname == "BlockTheme2"){ 
setTimeout(() => {
document.body.classList.toggle("BlockTheme2");
//if(document.querySelector('link[href="systemui/css/opera.css"]')) document.querySelector('link[href="systemui/css/opera.css"]').remove();
//if(!document.querySelector('link[href="systemui/css/opera.css"]')) document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/opera.css">';
}, 10);
}

let windowxview = 0;
let windowxviewW = 0;
if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
//if(document.querySelector('link[href="systemui/css/leftbarmenu.css"]')) document.querySelector('link[href="systemui/css/leftbarmenu.css"]').remove();
//if(!document.querySelector('link[href="systemui/css/leftbarmenu.css"]')) document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/leftbarmenu.css">';
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('menusleftbar').style.display = 'flex';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = (store.get('settings.leftbarmenuSize'))+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('menusleftbar').style.display = 'block';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = (store.get('settings.leftbarmenuSize'))+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';   
}
} else {
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = '0px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = '12px';
document.getElementById('bookmarksAlls').style.paddingLeft = '12px';
document.getElementById('menusleftbar').style.display = 'none';
} else {
document.getElementById('newopclss').style.paddingLeft = '0px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = '0px';
document.getElementById('bookmarksAlls').style.paddingLeft = '0px';
document.getElementById('plugingoreas').style.paddingLeft = '0px';
document.getElementById('menusleftbar').style.display = 'none';
}
}

//Dil Bağlantısı
//Language Connection
var i18n = new(require('./translations/i18n-ex'));

let newtabBased; let oppayancar = "";

if(store.get('--incognitotab') == '--incognitotab'){
newtabBased = 'incognito-new-tab';
if(!document.querySelector('link[href="systemui/css/incognitotab.css"]')) document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/incognitotab.css">';
setTimeout(()=>{ store.delete('--incognitotab') }, 1200);
} else {

if(store.get('settings.newtabmode') == "block"){
newtabBased = 'new-tab';
if(thmname == "BlockTheme2"){ 
oppayancar = '-opera';
}
}

if(store.get('settings.newtabmode') == "bing"){
newtabBased = 'bing.com';
}

}

const {	ipcRenderer, shell } = require('electron');

const isDevMode = false;

const fs = require('fs');

require('electron').ipcMain = ipcMain;
require('v8-compile-cache');
const { join } = require('path');

let { fetch } = require('cross-fetch');

const path = require('path');
const os = require('os');

const tabs = require('./systemui/js/tabs.js');
const storage = require('./systemui/js/store.js');
const shortcuts = require('./systemui/js/shortcuts.js');
const web = require('./systemui/js/web.js');

window.search = require('./systemui/js/search.js');
window.tabs = tabs;

function searchBounds () {
let winBounds = remote.getCurrentWindow().getBounds();
let bounds = {};

let navCenter = document.getElementById('nav-center');

bounds.x = Math.ceil(navCenter.getBoundingClientRect().left + window.scrollX);
bounds.y = Math.ceil(navCenter.getBoundingClientRect().top + window.scrollY
+ parseFloat(getComputedStyle(navCenter, null).height.replace("px", ""))) + 5;
bounds.width = Math.floor(parseFloat(getComputedStyle(navCenter, null).width.replace("px", "")));
bounds.height = 240;

if(winBounds.x >= 0) bounds.x += winBounds.x;
if(winBounds.y >= 0) bounds.y += winBounds.y;

return bounds;
};

search.initialize(searchBounds());




web.init(document);
shortcuts.init(keyboardShortcut, n => { if (tabs.tabs[n-1]) tabs.activate(tabs.tabs[n-1]) });

console.colorLog = (msg, color) => { console.log('%c' + msg, 'color:' + color + ';font-weight:bold;') }

const { version } = require('./package.json');
const { param } = require('jquery');
const { send } = require('process');

exports.getTabCount = async () => tabs.tabs.length;
exports.getTabCountCacheNum = function () { store.set('tabslengthOnlys', tabs.tabs.length) }


exports.sidebarlefts = function () {
return store.get('settings.sidebar');
}

exports.setDataSideBar = function (item) {
createLeftMenuAres(item);
}


exports.showAlert = showAlert;

window.theme = 'light';

let alertWin, certDialog;

window.darkMode = nativeTheme.shouldUseDarkColors || false;

ipcMain.on('alert', async (e, data) =>
showAlert(data, r => {
e.returnValue = r;
})
);

let dfullscrennss; 
//fullscrenndoms();
ipcMain.on('fullscreenchange', async (e) =>{
dfullscrennss.show(); 
setTimeout(() => {
dfullscrennss.hide();
remote.getCurrentWindow().focus();
}, 450);
});

ipcMain.on('flags.js', async function(e, action, data) {
let flags = store.get('flags');

if (action == 'set') {
store.set('flags', data);
} else {
e.returnValue = flags;
}
});

ipcMain.on('getBookmarks', async e => { e.returnValue = (await storage.getBookmarks()) });
ipcMain.on('removeBookmark', async (e, id) => {
storage.removeBookmark(id);
console.log('b', id);
genelKitaplikDataPross();
});
ipcMain.on('clearBookmark', async () => storage.clearBookmark());

ipcMain.on('getHistory', async e => { e.returnValue = (await storage.getHistory()) });
ipcMain.on('clearHistory', async () => storage.clearHistory());
ipcMain.on('removeHistoryItem', async (e, id) => storage.removeHistoryItem(id));

/* şifre kaydetme işlemleri */
ipcMain.on('getSaveInfoXcont', async e => { e.returnValue = (await storage.getSaveInfoXcont()) });
ipcMain.on('clearSaveInfoXcont', async () => storage.clearSaveInfoXcont());
ipcMain.on('removeSaveInfoXcontItem', async (e, id) => storage.removeSaveInfoXcontItem(id));
ipcMain.on('logSaveInfoXcont', async (e, site, title, pass, loginurl) => {
storage.isgetSaveInfoXconted(site, title, pass).then(isgetSaveInfoXconted => {
if (isgetSaveInfoXconted) {} else { autoFills(site, title, pass, loginurl); }
});
}
);
ipcMain.on('logSaveInfoXcontSaves', async (e, site, title, pass, loginurl) => {
storage.isgetSaveInfoXconted(site, title, pass).then(isgetSaveInfoXconted => {
if (isgetSaveInfoXconted) {} else { storage.logSaveInfoXcont(site, title, pass, loginurl); }
});
}
);
/* şifre kaydetme işlemleri son */

/* sekme sabitleme işlemleri */
ipcMain.on('logtabsPins', async (e, site,id) => { 
if(newtabBased == 'incognito-new-tab'){
} else {
storage.isgettabsPins(id).then(isgettabsPins => {
if (isgettabsPins) { storage.removetabsPins(id); } else { storage.logtabsPins(site,id); }
});
}
}
);
ipcMain.on('gettabsPins', async e => { e.returnValue = (await storage.gettabsPins()) });
ipcMain.on('cleartabsPins', async () => storage.cleartabsPins());
ipcMain.on('removetabsPins', async (e, id) => storage.removetabsPins(id));
/* sekme sabitleme işlemleri son */

ipcMain.on('getDownloads', async e => { e.returnValue = (await storage.getDownloads()) });
ipcMain.on('clearDownloads', async () => storage.clearDownloads());
ipcMain.on('removeDownloads', async (e, id) => storage.removeDownloads(id));

ipcMain.on('getShellGo', async (e, url) => shell.openPath(url.replace(/\\/g, "/")));

ipcMain.on('cacheURLClicks', async (e, url, type) => { 
if(type == 'get'){
e.returnValue = store.get('cacheURLClicks');
}
if(type == 'set'){
store.set('cacheURLClicks', url);
setTimeout(() => {
store.set('cacheURLClicks', '');
}, 500);
}
});

ipcMain.on('newTab', async function(e, action, extra) {
if (action == 'focusSearchbar') {
let urlEl = document.getElementById('url');
urlEl.val = '';
urlEl.focus();
urlEl.select();
} else if (action == 'saveItem') {
let items = store.get('settings.newTab.items');
items[extra.id] = extra.domain;
store.set('settings.newTab.items', items);
} else if (action == 'loadItems') {
e.returnValue = store.get('settings.newTab.items');
} else if (action == 'getBackgroundTheme') {
e.returnValue = store.get('settings.newTab.backgroundTheme');
} else if (action == 'setBackgroundTheme') {
store.set('settings.newTab.backgroundTheme', extra);
}
});

ipcMain.on('newTabWallpaper', async function(e, action, items) {
if (action == 'getshow') {
e.returnValue = store.get('settings.newTabWallpaper');;
} 

if (action == 'saveItem') {
store.set('settings.newTabWallpaper', items);
}

});

/* bird */
ipcMain.on('addPocoLoginData', async function(e, action, items) {
if (action == 'getshow') {
e.returnValue = store.get('settings.addPocoLoginData');;
} 

if (action == 'saveItem') {
store.set('settings.addPocoLoginData', items);
}
});

ipcMain.on('logbird', async (e, roomid, roomname, roomavatar, roompassword, roomcreateusername, type) => { 
await storage.isgetbird(roomid).then(isgetbird => {
if (isgetbird) { } else { storage.logbird(roomid, roomname, roomavatar, roompassword, roomcreateusername, type); }
});
}
);
ipcMain.on('checklogbird', async (e, roomid) => {
e.returnValue = (await storage.gettbirdNoId(roomid)); 
});
ipcMain.on('getbird', async e => { e.returnValue = (await storage.getbird()) });
ipcMain.on('clearbird', async () => storage.clearbird());
ipcMain.on('removebird', async (e, id) => storage.removebird(id));


/* Sistem Ayarları Kaydet Ve Geri Dönüş İşlemleri */
ipcMain.on('store', async (e, purpose, name, value) => {
if (purpose == 'set') {
store.set(name, value);

/* left sidebar */
if(name == 'settings.leftbarmenu'){
leftbarmenu();
}

/* Anasayfa Button Göster Kapat */
if(name == 'settings.home'){
if(value){ document.getElementById("home").style.display = "flex"; } else { document.getElementById("home").style.display = "none"; }
}

/* Dil Güncelle */
if(name == 'settings.langs'){
setTimeout(async function() {}, 1000);
app.relaunch();
app.quit();
app.exit();
}

/* tab mode */
if(name == 'settings.newtabmode'){
if(store.get('settings.newtabmode') == "block"){
newtabBased = 'new-tab';
if(thmname == "BlockTheme2"){ 
oppayancar = '-opera';
}
}
if(store.get('settings.newtabmode') == "bing"){
newtabBased = 'bing.com';
}
}

/* Genel Tema Güncelle */
if(name == 'settings.generalViews'){
rloadmodeview();
store.set('settings.topbarHeight', xtopbarHeight);
store.set('settings.leftbarmenuSize', xleftbarmenuSize);
setTimeout(async function() {}, 1000);
app.relaunch();
app.quit();
app.exit();
}

/* Arama Motoru Güncelle */
if(name == 'settings.search_engine'){
setSearchEngine();
}

/* user agent Güncelle */
if(name == 'settings.user_agent'){
app.relaunch();
app.quit();
app.exit();
}

/* Eklenti Aktif Pasif */
var exmodules = name.split(".");
if(exmodules[0] == 'extensions'){
loadUzatilar();
if(value){ document.getElementById(exmodules[1]).style.display = "flex"; } else { document.getElementById(exmodules[1]).style.display = "none"; }
}

/* Kaydedilenleri Göster Kapat */
if(name == 'settings.bookmarkViews'){
//if(value){  } else { }
ipcRenderer.send('bookmarksonaktif');
}

} else {
e.returnValue = store.get(name);
}
});

/* Ayarlar Genel Eklentileri Aktif Et */
ipcMain.on('settingsViewStatusSet', async (e, action) => {
/* Anasayfa Button Göster */
if(action == 'home'){ 
if(store.get('settings.home')){
document.getElementById("home").style.display = "flex";
}
}
/* Anasayfa Button Göster Son */

/* Arama Önerileri Göster */
if(action == 'ss'){e.returnValue = store.get('settings.ss');}
/* Arama Önerileri Göster Son */
});

/* Bookmarks Kaydedilenleri Ekranda Göster */
ipcMain.on('bookmarksonaktif', async (e) => {
e.returnValue = 'true'; genelKitaplikEkle();
});
/* Kaydelilenler Url Git */
ipcMain.on('openLoadUrlGoBooks', async (e, url) => {
e.returnValue = 'true'; tabs.newView(url);
});

ipcMain.on('siteInfo', async (e, action) => {
switch (action) {
case 'Certificate':
let host = new URL(tabs.current().webContents.getURL()).host;

let https = require('https');
let options = {
host: host,
port: 443,
method: 'GET'
};

let req = https.request(options, res => {
let cert = res.connection.getPeerCertificate();
showCertificateDialog(cert);
});

req.on('error', () => {
showAlert({
type: 'alert',
message: i18n.__('Sitenin SSL sertifikası yok yada geçersiz bir SSL sertifikası kullanıyor.'),
url: 'BLOCK'
});
});

req.end();
break;
case 'site-info':
let host_1 = new URL(tabs.current().webContents.getURL()).host;

let https_1 = require('https');
let options_1 = {
host: host_1,
port: 443,
method: 'GET'
};

let req_1 = https_1.request(options_1, res_1 => {
let cert_1 = res_1.connection.getPeerCertificate();
toggleSiteInfo(cert_1);
});

req_1.on('error', () => {
if(!tabs.current().webContents.getURL().includes('block://')){toggleSiteInfo(false);}
});

req_1.end();
break;

case 'realseUpdateInfo':
var urlGetInfoRealse = store.get('stroe_au_releaseInfo');
tabs.newView('https://github.com/cetinmert/block/releases/tag/v'+urlGetInfoRealse.version);
break;

case 'adsBlockInfos':
tabs.newView('https://en.wikipedia.org/wiki/AdBlock');
break;

case 'certifikasInfos':
tabs.newView('https://en.wikipedia.org/wiki/HTTPS');
break;

case 'Cookies':
cookies()
.then(cookies => {
console.log(cookies);
})
.catch(console.error);
break;
case 'Site Settings':
break;
default:
}
});

ipcMain.on(
'getVersions',
async e => (e.returnValue = { ...process.versions, block: version, env: process.env })
);

ipcMain.on('getThemes', async e =>
require('fs').readdir(join(__dirname, 'systemui/css/themes'), (err, files) => {
let result = [];
for (let file of files) {
if (file.endsWith('.css')) {
let theme = file.replace('.css', '');
result.push(theme[0].toUpperCase() + theme.slice(1));
}
}
e.returnValue = result;
})
);

ipcMain.on('getTheme', async e => (e.returnValue = window.theme));
ipcMain.on('getDarkmode', async e => (e.returnValue = window.darkMode));

// Sayfa Kaynağını Görüntüle Ön Bellek Logları
ipcMain.on('viewSourceURL', async e => (e.returnValue = store.get('viewSourceURL'), store.delete('viewSourceURL')));
ipcMain.on('viewSourceMAINCode', async e => (e.returnValue = store.get('viewSourceMAINCode'), store.delete('viewSourceMAINCode')));

//Güncelleme Ön Bellek Logları
ipcMain.on('st_au_app_download', async e => (e.returnValue = store.get('stroe_au_app_download')));
ipcMain.on('st_update_downloaded', async e => (e.returnValue = store.get('stroe_update_downloaded')));
ipcMain.on('st_au_releaseInfo', async e => (e.returnValue = store.get('stroe_au_releaseInfo')));

//Ayarlar Tema, Üst Header Güncelleme
ipcMain.on('loadThemeNews', async e => (e.returnValue = 'true',loadTheme()));
ipcMain.on('loadHeaderViews', async e => (e.returnValue = 'true',loadHeaderViews()));

//Gerçerli Sekmedeki Url Çek
ipcMain.on('getCurrentURLTabss', async e => (e.returnValue = tabs.current().webContents.getURL()));

/* Tüm Yapıyı Yeniden Boyutlandır Verilen Üst Ölçüye Göre -> Çağır */
ipcMain.on('newTopBarOlcus', async (e) => {
e.returnValue = 'true'; windowPageAllResize();
});

ipcMain.on('dowloandsHEdef', async (e) => {
e.returnValue = store.get('appGetPath');
});

//vpn data
ipcMain.on('vpndata', async (e) => {
e.returnValue = store.get('vpn-proxy-data');
});

ipcMain.on('vpnproxyip', async e => (e.returnValue = store.get('vpn-proxy-ip')));

ipcMain.on('changevpn', async (e,value) => {
store.set('vpn-proxy-ip', value);
var proxyList = value;
tabs.current().webContents.session.setProxy({
proxyRules: proxyList,
pacScript: undefined,
proxyBypassRules: 'localhost'
}, () => {});
});

ipcMain.on('vpnproxyopendstatus', async e => (e.returnValue = store.get('vpn-proxy-opend')));

ipcMain.on('vpnproxyopend', async (e) => {
var vpnproxyopend = store.get('vpn-proxy-opend');
if(vpnproxyopend){
document.getElementById('vpnimagevpn').src = join(__dirname, 'static/extensions/vpn/BLOCK-VPN-Closed.png');
store.set('vpn-proxy-opend', false);
var proxyList = '';
tabs.current().webContents.session.setProxy({
proxyRules: proxyList,
pacScript: undefined,
proxyBypassRules: 'localhost'
}, () => {});
} else {
document.getElementById('vpnimagevpn').src = join(__dirname, 'static/extensions/vpn/BLOCK-VPN.png');
store.set('vpn-proxy-opend', true);
var proxyList = store.get('vpn-proxy-ip');
tabs.current().webContents.session.setProxy({
proxyRules: proxyList,
pacScript: undefined,
proxyBypassRules: 'localhost'
}, () => {});
}
});
//vpn-proxy-opend


ipcMain.on('savePermission', async (e, site, permission, allowed) => {
savePermission(site, permission, allowed);
tabs.current().webContents.reload();
});

//Kullanılan Dil Kodunu Al
ipcMain.on('langCodeCache', async (e) => {
e.returnValue = store.get('settings.langs');
});

//Dil Dosyalarını Bul Ve Döndür, Veri Kaydet
ipcMain.on('langAllPack', async (e) => {
e.returnValue = store.get('langAllPack');
});

async function langAllPackFunc(){
var arrayDataLangsox = [];
var transKlasorx = join(__dirname, 'translations/lang');
fs.readdir(transKlasorx, (err, files) => {
files.forEach(file => {
var langcodedisx = file.replace(".js", "");
arrayDataLangsox.push(langcodedisx);
});
store.set('langAllPack', arrayDataLangsox);
});
}
langAllPackFunc();



ipcMain.on('exappdate', async (e) => {
await pluginDatafind();
e.returnValue = await app.getPath('userData')+'/extensions';
});

//Eklenti Dosyalarını Çek
ipcMain.on('exiPackeLoadData', async (e) => {
await pluginDatafind();
e.returnValue = store.get('exiPackeLoadData');
});

//Eklenti Dosyalarını Bul Ve Döndür, Veri Kaydet
async function pluginDatafind(){
var arrayDataExis = [];
//var transKlasor = join(__dirname, 'static/extensions');
var transKlasor = app.getPath('userData')+'/extensions';
fs.readdir(transKlasor, (err, files) => {
files.forEach(file => { 

arrayDataExis.push(file);
/*
var transKlasors = app.getPath('userData')+'/extensions/'+file;
fs.readdir(transKlasors, (err, files) => {
files.forEach(file2 => {  
arrayDataExis.push(file+'/'+file2);
});

});*/
store.set('exiPackeLoadData', arrayDataExis);


});


});
}
pluginDatafind();

//Uygulamayı Sıfırla - Full Reset Clean
ipcMain.on('factoryReset', async (e) => {
e.returnValue = 'true'; 

session.defaultSession.flushStorageData();
session.defaultSession.clearCache();
session.defaultSession.clearStorageData();
session.defaultSession.cookies.flushStore();

store.clear();
storage.clearHistory();
storage.clearDownloads();
storage.clearBookmark();
storage.clearSaveInfoXcont();
storage.cleartabsPins();
storage.clearbird();
app.relaunch();
app.quit();
app.exit();
});

var serachmotorname;
getSearchEngine(async e => { 
if(e.name == 'Google'){
serachmotorname = i18n.__('google_txt_key'); 
} else {
serachmotorname = i18n.__('Ara')+` ${e.name} `+i18n.__('yada url dene'); 
}
});

//Arama moturu adı çek
ipcMain.on('getsearchenginenames', async (e) => {
e.returnValue = serachmotorname;
});


ipcMain.on('ckode40', async (e, bulsssinnerText) => {
document.getElementById('url').focus();
document.getElementById('url').value = '';
setTimeout(() => {
document.getElementById('url').value = bulsssinnerText;
}, 10);
});

ipcMain.on('ckode38', async (e, bulsssinnerText) => { 
document.getElementById('url').focus();
document.getElementById('url').value = '';
setTimeout(() => {
document.getElementById('url').value = bulsssinnerText;
}, 10);
});

async function keyboardShortcut(shortcut) {
switch (shortcut) {
case 'browserDevTools':
remote.getCurrentWindow().openDevTools({ mode: 'detach' });
break;
case 'devTools':
if(!tabs.current().webContents.getURL().includes('block://') && !isDevMode) tabs.current().webContents.openDevTools({ mode: 'right' });
if(isDevMode) tabs.current().webContents.openDevTools({ mode: 'right' });
break;
case 'nextTab':
tabs.nextTab();
break;
case 'backTab':
tabs.backTab();
break;
case 'newTab':
if(store.get('settings.newtabmode') == "block"){
tabs.newView("block://"+newtabBased);
}
if(store.get('settings.newtabmode') == "bing"){
tabs.newView("https://"+newtabBased);
}
break;
case 'newWindow':
document.getElementById('newWindowsOpens').click();
break;
case 'newWindowGizli':
document.getElementById('newIncognitoWindowsOpens').click();
break;
case 'closeTab':
tabs.close();
break;
case 'openClosedTab':
tabs.openClosedTab();
break;
case 'zoomIn':
tabs.current().webContents.zoomFactor += 0.1;
break;
case 'zoomOut':
tabs.current().webContents.zoomFactor -= 0.1;
break;
case 'resetZoom':
tabs.current().webContents.zoomFactor = 1;
break;
case 'focusSearchbar':
document.getElementById('url').focus();
document.getElementById('url').select();
break;
case 'backPage':
tabs.current().webContents.goBack();

if (tabs.current().webContents.canGoBack()) { document.getElementById('back').removeAttribute('disabled') }
else { document.getElementById('back').setAttribute('disabled', true) }
if (tabs.current().webContents.canGoForward()){ document.getElementById('forward').removeAttribute('disabled') }
else{ document.getElementById('forward').setAttribute('disabled', true) }
break;
case 'forwardPage':
tabs.current().webContents.goForward();

if (tabs.current().webContents.canGoBack()) { document.getElementById('back').removeAttribute('disabled') }
else { document.getElementById('back').setAttribute('disabled', true) }
if (tabs.current().webContents.canGoForward()) { document.getElementById('forward').removeAttribute('disabled') }
else{ document.getElementById('forward').setAttribute('disabled', true) }
break;
case 'savePage':
tabs.savePage(tabs.current().webContents);
break;
case 'refreshPage':
tabs.current().webContents.reload();
break;
case 'forceReload':
tabs.current().webContents.reloadIgnoringCache();
break;
case 'restart':
app.relaunch();
app.exit(0);
break;
case 'scrollToTop':
tabs
.current()
.webContents.executeJavaScript(
`window.scrollTo({ top: 0, behavior: 'smooth' })`
);
case 'openHistory': tabs.newView('block://history'); break;
case 'openBookmarks': tabs.newView('block://bookmarks'); break;
case 'openSettings': tabs.newView('block://settings'); break;
default:
break;
}
}

//ipcMain.on('loadPage', async (e, a) => loadPage(a));
ipcMain.on('loadPage', async (e,a) => (e.returnValue = 'true', loadPage(a)));

ipcMain.on('openPage', async (e, a) => tabs.newView(a));
ipcMain.on('openPageNews', async (e,a) => (e.returnValue = 'true', tabs.newView(a)));

ipcMain.on('loadTheme', async () => loadTheme());

ipcMain.on('viewAdded', async () => {
pageZoomInOutALL();
tabs
.current()
.webContents.session.setPermissionRequestHandler(handlePermission);
});

/* Yeni Menü İşlemleri */
ipcMain.on('newWinOpenTabs', async (e, a) => keyboardShortcut('newTab'));
ipcMain.on('newWinOpenSettings', async (e, a) => tabs.newView('block://settings'));
ipcMain.on('newWinOpenHistory', async (e, a) => tabs.newView('block://history'));
ipcMain.on('newWinOpenBookMarks', async (e, a) => tabs.newView('block://bookmarks'));
ipcMain.on('newWinOpenDowloand', async (e, a) => tabs.newView('block://downloads'));
ipcMain.on('newWinOpenHakkinda', async (e, a) => tabs.newView('block://version'));
ipcMain.on('newWinOpenExits', async (e, a) => app.exit());

//Auto Fill
async function autoFills(site, title, pass, loginurl) {
var autofillss = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
width: 320,
height: 330,
x: Math.ceil(document.getElementById('bookmark').getBoundingClientRect().left + window.screenX)-280,
y: Math.ceil(document.getElementById('bookmark').getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(document.getElementById('bookmark'), null).height.replace("px", ""))),
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

var autodatafill = [{ xsite: site, xtitle: title, xpass: pass, xloginurl: loginurl }];
let paramsx = encodeURIComponent(JSON.stringify(autodatafill));
autofillss.loadURL(
require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/autofill.html'),
protocol: 'file:',
slashes: true
}) +
'?' +
paramsx
);

autofillss.on('blur', () => {
if(autofillss) autofillss.close();
autofillss = null;
remote.getCurrentWindow().focus();
remote.getCurrentWindow().focus();
});

autofillss.on('close', () => {
autofillss = null;
remote.getCurrentWindow().focus();
remote.getCurrentWindow().focus();
});

}

// THEMES
async function loadTheme() {
if(newtabBased == 'incognito-new-tab'){

} else {

let themeObj = store.get('settings.theme');
if(themeObj){ themeObj = themeObj.toLowerCase(); }

if (document.querySelector('head link[href*="systemui/css/themes"]')) document.querySelector('head link[href*="systemui/css/themes"]').remove();
document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/themes/'+themeObj+'.css">';
document.getElementsByTagName("html")[0].className = themeObj;
window.theme = themeObj;

if (themeObj == 'default') {
if(thmname == "BlockTheme2"){ 
if (document.querySelector('head link[href*="systemui/css/themes"]')) document.querySelector('head link[href*="systemui/css/themes"]').remove();
document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/themes/'+themeObj+'-opera.css">';
document.getElementsByTagName("html")[0].className = themeObj+'-opera';
}
}
if (themeObj == 'black') {}

}
}
loadTheme();

// Ust Header Tasarım
async function loadHeaderViews() {
let HeaderObj = store.get('settings.headerView');
if(HeaderObj){ HeaderObj = HeaderObj.toLowerCase(); }
if(HeaderObj == 'compact'){
//if(!document.querySelector('link[href="systemui/css/newbars.css"]')) document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/newbars.css">';
}
if(HeaderObj == 'default'){
//if(document.querySelector('link[href="systemui/css/newbars.css"]')) document.querySelector('link[href="systemui/css/newbars.css"]').remove();
}
let ckfgt = document.body.classList.contains("compact") ? "compact" : "default";
if(HeaderObj != ckfgt){
document.body.classList.toggle("compact");
}


}
loadHeaderViews();

// ALERTS
async function initAlert() {
let screenSize = { width: window.outerWidth, height: window.outerHeight };
let args = {
frame: false,
resizable: false,
skipTaskbar: true,
x: screenSize.width / 2 - 450 / 2,
y: 50,
width: 450,
height: 150,
modal: true,
show: true,
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
},
parent: remote.getCurrentWindow(),
//icon: join(__dirname, 'systemui/images/block.png')
};

alertWin = new BrowserWindow(args);

let address = require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/alert.html'),
protocol: 'file:',
slashes: true
});

alertWin.loadURL(address);

ipcMain.once('getCurrentWindowHidesalert', (e) => {
alertWin.hide();
});

// alertWin.openDevTools({ mode: 'detach' });
alertWin.on('page-title-updated', async () => {
alertWin.show();
});
}

 
async function fullscrenndoms() {
let screenSize = { width: window.outerWidth, height: window.outerHeight };
let argsx = {
frame: false,
resizable: false,
skipTaskbar: true,
transparent: true,
x: screenSize.width / 2 - 300 / 2,
y: 50,
width: 300,
height: 51,
show: false,
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
},
parent: remote.getCurrentWindow(),
//icon: join(__dirname, 'systemui/images/block.png')
};

dfullscrennss = new BrowserWindow(argsx);

let address = require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/modal/fullscreenchange.html'),
protocol: 'file:',
slashes: true
});

dfullscrennss.on('blur', () => {
//dfullscrennss.close();
dfullscrennss.hide();
//siteInfo = null;
});

dfullscrennss.on('close', () => {
//dfullscrennss = null;
dfullscrennss.hide();
});

dfullscrennss.loadURL(address);
//dfullscrennss.show();  
}

async function showAlert(data, callback) {


await initAlert();

setTimeout(() => { let params = { ...data, bg: window.theme };
alertWin.webContents.send('load', params);
//alertWin.show();

    
switch (data.type) {
case 'prompt':
alertWin.setBounds({ height: 200 });
ipcMain.once('alert-reply', (e, r) => {
callback(r);
alertWin.setBounds({ height: 130 });
//xxxxxxxxxxxxx
});
break;
case 'confirm':
ipcMain.once('alert-reply', (e, r) => {
callback(r);
});
break;
default:
break;
}

alertWin.focus();
alerted = false;
}, 350);
}

// SEARCHING
async function getSearchEngine(cb) {
let searchEngine = store.get('settings.search_engine');
let engines = store.get('searchEngines');
for (let engine of engines) {
if (engine.name == searchEngine) cb(engine);
}
}

async function loadPage(val) {


if(tabs.current().webContents.getURL().startsWith('block:') || tabs.current().webContents.getURL().startsWith('file:')){
loadpagev2s(val);
} else {


document.getElementById('url').blur();
try {
new URL(val);

if(val == 'block://new-tab'){

if(store.get('settings.newtabmode') == "block"){
tabs.current().webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/'+newtabBased+oppayancar+'.html'),
protocol: 'file:',
slashes: true
}));
}

if(store.get('settings.newtabmode') == "bing"){
tabs.current().webContents.loadURL("https://bing.com");
}

} else {
if(val == 'block://bird'){
tabs.current().webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/bird.html'),
protocol: 'file:',
slashes: true
}));
} else {
tabs.current().webContents.loadURL(val);
store.set('cacheURLClicks', val);
}
}


} catch (e) {
if (val.includes('.') && !val.includes(' ')) {
if(newtabBased == 'incognito-new-tab'){} else{
document.getElementById('url').value = val;
}
tabs.current().webContents.loadURL('https://' + val);
store.set('cacheURLClicks', 'https://' + val);
} else if (
val.includes('://') ||
val.startsWith('data:') ||
(val.startsWith('localhost:') && !val.includes(' '))
) {
if(newtabBased == 'incognito-new-tab'){} else{
document.getElementById('url').value = val;
}

tabs.current().webContents.loadURL(val);
store.set('cacheURLClicks', val);

} else {
getSearchEngine(async function(engine) {
if(newtabBased == 'incognito-new-tab'){} else{
document.getElementById('url').value = engine.url + val;
}
tabs.current().webContents.loadURL(engine.url + val);
store.set('cacheURLClicks', engine.url + val);
});
}
}


setTimeout(() => {store.set('cacheURLClicks', '');}, 500);
}
}



// SNACKBAR
async function showSnackbar(
text = '',
items = [],
buttons = [],
callback = console.log
) {
let snackbar = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
width: 320,
height: 130,
x: 228,
y: 81,
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

snackbar.webContents.once('dom-ready', async () => {
snackbar.webContents.send('permission-request', text, items, buttons);

ipcMain.once('permission-reply', (event, reply) => {
snackbar.close();
callback(reply);

remote.getCurrentWindow().focus();
remote.getCurrentWindow().focus();
});
});

snackbar.loadURL(
require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/snackbar.html'),
protocol: 'file:',
slashes: true
})
);
}

async function loadFlags() {
let flags = store.get('flags');
for (let flag of flags) {
//console.log(`Added flag: ${flag}`);
app.commandLine.appendSwitch(flag);
}
}

// SITE INFO & DIALOGS
let siteInfo;
async function toggleSiteInfo(certificate) {
if (!siteInfo) {
siteInfo = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
width: 320,
height: 330,
x: Math.ceil(document.getElementById('site-info').getBoundingClientRect().left + window.screenX),
y: Math.ceil(document.getElementById('site-info').getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(document.getElementById('site-info'), null).height.replace("px", ""))),
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

let params = encodeURIComponent(JSON.stringify(certificate));
siteInfo.loadURL(
require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/info.html'),
protocol: 'file:',
slashes: true
}) +
'?' +
params
);

siteInfo.on('blur', () => {
if(siteInfo) siteInfo.close();
siteInfo = null;
remote.getCurrentWindow().focus();
remote.getCurrentWindow().focus();
});

siteInfo.on('close', () => {
siteInfo = null;
remote.getCurrentWindow().focus();
remote.getCurrentWindow().focus();
});

let url = new URL(tabs.current().webContents.getURL());
let urlnews = new URL(tabs.current().webContents.getURL()).hostname;

let perms = store.get('permissions')[url.hostname];

siteInfo.webContents.once('dom-ready', async () => {
cookies()
.then(c => {
siteInfo.webContents.send('cookies', c.length);
})
.catch(console.error);

if (!perms) return;

for (let [item, val] of Object.entries(perms)) {
let allowed = val ? i18n.__('İzin Ver') : i18n.__('Engelle');
var chechkss = '';
if(val){ chechkss = "checked"; } else { chechkss = ''; }

var lnagcc = i18n.__(item);

siteInfo.webContents.send(
'perm',
`
<li id="info-perm">
<img src="../../../systemui/images/${item}.svg" id="perm-icon">
<p id="perm-text">${lnagcc}</p>
<input ${chechkss} id="${item}"  onclick="editPermission('${urlnews}', '${item}', '${val}')" type="checkbox" class="switch item-control permisonchecks">
</li>
`
);
}
});
}

}

async function savePermission(site, permission, allowed) {
let perms = store.get('permissions');
if (!perms[site]) {
perms[site] = {};
}
perms[site][permission] = allowed;

store.set('permissions', perms);
}

async function cookies(contents, site) {
contents = contents || tabs.current().webContents;
site = site || contents.getURL();
return contents.session.cookies.get({ url: site });
}

async function handlePermission(webContents, permission, callback, details) {
if (details.mediaTypes) {
}
if (permission == 'geolocation') permission = 'location';
if (permission == 'midiSysex') permission = 'midi';

let allowedPerms = ['fullscreen', 'pointerLock'];
if (!allowedPerms.includes(permission)) {
let url = new URL(webContents.getURL())?.hostname;

let perms = store.get('permissions');

let checked;
try {
checked = perms[url][permission];
} catch (e) {
checked = undefined;
}

if (checked == undefined || checked == null) {
showSnackbar(
`${url} ${i18n.__('şunu yapmak istiyor:')}`,
[i18n.__(permission)],
[i18n.__('İzin Ver'), i18n.__('Engelle')],
function(response) {
if (response === i18n.__('İzin Ver')) {
callback(true);
savePermission(url, permission, true);
} else {
callback(false);
savePermission(url, permission, false);
}
}
);
} else {
callback(checked);
}
} else {
callback(true);
}
}

async function initCertDialog() {
let bg = window.theme == 'dark' ? '#292A2D' : '#FFFFFF';
certDialog = new BrowserWindow({
frame: false,
resizable: false,
backgroundColor: bg,
width: 490,
height: 600,
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
},
show: false,
parent: remote.getCurrentWindow(),
//icon: join(__dirname, 'systemui/images/block.png')
});

certDialog.on('page-title-updated', async () => {
certDialog.show();
});
}

async function showCertificateDialog(certificate) {
certificate.bg = window.theme == 'dark' ? '#292A2D' : '#FFFFFF';
let params = encodeURIComponent(JSON.stringify(certificate));
let { format } = require('url');
certDialog.loadURL(
format({
pathname: join(__dirname, 'layout/pages/dialogs/certificate.html'),
protocol: 'file:',
slashes: true
}) +
'?' +
params
);
}

// HTML ELEMENTS
document.getElementById('home').addEventListener('click', async () => {

if(newtabBased == 'incognito-new-tab'){
tabs.current().webContents.loadURL('block://'+newtabBased);
store.set('cacheURLClicks', 'block://'+newtabBased);
setTimeout(() => {store.set('cacheURLClicks', '');}, 500);
} else {
if(store.get('settings.newtabmode') == "block"){
//tabs.current().webContents.loadURL(join(__dirname, 'static', 'pages', 'new-tab.html'));
tabs.current().webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/'+newtabBased+oppayancar+'.html'),
protocol: 'file:',
slashes: true
}));
store.set('cacheURLClicks', 'block://new-tab');
setTimeout(() => {store.set('cacheURLClicks', '');}, 500);
}
if(store.get('settings.newtabmode') == "bing"){
tabs.current().webContents.loadURL("https://bing.com");
store.set('cacheURLClicks', 'https://bing.com');
setTimeout(() => {store.set('cacheURLClicks', '');}, 500);
}
}

document.getElementById('url').value = '';
//document.getElementById('NewTab').click();
}

);

document.getElementById('back').addEventListener('click', async () => keyboardShortcut('backPage'));
document.getElementById('forward').addEventListener('click', async () => keyboardShortcut('forwardPage'));
document.getElementById('refresh').addEventListener('mousedown', async e => {
switch (e.which) {
case 1:    
if (document.getElementById('refresh').innerHTML == '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>') {
tabs.current().webContents.stop();
} else {
tabs.current().webContents.reload();
}
break;
case 2:
let url = tabs.current().webContents.getURL();
tabs.newView(url);
break;
}
return true; // to allow the browser to know that we handled it.
});


let cachesss;
ipcMain.on('gosytemopens', async (e, url) => { 
if(!cachesss){cachesss = tabs.current();}
setTimeout(() => { tabs.close(cachesss); cachesss = null; }, 90);
tabs.newView(url);
});


ipcMain.on('openUIsystemPageV2', async (e, val) => { 
loadpagev2s(val);
});


function loadpagev2s(val){
document.getElementById('url').blur();
try {
new URL(val);
if(!cachesss){cachesss = tabs.current();}
setTimeout(() => { tabs.close(cachesss); cachesss = null; }, 90);
tabs.newView(val);
} catch (e) {
if (val.includes('.') && !val.includes(' ')) {
if(!cachesss){cachesss = tabs.current();}
setTimeout(() => { tabs.close(cachesss); cachesss = null; }, 90);
tabs.newView('https://'+val);
} else if (
val.includes('://') ||
val.startsWith('data:') ||
(val.startsWith('localhost:') && !val.includes(' '))
) {
if(!cachesss){cachesss = tabs.current();}
setTimeout(() => { tabs.close(cachesss); cachesss = null; }, 90);
tabs.newView(val);
} else {
getSearchEngine(async function(engine) {
if(!cachesss){cachesss = tabs.current();}
setTimeout(() => { tabs.close(cachesss); cachesss = null; }, 90);
tabs.newView(engine.url + val);
});
}
}
}


var sidebartabs = [];

ipcMain.on('createleftmenuopen', async (e, item) => { document.getElementById(item.name).click(); /*createLeftMenuAres(item)*/ });

ipcMain.on('createLeftMenuAresOpenClosed', async (e, name,type,xwidht, xurl) => {
createLeftMenuAresOpenClosed(name,type,xwidht,xurl);
});

async function createLeftMenuAresOpenClosed(name,type,xwidht, xurl) {
let keyid = name.replace(/\s/g, '');

let cache_viewsx;

for (item of sidebartabs) {
if(item.id == keyid){
cache_viewsx = item.viewsx;
cache_viewsxTopbar = item.viewsxTopbar;
}
}

if(cache_viewsx){
var btnbulsc = document.getElementById(keyid);

if(type == 'open'){
cache_viewsxTopbar.show();
cache_viewsx.show();
cache_viewsx.focus();
btnbulsc.classList.add('activebtns');
}

if(type == 'close'){
cache_viewsxTopbar.hide();
cache_viewsx.hide();
btnbulsc.classList.remove('activebtns');
store.set('settings.leftbarmenuSize', xleftbarmenuSize);
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}
windowPageAllResize();
}

if(type == 'reload'){
//cache_viewsx.webContents.reload();
cache_viewsx.webContents.loadURL(xurl);
}

if(type == 'pin'){
btnbulsc.classList.add('pinned');
store.set('settings.leftbarmenuSize', xleftbarmenuSize+xwidht);
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

windowPageAllResize();
}
if(type == 'unpin'){
btnbulsc.classList.remove('pinned');
store.set('settings.leftbarmenuSize', xleftbarmenuSize);
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

windowPageAllResize();
}

}
}



async function createLeftMenuAres(item) {
let name = item.name;
let url = item.url;
let xwidht = item.widht;
let keyid = item.name.replace(/\s/g, '');

let cache_viewsx;
let cache_viewsxTopbar;


for (item of sidebartabs) {
if(item.id == keyid){
cache_viewsx = item.viewsx;
cache_viewsxTopbar = item.viewsxTopbar;
} else {
item.viewsx.hide();
item.viewsxTopbar?.hide();
var btnbulsc = document.getElementById(item.id);
if(btnbulsc.classList.contains('activebtns')){
btnbulsc.classList.remove('activebtns');
}

if(btnbulsc.classList.contains('pinned')){
store.set('settings.leftbarmenuSize', xleftbarmenuSize)
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

windowPageAllResize();
}

}
}

store.set('cache_viewsx_keyid', keyid);

var btnbuls = document.getElementById(keyid);


if(!cache_viewsx){

var oSessionsXGT;
if(store.get('--incognitotab') == '--incognitotab'){
let cids = v1();
oSessionsXGT = 'persist:'+cids+cids;
} else { oSessionsXGT=''; }

let viewsx;
if(url.startsWith('block:')){
let windowxviewW = -store.get('settings.leftbarmenuSize');
let topbarHeight = store.get('settings.topbarHeight');

viewsx = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
titleBarStyle: 'customButtonsOnHover',
minimizable: false,
maximizable: false,
backgroundColor: '#FFFFFF',
closable: false,
//width: xwidht,
width:window.outerWidth+windowxviewW-leftopagam,
height: window.outerHeight-topbarHeight-leftopagam-leftopagam,
x:Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+topbarHeight+leftopagam,
useContentSize: true,
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true,
contextIsolation: false,
preload: join(__dirname, 'systemui/js/preload.js')
}
});
/*
viewsx.webContents.session.protocol.registerFileProtocol('block', (req, cb) => {
var url = new URL(req.url); 

if(url.pathname == '//network-error') {
cb(join(__dirname, 'layout/pages/', `network-error.html`));
} else {

if(url.pathname == '//incognito-new-tab') {

if(newtabBased == 'incognito-new-tab'){ 
if(url.pathname == '//new-tab') {
cb(join(__dirname, 'layout/pages/', `incognito-new-tab.html`));
} else {
url = req.url.replace(url.protocol, '');
cb(join(__dirname, 'layout/pages/', `${ url }.html`));
}

} else {
cb(join(__dirname, 'layout/pages/', `new-tab.html`));
}

} else {        
url = req.url.replace(url.protocol, '');
cb(join(__dirname, 'layout/pages/', `${ url }.html`));
}

}

}, () => {});*/
} else {

viewsx = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
titleBarStyle: 'customButtonsOnHover',
minimizable: false,
maximizable: false,
backgroundColor: '#FFFFFF',
closable: false,
width: xwidht-leftopagam,
height: window.outerHeight-25-leftopagam-leftopagam,
x:Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+25+leftopagam,
useContentSize: true,
parent: remote.getCurrentWindow(),
webPreferences: {
partition: oSessionsXGT,
preload: join(__dirname, 'systemui/js/preload.js')
}
});
}

/*
viewsx.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
e.preventDefault();
if(disposition){
if(disposition == 'foreground-tab' || disposition == 'background-tab'){
this.newView(url);
//options.webContents.destroy();
} else {
if(disposition == 'new-window'){
}
}
}
});*/

viewsx.webContents.setWindowOpenHandler((details) => {
if (details.disposition === 'new-window') { } 
else if (details.disposition === 'foreground-tab') {
tabs.newView(details.url);
} else if (details.disposition === 'background-tab') {
tabs.newView(details.url);
}
return { action: 'deny' }
});

viewsx.webContents.on('will-prevent-unload', async (e) => { 
//e.preventDefault();
var cacheurlsxx = store.get('cacheURLClicks');
const choice = dialog.showMessageBoxSync(win, {
type: 'question',
buttons: [i18n.__('Leave'), i18n.__('Stay')],   
title: i18n.__('Do you want to leave this site?'),
message: i18n.__('Changes you made may not be saved.'),
defaultId: 0,
cancelId: 1
})
const leave = (choice === 0)
if (leave) {
e.preventDefault();

setTimeout(() => {
viewsx.webContents.forcefullyCrashRenderer();

setTimeout(() => {
if(cacheurlsxx){
viewsx.webContents.loadURL(cacheurlsxx);
} else {
viewsx.webContents.reload();
}
}, 120);
}, 50);

} else {
}
});

let viewsxTopbar;
if(url.startsWith('block:')){ viewsxTopbar; }
else {
viewsxTopbar = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
titleBarStyle: 'customButtonsOnHover',
minimizable: false,
maximizable: false,
closable: false,
//backgroundColor: '#FFFFFF',
width: xwidht-leftopagam,
height: 25,
x:Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+leftopagam,
//alwaysOnTop: true,
useContentSize: true,
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false,
executeJavaScript: true,
}
});
var autogetdates = [{ xname: name, xurl: url, xwidht: xwidht, xkeyid: keyid }];
let paramsxx = encodeURIComponent(JSON.stringify(autogetdates));
viewsxTopbar.loadURL(
require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/sidebartopbar.html'),
protocol: 'file:',
slashes: true
}) +
'?' +
paramsxx
);
}


//viewsx.webContents.session.setPreloads([join(__dirname, 'systemui/js/preload-get-display-media-polyfill.js')]);
//viewsx.webContents.session.setPreloads([join(__dirname, 'systemui/js/preload-get-sidebar.js')]);

//viewsxTopbar.openDevTools({ mode: 'detach' });
//viewsx.openDevTools({ mode: 'detach' });
viewsx.focus();

viewsx.webContents.once('dom-ready', async () => {});

viewsx.on('blur', () => {
//viewsx.hide(); viewsxTopbar.hide(); 
//remote.getCurrentWindow().focus();
});


viewsx.on('close', () => {
viewsx = null; viewsxTopbar = null;
remote.getCurrentWindow().focus();
});


if(!btnbuls.classList.contains('activebtns')){
btnbuls.classList.add('activebtns');
} else {
btnbuls.classList.remove('activebtns');
}


if(url == 'block://'+newtabBased){
viewsx.webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/'+newtabBased+oppayancar+'.html'),
protocol: 'file:',
slashes: true
}));
} else {
if(url == 'block://bird'){
viewsx.webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/bird.html'),
protocol: 'file:',
slashes: true
}));
} else {    
if(url == 'block://settings'){
viewsx.webContents.loadURL(require('url').format({
pathname: join(__dirname, 'layout/pages/ayarlar.html'),
protocol: 'file:',
slashes: true
}));
} else {    
viewsx.webContents.loadURL(url);
}
}
}
//viewsx.loadURL(url);

viewsx.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
if(details.url){
if(new URL(details.url).hostname == 'web.whatsapp.com'){
details.requestHeaders['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0";
}
}
if(store.get('flags').includes('--do-not-track')) details.requestHeaders['DNT'] = '1'; // Enable DNT for 'do-not-track' flag
callback({ requestHeaders: details.requestHeaders });
});


let dsadsa = {'id':keyid, viewsx, viewsxTopbar}
sidebartabs.push(dsadsa);

} else {

if(!btnbuls.classList.contains('activebtns')){
btnbuls.classList.add('activebtns');
cache_viewsx.show();
cache_viewsxTopbar?.show();
cache_viewsx.focus();

setTimeout(() => {
if(cache_viewsx){

let windowxviewW = -store.get('settings.leftbarmenuSize'); 
let topbarHeight = store.get('settings.topbarHeight');

if(cache_viewsx.webContents.getURL().startsWith('file:')){
cache_viewsx.setBounds({
width:window.outerWidth+windowxviewW-leftopagam,
height: window.outerHeight-topbarHeight-leftopagam-leftopagam,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+topbarHeight+leftopagam,
});
} else {
cache_viewsx.setBounds({
width: xwidht-leftopagam,
height: window.outerHeight-25-leftopagam-leftopagam,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+25+leftopagam,
});

cache_viewsxTopbar?.setBounds({
width: xwidht-leftopagam,
height: 25,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+leftopagam,
});
}


}
}, 0);

if(btnbuls.classList.contains('pinned')){
store.set('settings.leftbarmenuSize', xleftbarmenuSize+xwidht);
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

windowPageAllResize();
}

} 
else {
btnbuls.classList.remove('activebtns');
cache_viewsx.hide();
cache_viewsxTopbar?.hide();


if(btnbuls.classList.contains('pinned')){
//btnbulsc.classList.remove('pinned');
store.set('settings.leftbarmenuSize', xleftbarmenuSize)
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

windowPageAllResize();
}

}


}

}










// Menü Buton - Menü Yeni
document.getElementById('menu').addEventListener('click', async e => {
createWindowMenuTs();
});

async function createWindowMenuTs() {
let mainWindowMenus = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
titleBarStyle: 'customButtonsOnHover',
minimizable: false,
maximizable: false,
closable: false,
//skipTaskbar: true,
width: 290,
height: 450,
x: Math.ceil(document.getElementById('menu').getBoundingClientRect().left + window.screenX) - 238,
y: Math.ceil(document.getElementById('menu').getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(document.getElementById('menu'), null).height.replace("px", ""))) - 9,
//alwaysOnTop: true,
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true,
worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

let create_loadModal = require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/modal/menu.html'),
protocol: 'file:',
slashes: true
});

mainWindowMenus.focus();

mainWindowMenus.webContents.once('dom-ready', async () => {
});

mainWindowMenus.setClosable(true);

mainWindowMenus.on('blur', async () => {
mainWindowMenus.close();
});

mainWindowMenus.loadURL(create_loadModal);
}

document.getElementById('url').addEventListener('keypress', async e => {
if (e.which == 13 || e.which == 10) {
if (e.ctrlKey) {
document.getElementById('url').value = 'www.' + document.getElementById('url').value;
document.getElementById('url').value = document.getElementById('url').value + '.org';
} else if (e.shiftKey) {
document.getElementById('url').value = 'www.' + document.getElementById('url').value;
document.getElementById('url').value = document.getElementById('url').value + '.net';
} else {
loadPage(document.getElementById('url').value);
document.getElementById('url').blur();
}
}
});


document.getElementById('url').addEventListener('focus', async e => {
e.preventDefault();
document.getElementById('nav-center').style.border = 'var(--accent) 2px solid';

if(tabs.current()){
if(tabs.current().webContents.getURL().includes('block://') || tabs.current().webContents.getURL().includes('file://')){
} else {
if(tabs.current().webContents.getURL()){
let dmans = new URL(tabs.current().webContents.getURL()); 
if (dmans.hostname == 'bing.com' || dmans.hostname == 'www.bing.com') {} else{
document.getElementById('url').value = tabs.current().webContents.getURL();
}
}
}
}

/*
if(newtabBased == 'incognito-new-tab' || newtabBased == 'new-tab'){} else{
document.getElementById('url').value = tabs.current().webContents.getURL();
}
*/
/*
document.getElementById('url').placeholder = '';
setTimeout(function(){  
document.getElementById('url').focus();
document.getElementById('url').select();
}, 120);
*/
});


document.getElementById('url').addEventListener('click', async e => {
e.preventDefault();
document.getElementById('url').select();
document.getElementById('url').focus(); 
/*
document.getElementById('url').placeholder = '';
setTimeout(function(){  
document.getElementById('url').focus();
document.getElementById('url').select();
}, 120);
*/
});



document.getElementById('url').addEventListener('input', async e => {
search.show(document.getElementById('url').value, searchBounds());
});



document.getElementById('url').addEventListener('blur', async () => {
document.getElementById('nav-center').removeAttribute('style');

document.getElementById('url').setSelectionRange(0,0);
document.getElementById('url').placeholder = document.getElementById('url').getAttribute('data-placeholder');
setTimeout(function() {
search.hide();
if(tabs.current()){ web.setSearchIcon(tabs.current().webContents.getURL()); }
}, 100);
});




document.getElementById('bookmark').addEventListener('click', async () => {
//console.log('bookmarking...');
let url = tabs.current().webContents.getURL();
let title = tabs.current().webContents.getTitle();

//console.log('checking if is book of the marked');
storage.isBookmarked(url).then(isBookmarked => {
//console.log('is bookmarked?', isBookmarked ? 'yes' : 'no');
if (isBookmarked) {
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> </svg>';
//console.log('removing bookmark');
storage.removeBookmark(isBookmarked);
genelKitaplikDataPross();
} else { //firstElementChild
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>';
//console.log('adding bookmark');
storage.addBookmark(url, title);
genelKitaplikDataPross();
}
});
});


/* Güncelleme Ekranı  */
document.getElementById('system_update').addEventListener('click', async () => {
createWindowUpdate();
});

async function createWindowUpdate() {
let mainWindowUpdate = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
width: 320,
height: 320,
x: Math.ceil(document.getElementById('system_update').getBoundingClientRect().left + window.screenX) - 285,
y: Math.ceil(document.getElementById('system_update').getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(document.getElementById('system_update'), null).height.replace("px", ""))),
parent: remote.getCurrentWindow(),
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

let create_loadModal = require('url').format({
pathname: join(__dirname, 'layout/pages/dialogs/modal/update_app.html'),
protocol: 'file:',
slashes: true
});

mainWindowUpdate.focus();

mainWindowUpdate.webContents.once('dom-ready', async () => {
});

mainWindowUpdate.on('blur', async () => {
mainWindowUpdate.close();
});

mainWindowUpdate.loadURL(create_loadModal);
}

getSearchEngine(async e => {
document.getElementById('url').placeholder = serachmotorname;
document.getElementById('url').setAttribute('data-placeholder', serachmotorname);
});

async function setSearchEngine() {
var engineMotors = store.get('settings.search_engine');
document.getElementById('url').placeholder = i18n.__('Ara')+` ${engineMotors} `+i18n.__('yada url dene');
document.getElementById('url').setAttribute('data-placeholder', i18n.__('Ara')+` ${engineMotors} `+i18n.__('yada url dene'));
};

// INITIALIZE WINDOWS
initCertDialog();
//initAlert();

loadFlags();

// WINDOW HANDLERS
remote.getCurrentWindow().on('close', async (e) => {
remote
.getCurrentWindow()
.getChildWindows()
.forEach(win => win.close());
});

remote.getCurrentWindow().on('move', async () => {
search.hide();
document.getElementById('url').blur();
});

let win = remote.getCurrentWindow();

win.on('resize', () => { 
let view = tabs.current(); 
let topbarHeight = store.get('settings.topbarHeight');

if(view){
view.setBounds({
x:windowxview, y:topbarHeight, 
width:win.getContentBounds().width+windowxviewW, 
height:win.getContentBounds().height - topbarHeight 
});
}


for (item of sidebartabs) {
if(item.id == store.get('cache_viewsx_keyid')){
let xcache_viewsx = item.viewsx;
let xcache_viewsxTopbar = item?.viewsxTopbar;

setTimeout(() => {
if(xcache_viewsx){

if(xcache_viewsx.webContents.getURL().startsWith('file:')){
let windowxviewW = -store.get('settings.leftbarmenuSize'); 
xcache_viewsx.setBounds({
width:window.outerWidth+windowxviewW,
height: window.outerHeight-topbarHeight,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+topbarHeight,
});
} else {
xcache_viewsx.setBounds({
//width: xwidht,
height: window.outerHeight-25,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+25,
});
}

xcache_viewsxTopbar?.setBounds({
//width: xwidht,
height: 25,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY,
});

}
}, 1);

} 
}

});

win.on("move", () => { 
if(!win.isMinimized()) {}
for (item of sidebartabs) {
if(item.id == store.get('cache_viewsx_keyid')){
let xcache_viewsx = item.viewsx;
let xcache_viewsxTopbar = item?.viewsxTopbar;
//burayabak
setTimeout(() => {
if(xcache_viewsx){

if(xcache_viewsx.webContents.getURL().startsWith('file:')){
let topbarHeight = store.get('settings.topbarHeight');
xcache_viewsx.setBounds({
width:window.outerWidth+windowxviewW,
height: window.outerHeight-topbarHeight,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+topbarHeight,
});
} else {
xcache_viewsx.setBounds({
//width: xwidht,
height: window.outerHeight-25,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY+25,
});
}



if(xcache_viewsxTopbar){
xcache_viewsxTopbar?.setBounds({
//width: xwidht,
height: 25,
x: Math.ceil(document.getElementById('menusleftbar').getBoundingClientRect().left + window.screenX) + xleftbarmenuSize,
y:window.screenY,
});
}

}
}, 1);

} 
}
});


if(newtabBased == 'incognito-new-tab'){
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'block://'+newtabBased);
//document.getElementById('NewTab').click();
} else {

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms));
const timer2 = ms => new Promise(res => setTimeout(res, ms));

async function loadDatapintabs () { 
// We need to wrap the loop into an async function for this to work
var datapintabs =  storage.gettabsPinsNo();
let itemCachesPins = [];

Object.values(datapintabs).forEach((datapintabsItem, i) => {
itemCachesPins.push(datapintabsItem);
});
var datasitemsPins = itemCachesPins;

if(datasitemsPins.length){
for (item of datasitemsPins){
tabs.newView(item.url, '', item.id);
await timer(500); // then the created Promise can be awaited
}
}
}


async function loadCacheStarterAppsUrl () { 
for (items of store.get('cacheStarterAppsUrl')) {
tabs.newView(items.url,true,false,items.ggezmode_babe);
await timer2(100); // then the created Promise can be awaited
}
}


setTimeout(() => {

loadDatapintabs();

// /* Kaldığın Yerden Devam Et Kapalı İse NewTab Aç*/
if (store.get('settings.starter') == 2) {
if(!store.get('cacheStarterAppsUrl')){

if(!store.get('welcome')){
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'block://intro');
store.set('welcome',true);
} else {
if(store.get('settings.newtabmode') == "block"){
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'block://'+newtabBased+oppayancar);
}
if(store.get('settings.newtabmode') == "bing"){
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'https://'+newtabBased+'/?setlang='+store.get('settings.langs'));
}
}

/*document.getElementById('NewTab').click();*/
}
}

/* Kaldığın Yerden Devam Et Açıksa Sekmeleri Aç */
if (store.get('settings.starter') == 1) {
if(store.get('cacheStarterAppsUrl')){


if(store.get('cacheStarterAppsUrl').length){
loadCacheStarterAppsUrl();

setTimeout(() => {
store.delete('cacheStarterAppsUrl');
}, 2500);

} else {
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'block://'+newtabBased+oppayancar);
}


} else {
tabs.newView(remote.process.argv[2] && (remote.process.argv[2].startsWith('http') ||
remote.process.argv[2].startsWith('block')) ? remote.process.argv[2] : 'block://'+newtabBased+oppayancar);
}
}

if (store.get('settings.starter') == 3) {
getSearchEngine(async e => {
var locUrlSafes = new URL(e.url);
tabs.newView(locUrlSafes.origin);
});
}

}, 400);
}

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
closedAppWindowExit();
});

async function closedAppWindowExit() {
if(store.get('settings.auto_clear_history')){
storage.clearHistory();
}
if(store.get('settings.auto_clear_cookies')){
}
}

/* Fare İle Yakınlaştır Uzaklaştır */
async function pageZoomInOutALL() {
let win = tabs.current(); 

// If reduced below Minimum value 
// Error - 'zoomFactor' must be a double greater than 0.0 
win.webContents.setZoomFactor(1.0); 
win.webContents.zoomFactor = 1.0;
let porrzomm = false;
// Upper Limit is working of 500 % 
win.webContents 
.setVisualZoomLevelLimits(1, 5) 
.then(/*console.log("Zoom Levels Have been Set between 100% and 500%")*/) 
.catch((err) => console.log(err)); 

win.webContents.on("zoom-changed", (event, zoomDirection) => { 
if(!porrzomm){ porrzomm = true;
var currentZoom = win.webContents.getZoomFactor(); 
//console.log("Current Zoom Level at - ", win.webContents.zoomLevel); 
if (zoomDirection === "in") { 
if(currentZoom < 5){
win.webContents.zoomFactor = currentZoom + 0.2; }
//console.log("Zoom Factor Increased to - ", win.webContents.zoomFactor * 100, "%"); 
} 
if (zoomDirection === "out") { 
if(currentZoom > 0.30000000000000004){ 
win.webContents.zoomFactor = currentZoom - 0.2; 
}
//console.log("Zoom Factor Decreased to - ", win.webContents.zoomFactor * 100, "%"); 
}
setTimeout(() => {
porrzomm = false;
}, 500);
}
//console.log(currentZoom);
});
}

/* Eklentileri Bul Ve Aktif Et */
async function loadUzatilar() {
var uzantilarKlasor = join(__dirname, 'static/extensions');
fs.readdir(uzantilarKlasor, (err, files) => {
files.forEach(file => {
//const manifest = require(uzantilarKlasor+'/'+file+'/manifest.json');
var manifest = JSON.parse(fs.readFileSync(uzantilarKlasor+'/'+file+'/manifest.json').toString());
if(store.get('extensions.'+manifest.idkey)){
require(uzantilarKlasor+'/'+file+'/'+manifest.js);
}
});
});
}
loadUzatilar();


/* Ust Tuş Uygulama Kapat */
let closeButton = document.getElementById('close-button');
closeButton.addEventListener("click", event => {
if(newtabBased == 'incognito-new-tab'){} else{
/* Kaldığın Yerden Devam Et Açıksa Verileri Sakla */
if (store.get('settings.starter') == 2) {
let itemCachesStartUrl = [];
for (item of tabs.tabs) {

var anatabssxx = document.getElementById(item.tab.element.id);  
if(!anatabssxx.classList.contains('tab-pins')){
let ggezmode_babe =  document.getElementById(anatabssxx.id).parentElement.id

var itemNewsUrlCac = { url: item.webContents.getURL(), ggezmode_babe: ggezmode_babe }
itemCachesStartUrl.push(itemNewsUrlCac);
} else {
storage.removetabsPins(anatabssxx.id);
storage.logtabsPins(item.webContents.getURL(),anatabssxx.id);
}

}
store.set('cacheStarterAppsUrl', itemCachesStartUrl);
} else{

for (item of tabs.tabs) {
var anatabssxx = document.getElementById(item.tab.element.id);  
if(!anatabssxx.classList.contains('tab-pins')){
} else {
storage.removetabsPins(anatabssxx.id);
storage.logtabsPins(item.webContents.getURL(),anatabssxx.id);
}
}

}
}
/* Kaldığın Yerden Devam Et Açıksa Verileri Sakla Son */

});


function leftbarmenu () {
if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
//if(document.querySelector('link[href="systemui/css/leftbarmenu.css"]')) document.querySelector('link[href="systemui/css/leftbarmenu.css"]').remove();
//if(!document.querySelector('link[href="systemui/css/leftbarmenu.css"]')) document.head.innerHTML += '<link rel="stylesheet" href="systemui/css/leftbarmenu.css">';

if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('menusleftbar').style.display = 'flex';
document.getElementById('newopclss').style.marginLeft = (store.get('settings.leftbarmenuSize')-10)+'px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = xleftbarmenuSize+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
} else {
document.getElementById('menusleftbar').style.display = 'block';
document.getElementById('plugingoreas').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = xleftbarmenuSize+'px';
document.getElementById('bookmarksAlls').style.paddingLeft = store.get('settings.leftbarmenuSize')+'px';
}

} else {
windowxview = 0;
windowxviewW = -0;
//if(document.querySelector('link[href="systemui/css/leftbarmenu.css"]')) document.querySelector('link[href="systemui/css/leftbarmenu.css"]').remove();
document.getElementById('menusleftbar').style.display = 'none';

document.getElementById('plugingoreas').style.paddingLeft = '0px';
if(store.get('settings.generalViews') == "BlockTheme2"){
document.getElementById('newopclss').style.marginLeft = '0px';
document.getElementsByClassName('ntabsedits')[0].style.marginLeft = '12px';
document.getElementById('bookmarksAlls').style.paddingLeft = '12px';
} else {
document.getElementById('bookmarksAlls').style.paddingLeft = '0px';
}
document.getElementsByClassName('ntabsedits')[0].style.paddingLeft = '0px';
store.set('settings.leftbarmenuSize', xleftbarmenuSize);

for (item of sidebartabs) {
var btnbulsc = document.getElementById(item.id);
btnbulsc.classList.remove('activebtns');
btnbulsc.classList.remove('pinned');
item.viewsx.hide();
item.viewsxTopbar.hide();
item.viewsx.close();
item.viewsxTopbar.close();
item.viewsx = null;
item.viewsxTopbar = null;
}
sidebartabs = [];
}
windowPageAllResize();
}

/* Tüm Yapıyı Yeniden Boyutlandır Verilen Üst Ölçüye Göre */
async function windowPageAllResize() {
let win = remote.getCurrentWindow();
let topbarHeight = store.get('settings.topbarHeight');
let bounds = win.getBounds();
for (ntabs of tabs.tabs) {
ntabs.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidus });
win.on('resize', () => {
ntabs.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidus });
});

}
}

/* Bookmarks Kaydedilenleri Ekranda Göster */
async function genelKitaplikEkle() {
if(store.get('settings.bookmarkViews')){
store.set('settings.topbarHeight', xtopbarHeightLarge);
ipcRenderer.send('newTopBarOlcus');
genelKitaplikDataPross();
} else { 
store.set('settings.topbarHeight', xtopbarHeight); 
ipcRenderer.send('newTopBarOlcus');
let anaIcerikData = document.getElementById('bookmarksAlls');
if(anaIcerikData){
anaIcerikData.style.display='none';
anaIcerikData.innerHTML = '';
}
}
}

async function genelKitaplikDataPross() {
if(store.get('settings.bookmarkViews')){
/* Temizle */
let anaIcerikDataCleans = document.getElementById('bookmarksAlls');
if(anaIcerikDataCleans){ anaIcerikDataCleans.innerHTML = ''; }
/* Geçmiş Getir Döngüye Sok Ve Veri Formatına Çevir */
let itemCachesboks = [];
let historyBooks = (await storage.getBookmarks());
Object.values(historyBooks).forEach((historyItem, i) => {
itemCachesboks.push(historyItem);
});
let rowsItems = itemCachesboks;
/* Geçmiş Getir Döngüye Sok Ve Veri Formatına Çevir Son */

/* Verileri Ekrana Yazıdır */
let anaIcerikData = document.getElementById('bookmarksAlls');
anaIcerikData.style.display = 'flex';
for (nbookitems of rowsItems.splice(0, 10)) {
var itemElTwos = document.createElement('div');
itemElTwos.title = nbookitems.url;
itemElTwos.id = nbookitems.id;
itemElTwos.className = "tab-boomarks";
var icons = `https://www.google.com/s2/favicons?sz=64&domain_url=${nbookitems.url}`;
if(!nbookitems.url.includes('block://')){
var iconsPack = `<img src="${icons}">`
} else { var iconsPack = ''; }

itemElTwos.innerHTML = `
<div class="tab" onclick="openLoadUrlGoBooks('${ nbookitems.url }')">
${iconsPack}
<p class="sc-booktextt">
${ nbookitems.title }
</p>
</div>
`.trim();
anaIcerikData.appendChild(itemElTwos);
}
var itemElTwos = document.createElement('div');
itemElTwos.title = i18n.__('Kitaplık');
itemElTwos.id = 'BookMarks';
itemElTwos.style.marginLeft = 'auto';
itemElTwos.className = "tab-boomarks tab-book-mores";
itemElTwos.innerHTML = `
<div class="tab" onclick="openLoadUrlGoBooks('block://bookmarks')">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>
<p class="sc-booktextt">
</p>
</div>
`.trim();
anaIcerikData.appendChild(itemElTwos);
/* Verileri Ekrana Yazıdır Son */
}
}