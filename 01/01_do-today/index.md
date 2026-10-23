---
layout: default
title: Daily to-do
submenu: huishouden
---

<h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>Vandaag doen</h4>

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
const dailyTasks = [
    "Afwassen",
    "Keuken schoonmaken",
    "Douchen",
    "Planten water",
    "Mail checken",
    "Badkamer schoonmaken",
    "Was ophangen",
    "Was afhalen",
    "Was opruimen",
    "Bloezen strijken",
    "Bloezen in de week zetten",
    "Tas werk klaarmaken",
    "Ontbijt werk klaarmaken",
    "Brooddeeg",
    "Avondeten voorbereiden",
    "Groente snijden",
    "Boodschappen halen",
    "Markt",
    "WhatsAppjes beantwoorden",
    "Administratie",
    "Post openmaken",
    "Bed verschonen"
];

window.itemListConfig = {
    storageKey: "to-do-vandaag",
    customCategory: "Rest",

    categories: {
        "Urgent": dailyTasks,
        "Optioneel": dailyTasks,
        "Administratief": [
            "Mail checken", "WhatsApp beantwoorden", "[Instantie*] bellen", "[Contract*] tekenen", "[Iets ingewikkelds*] uitzoeken", "Post openen"
        ],
        "Nog een categorie": [
            "Dinges", "Dat", "En nog iets..."
        ],
        "Rest": [
            "Dinges", "Dat", "En nog iets..."
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
