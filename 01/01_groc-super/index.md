---
layout: default
title: Supermarkt
submenu: boodschappen
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Boodschappen supermarkt</h2>



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
    storageKey: "groc-super",
    customCategory: "Rest",

    categories: {
    "Groenten & fruit 1": [
        "Uien", "Knoflook", "Gember", "Peper", "Peen / wortel", "Aardappelen"
    ],
    "Groenten & fruit 2": [
        "Paprika", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool", "Pompoen"
    ],
    "Groenten & fruit 3": [
        "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola", "Champignons"
    ],
    "Vlees & eieren": [
        "Gehakt", "Kip", "Hamburger", "Rookworst", "Zalm", "Vis blik", "Eieren"
    ],
    "Blik & pot & fles": [
        "Bliktomaten", "Tomatenpuree", "Pesto", "Jalapeño", "Sriracha", "Mosterd", "Mayonaise", "Artisjokken", "Bonen", "Balsamico", "Ketjap", "Sojasaus", "Oestersaus", "Pindakaas"
    ],
    "Granen & noten": [
        "Pasta", "Lasagne vellen", "Rijst", "Taco chips", "Wraps", "Walnoten", "Cashewnoten", "Pecannoten", "Pistache", "Zonnebloempit", "Pompoenpit", "Pijnboompit"
    ],
    "Zuivel & vriezer": [
        "Strooikaas", "Melk", "Melk M", "Karnemelk", "Kwark", "Yoghurt", "Sperziebonen", "Spinazie", "Bloemkool", "Zoete aardappel", "Rood fruit"
    ],
    "EKOPLAZA": [
    "Aardappelen", "Peen", "Raapsteel", "Snijbiet", "Zuurkool", "Stamppotgroenten", "Appels", "Tomaten", "Paprika", "Citroen", "Azijn", "Olijfolie", "Lijnzaadolie", "Tahin", "Chocola", "Kamille", "Sojamelk", "Rijstvlokken", "Havermout", "Brood",  "Tandendstokers"
    ],
    "Rest": [
        "Koffie", "Koekjes", "Kattenvoer", "Toiletpapier", "Vuilniszak", "Handzeep"
    ]
}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>