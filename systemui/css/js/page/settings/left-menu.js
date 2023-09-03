var leftMenu = document.getElementById('left-menu');
if(leftMenu){
leftMenu.innerHTML = `
<div class="sc-f9ba9e bNoKEx">

<div id="ayarlar" title="Ayarlar" class="sc-1klqouq bECQfp i18n" onclick="openLoadURLMenu('block://settings')">
<div class="sc-lt5gah heosCI" style="background-image: url(assets://images/settings/settings.svg);"></div>
Ayarlar
</div>

<div id="gecmis" title="Past" class="sc-1klqouq bECQfp i18n" onclick="openLoadURLMenu('block://history')">
<div class="sc-lt5gah heosCI" style="background-image: url(assets://images/settings/history.svg);"></div>
Past
</div>

<div id="kaydedilenler" title="Saved" class="sc-1klqouq bECQfp i18n" onclick="openLoadURLMenu('block://bookmarks')">
<div class="sc-lt5gah heosCI" style="background-image: url(assets://images/settings/bookmark.svg);"></div>
Saved
</div>

<div id="indirilenler" title="Downloads" class="sc-1klqouq bECQfp i18n" onclick="openLoadURLMenu('block://downloads')">
<div class="sc-lt5gah heosCI" style="background-image: url(assets://images/settings/download.svg);"></div>
Downloads
</div>

<div id="eklentiler" title="Additions" class="sc-1klqouq bECQfp i18n" onclick="openLoadURLMenu('block://extensions')">
<div class="sc-lt5gah heosCI" style="background-image: url(assets://images/settings/extension.svg);"></div>
Additions
</div>

</div>
`;
}


/* Başka Url Git */
async function openLoadURLMenu (urls) { window.location.href = urls; }

function openLoadURLMenuX(url){
alert(`This section is under construction.
It will be active as soon as possible with the new update.
`);
}