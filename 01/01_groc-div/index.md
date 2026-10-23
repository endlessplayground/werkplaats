---
layout: default
title: Supermarkt
submenu: boodschappen
---


<h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>Boodschappen diversen</h4>


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
    "Ekoplaza": [
    "Aardappelen", "Peen", "Raapsteel", "Snijbiet", "Zuurkool", "Stamppotgroenten", "Appels", "Tomaten", "Paprika", "Citroen", "Azijn", "Olijfolie", "Lijnzaadolie", "Tahin", "Chocola", "Kamille", "Sojamelk", "Rijstvlokken", "Havermout", "Brood", 
    ],
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
        "Tandenstokers", "Oordopjes", "Neusdruppels", "Pijnstillers",
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