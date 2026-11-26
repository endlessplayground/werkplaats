---
layout: default
title: Supermarkt
submenu: boodschappen
category: groceries
custom_css: 02_groc-list
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Dagelijkse boodschappen</h2>



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
    "Groenten & fruit": [
        "Uien", "Knoflook", "Gember", "Pepertje",
        "__DIVIDER__",
        "Peen / wortel", "Pompoen", "Aardappelen",
        "__DIVIDER__",
        "Paprika rood", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool",
        "__DIVIDER__",
        "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola"
    ],
    "Vlees & eieren": [
        "Gehakt", "Kip", "Hamburger", "Rookworst", "Zalm", "Vis blik", "Eieren"
    ],
    "Blik & pot & fles": [
        "Bliktomaten", "Tomatenpuree", "Pesto", "Jalapeño", "Sriracha", "Mosterd", "Mayonaise", "Artisjokken", "Bonen", "Witte bonen", "Kikkererwten", "Balsamico", "Ketjap", "Sojasaus", "Oestersaus", "Sambal", "Miso", "Pindakaas"
    ],
    "Granen & noten en zo": [
        "Pasta penne", "Pasta fussili", "Pasta macaroni", "Lasagne vellen", "Rijst", "Linzen", "Taco chips", "Wraps", "Walnoten", "Cashewnoten", "Pecannoten", "Pistache", "Zonnebloempitten", "Pompoenpitten", "Pijnboompitten"
    ],
    "Zuivel & vriezer": [
        "Kaas","Strooikaas", "Melk", "Melk M", "Karnemelk", "Kwark", "Yoghurt", "Crème fraiche", "Boter",     "__DIVIDER__",
        "Sperziebonen", "Spinazie", "Bloemkool", "Zoete aardappel", "Rood fruit"
    ],
    "Overig": [
        "Kattenvoer", "Kattenbrokjes", "Speculaas", "Sprits", "Koekjes overig", "Koffie", "Koffiefilters", "Toiletpapier","Handzeep","Afwasmiddel", "Handschoenen", "Vuilniszakken", "Baking soda", "Garam masala fijn", "Garam masala grof", "Zwarte peper", "Chilivlokken", "Avocado", "Bulgur", "Gierst", "Noedels", "Limoenblad", "Santen"
    ],

    "EKOPLAZA": [
    "Raapsteel", "Snijbiet", "Zuurkool", "Prei", "Chinese kool", "Stamppotgroenten", "Appels", "Tomaten", "Paprika groen", "Citroen", "Azijn", "Olijfolie", "Lijnzaadolie", "Bouillon", "Paprika poeder", "Tahin", "Chocola 100%", "Chocola 85%", "Kamille", "Rozijnen", "Abrikozen", "Sojamelk", "Rijstvlokken", "Havermout", "Brood Ekoplaza"
    ],

    "Verzorging & gezondheid": [
    "Tandpasta", "Tandenstokers", "Oordopjes", "Neusdruppels", "Paracetamol", "Saridon", "Vaseline", "Quetiapine", "Macrogol"
    ],

    "Zelf maken": [
    "Brood", "Dressing", "Notenpasta", "Masala, gestampt", "Chilivlokken", "Peper", "Gesn.groenten", "Baking soda 1", "Baking soda 2"
    ],

    "Rest": [
        "Brood", "Dressing", "Notenpasta", "Masala, gestampt", "Chilivlokken", "Peper", "Gesneden groenten"
    ]
}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>