---
layout: default
title: Ordenen
submenu: order
category: order
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Benedenverdieping</h2>



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
    storageKey: "huis-beneden",
    customCategory: "Rest",

    categories: {
    "Kamer algemeen": [
        "Uien", "Knoflook", "Gember", "Peper", "Peen / wortel", "Aardappelen"
    ],
    "Kamer en laatjes": [
        "Paprika", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool", "Pompoen"
    ],
    "Keuken": [
        "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola", "Champignons"
    ],
    "Gang": [
        "Gehakt", "Kip", "Hamburger", "Rookworst", "Zalm", "Vis blik", "Eieren"
    ],
    "Gangkast": [
        "Bliktomaten", "Tomatenpuree", "Pesto", "Jalapeño", "Sriracha", "Mosterd", "Mayonaise", "Artisjokken", "Bonen", "Balsamico", "Ketjap", "Sojasaus", "Oestersaus", "Pindakaas"
    ],
    "Trap": [
        "Pasta", "Lasagne vellen", "Rijst", "Taco chips", "Wraps", "Walnoten", "Cashewnoten", "Pecannoten", "Pistache", "Zonnebloempit", "Pompoenpit", "Pijnboompit"
    ],
    "Rest": [
        "Koffie", "Koekjes", "Kattenvoer", "Toiletpapier", "Vuilniszak", "Handzeep"
    ]
}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>