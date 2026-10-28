---
layout: default
title: Diversen
submenu: boodschappen
category: groceries
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Boodschappen diversen</h2>


<div id="hidden" hidden>

<div id="item-categories" class="item-grid"></div>

<form id="item-custom-form" class="item-custom">
    <input
            type="text"
            id="item-custom-input"
            placeholder="Voeg zelf toe …"
            autocomplete="off"
    >
    <button type="submit">+</button>
</form>
</div>

<div id="item-list"></div>
<script>
window.itemListConfig = {
    storageKey: "groc-div",
    customCategory: "Rest",

    categories: {
    "Markt": [
        "Avocado", "Kruiden", "Kaas", "Vis"
    ],
    "Turkse super": [
        "Kip", "Bulgur", "Olijven", "Tuinbonen", "Koriander", "Basilicum", "Garam massala", "Roti pannekoeken"
    ],
    "Toko": [
        "Ketjap", "Sojasaus", "Oestersaus", "Limoenblad", "Noedels", "Santen"
    ],
    "Drogist": [
        "Oordopjes", "Neusdruppels", "Pijnstillers", "Tandenstokers"
    ],
    "Kringloop": [
        "Borden", "Opscheplepel",
    ],
    "Bol.com": [
        "…", "…", "…", "…"
    ],
        "Rest": [
        "…", "…", "…", "…"
    ]

}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>