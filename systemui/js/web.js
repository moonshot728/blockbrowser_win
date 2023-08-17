var firstTime = true;

let { remote, ipcRenderer } = require('electron');

let oppayancar = "";
if(store.get('settings.generalViews') == "BlockTheme2"){ 
oppayancar = '-opera';
}


if(store.get('--incognitotab') == '--incognitotab'){
var newtabBased = 'incognito-new-tab';
} else {
var newtabBased = 'new-tab';
}

let windowxview = 0;
let windowxviewW = 0;

if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
}

function webContents(webview) { return remote.webContents.fromId(webview.getWebContentsId()); }
exports.webContents = webContents;

// STORAGE
const Store = require('electron-store');
window.store = new Store();

function realNowtopbarHeight() {
if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
} else {
windowxview = 0;
windowxviewW = 0;
}
let topBarOlcus = 70;
if(store.get('settings.topbarHeight')){ topBarOlcus = store.get('settings.topbarHeight'); }
return topBarOlcus;
}

let topbarHeight = realNowtopbarHeight();

let countProsseLo = false;

function setURLBar(url) {
let bar = document.getElementById('url');
if(!firstTime) {
try {
if(url == 'block://'+newtabBased+oppayancar) {
bar.value = '';
bar.focus();
bar.select();
} else {
let protocol = (new URL(url)).protocol;
let dmans = new URL(url); 
if (dmans.hostname == 'bing.com' || dmans.hostname == 'www.bing.com') {} else{
if(!protocol.startsWith('file')) bar.value = protocol.startsWith('http') ? url.substr(protocol.length + 2) : url;
}
}
} catch (e) {}
} else {
firstTime = false;
}
}
exports.setURLBar = setURLBar;

function setSearchIcon(url) {
document.getElementById('site-info').style = '';

try {
let protocol = (new URL(url)).protocol;

if(protocol == 'http:') {
document.getElementById('site-info').classList.remove('secure');
document.getElementById('site-info').classList.add('insecure');
document.querySelector('site-info > img').src = 'systemui/images/alert.svg';
}
else if(protocol == 'https:') {
document.getElementById('site-info').classList.remove('insecure');
document.getElementById('site-info').classList.add('secure');
document.getElementById('site-info > img').src = 'systemui/images/lock.svg';
} else {
document.getElementById('site-info').classList.remove('secure');
document.getElementById('site-info').classList.remove('insecure');
document.querySelector('site-info > img').src = 'systemui/images/search.svg';
}
} catch (e) {}
}
exports.setSearchIcon = setSearchIcon;

exports.init = function (doc) { document = doc }

exports.loadStart = function(view, extensions) {
let tone = window.theme === 'dark' ? 'dark' : 'light';
view.tab.setIcon('systemui/images/loading-' + tone + '.gif');
view.tab.setTitle('Loading...');
document.getElementById('bookmark').style.visibility = 'hidden';
document.getElementById('refresh').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/> </svg>';
}

exports.loadStop = function(view, extensions) {
document.getElementById('refresh').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';

view.webContents.executeJavaScript(`document.querySelectorAll('link[rel="shortcut icon"]').length`)
.then(r => {
if(r > 0) {
view.webContents.executeJavaScript(`document.querySelector('link[rel="shortcut icon"]').href`)
.then(u => view.tab.setIcon(u));
} else {

view.webContents.executeJavaScript(`document.querySelectorAll('link[rel="icon"]').length`)
.then(r => {
if(r > 0) {
view.webContents.executeJavaScript(`document.querySelector('link[rel="icon"]').href`)
.then(u => view.tab.setIcon(u));
} else {
let origin = new URL(view.webContents.getURL()).origin;
//view.tab.setIcon(origin + '/favicon.ico');
if(!view.webContents.getURL().includes('block://') && !view.webContents.getURL().includes('file://')){
var icons = `https://www.google.com/s2/favicons?sz=64&domain_url=${origin}`;
view.tab.setIcon(icons);
} else { 

if(view.tab.element.classList.contains('tab-pins')){
if(view.webContents.getURL().includes('block://') || view.webContents.getURL().includes('file://')){
view.tab.setIcon('systemui/images/public.svg');
} else {view.tab.setIcon('//:0'); }
} else {view.tab.setIcon('//:0'); }

}
}
});

}
});
view.tab.setTitle(view.webContents.getTitle());

if(view.webContents.getURL().includes('view-source:')){
view.tab.setIcon('//:0');
view.tab.setIcon('https://www.google.com/s2/favicons?sz=64&domain_url='+view.webContents.getURL().replace('view-source:',''));
}

}

exports.failLoad = function(event, view, errorCode, errorDescription, validatedURL) {
if(errorCode != -27 && errorCode != -3 && view.webContents.getURL() == validatedURL) {
window.error = {errorCode: errorCode,
errorDescription: errorDescription,
validatedURL: validatedURL,
darkMode: window.darkMode};
view.webContents.loadURL('block://network-error');
}
}

exports.didNavigate = function (url, view, storage) {
//view.webContents.session.ads_blocked = 0;

try {
let protocol = (new URL(url)).protocol;
if(protocol.startsWith('http')) {
if(!countProsseLo){ 
countProsseLo = true;

if(newtabBased == 'incognito-new-tab'){} else { 
setTimeout(()=>{ 
if(view.webContents?.getTitle()){ storage.logHistory(url, view.webContents.getTitle()); }
countProsseLo = false; 
}, 1300);
}

}
}
} catch (e) {}
setSearchIcon(url);
}

exports.enterFllscrn = function(view, screen) {
var xwidth = screen.getPrimaryDisplay().size.width;
var xheight = screen.getPrimaryDisplay().size.height;
view.setBounds({ x: 0, y: 0, width: xwidth, height: xheight });
}

exports.leaveFllscrn = function(view, bounds) {
topbarHeight = realNowtopbarHeight();
view.setBounds({x:windowxview, y:topbarHeight, width:bounds.width+windowxviewW, height:bounds.height-topbarHeight});
view.setBounds({x:windowxview, y:topbarHeight, width:bounds.width+windowxviewW, height:bounds.height-topbarHeight});
}

exports.domReady = function (view, storage) {

setURLBar(view.webContents.getURL());

view.webContents.insertCSS('input::-webkit-calendar-picker-indicator {display: none;}');

storage.isBookmarked(view.webContents.getURL()).then((result) => {
document.getElementById('bookmark').style.visibility = 'visible';
if(result){
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>';
} else {
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> </svg>';
}
});

if (view.webContents.canGoBack()) { document.getElementById('back').removeAttribute('disabled') }
else { document.getElementById('back').setAttribute('disabled', true) }
if (view.webContents.canGoForward()) { document.getElementById('forward').removeAttribute('disabled') }
else { document.getElementById('forward').setAttribute('disabled', true) }

if(window.theme == 'dark') {
view.webContents.insertCSS(`
::-webkit-scrollbar { width: 17px; }
::-webkit-scrollbar-track { background-color: #2E3440;}
::-webkit-scrollbar-thumb { background-color: #3B4252;}
::-webkit-scrollbar-thumb:hover { background-color: #434C5E;}
::-webkit-scrollbar-corner { display: none; }`);
}

switch (view.webContents.getURL()) {
case 'block://network-error':
view.webContents.send('setError', window.error);
window.error = {errorCode: '-300', validatedURL: 'block://network-error', darkMode: window.darkMode};
break;
default:
break;
}
}

exports.newWindow = function (newView, url, frameName, disp, legit=false) {
if(legit) newView(url);
}

exports.faviconUpdated = function (view, favicons) {
if(favicons && favicons.length > 0) { view.tab.setIcon(favicons[0]); }
}

exports.titleUpdated = function (view, event, title) {
view.tab.setTitle(title);
view.tab.title.title = title;
}

exports.changeTab = function (view, storage) {
setURLBar(view.webContents.getURL());
setSearchIcon(view.webContents.getURL());

storage.isBookmarked(view.webContents.getURL()).then((result) => {
document.getElementById('bookmark').style.visibility = 'visible';
if(result){
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>';
} else {
document.getElementById('bookmark').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> </svg>';
}
});

try {
let protocol = (new URL(view.webContents)).protocol;
if(protocol.startsWith('http')) setSearchIcon(view.webContents.getURL());
} catch (e) {}

try {
if (view.webContents.canGoBack()) { document.getElementById('back').removeAttribute('disabled') }
else { document.getElementById('back').setAttribute('disabled', true) }
if (view.webContents.canGoForward()) { document.getElementById('forward').removeAttribute('disabled') }
else { document.getElementById('forward').setAttribute('disabled', true) }
} catch (e) {}

if (view.webContents.isLoading()) { 
document.getElementById('refresh').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/> </svg>';
} else {
document.getElementById('refresh').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';
}

}

exports.exitPointerLock = function (view) {
view.webContents.executeJavaScript(`document.exitPointerLock();`);
}