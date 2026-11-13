---
layout: default
title: Ordenen
submenu: order
category: order
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Spullen per rubriek</h2>


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
    storageKey: "house-oreder",
    customCategory: "Rest",
    textOnlyCategories: ["Bol.com", "Kringloop"],

    categories: {
    "Boeken": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Plastic emmers": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Bewaarbakjes": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Ongeopende post": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Glazen potten": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Schrijfgerei": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Eten gangkast": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Keukentextiel": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],
    "Plantenpotten": [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣"
    ],

        "Rest": [
        "…", "…", "…", "…"
    ]

}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>