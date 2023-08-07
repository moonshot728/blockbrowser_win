/* Tema Çek Yükle */
function xloadThemes(){
const theme = sendSync('getTheme');
if(theme){ themeObj = theme.toLowerCase(); }/*
if (document.querySelector('head link[href*="assets://themes"]')) document.querySelector('head link[href*="assets://themes"]').remove();
document.head.innerHTML += '<link rel="stylesheet" href="assets://themes/'+themeObj+'.css">';*/
}
xloadThemes();
/* Tema Çek Yükle Son */

let theme = sendSync('getTheme');
let listIdName = document.getElementById('list');


async function loadplug(){
/* Eklentileri Bul Ve Aktif Et */
//var uzantilarKlasor = dirname.replaceAll('js', '') + 'static/extensions/';
const uzantilarKlasor = await sendSync('exappdate');

/* Eklentileri Döndür */
const getLangPacs = sendSync('store', 'get', 'exiPackeLoadData').map(e => e); 

Object.values(getLangPacs).forEach((file, i) => { ;
var json = JSON.parse(fs.readFileSync(uzantilarKlasor+'/'+file+'/manifest.json').toString());

var itemEl = document.createElement('div');
/*
let icon;
if(json.icons['512']){
icon = json.icons['512'];
}
if(json.icons['128']){
icon = json.icons['128'];
}
if(json.icons['64']){
icon = json.icons['64'];
}*/ /* 'chrome-extension://'+file+'/'+ */

let icon = "crx://extension-icon/"+file+"/32/2?tabId=1";

let name;
if(json.browser_action?.default_title){
name = json.browser_action.default_title;
}

let idkey;
if(json.idkey){
idkey = json.idkey;
} else {
idkey = "noidkey";
}

itemEl.title = name;
itemEl.id = idkey;
itemEl.className = "col-md-4";

itemEl.innerHTML = `
<div class="card">
<div class="card-block" style="text-align: center;margin: 0 auto;">
<div class="card-images"> <img src="${ icon }"> </div>
<h4 class="card-title">${ name }</h4>
<h6 class="card-subtitle text-muted">${ json.version }</h6>
<p class="card-text p-y-1">${ i18n.__('Kimlik:') } ${ idkey }</p>
<div class="sc-ur64yn gINTBr"  style="display: flex;">
<div style="display: flex; width: 83%;">
<a style="opacity: 0.5;color: #ef1710;" class="card-link">${ i18n.__('Eklentiyi Kaldır') }</a>
</div>
<div style="display: flex; width: 18%;" id="${ json.idkey }">
<input disabled checked id="dowloadnAltPencereAlt" type="checkbox" class="switch item-control">
</div>
</div>
</div>
</div>
`.trim();
listIdName.appendChild(itemEl);

loadSettings();
bindControls(document.getElementsByClassName('item-control'));
});
}

loadplug();

/* Kayıtlı Tüm Eklentileri Çek Aktif Pasif */
async function loadSettings () {
let saved = sendSync('store', 'get', 'extensions');
for (let [key, val] of Object.entries(saved)) {
let element = document.getElementById(key);
if(!element) continue;
let control = element.lastElementChild;

if(control.tagName == 'SELECT') {control.value = val;}
if(control.tagName == 'INPUT') { control.checked = val; }

}
}

/* Eklenti Ayarları Değiştir Kaydet İşlemleri Canlandırma */
async function bindControls (controls) {
for (let control of controls) {
let key = control.parentElement.id;
if(control.tagName == 'SELECT') {
control.addEventListener('change', () => send('store', 'set', 'extensions.'+key, control.value));
}	else {    
control.addEventListener('click', () => send('store', 'set', 'extensions.'+key, control.checked));
}
}
}


/* Başka Url Git */
async function openLoadURL (urls) { window.location.href = urls; }

let leftMenuAffters = document.getElementById('eklentiler');
if(leftMenuAffters){ leftMenuAffters.classList.add('bEUiyY'); }