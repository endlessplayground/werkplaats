---
layout: default
title: Huis beneden
submenu: huis
category: house
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>De tuin</h2>



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
    storageKey: "huis-buiten",
    customCategory: "Rest",

    categories: {
    "Schuurtje": [
        "Uien", "Knoflook", "Gember", "Peper", "Peen / wortel", "Aardappelen"
    ],
    "Plantenpotten": [
        "Paprika", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool", "Pompoen"
    ],
    "Tuinmeubilair en spullen": [
        "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola", "Champignons"
    ],
    "Rest": [
        "Koffie", "Koekjes", "Kattenvoer", "Toiletpapier", "Vuilniszak", "Handzeep"
    ]
}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>