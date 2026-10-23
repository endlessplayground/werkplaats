---
layout: default
title: Daily to-do
submenu: huishouden
---

<h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>To-do lijsten</h4>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "today-vandaag",

const dailyTasks = [
    "Afwassen",
    "Keuken schoonmaken",
    "Douchen",
    "Planten water",
    "Mail checken",
    "Badkamer schoonmaken",
    "Was ophangen",
    "Was afhalen",
    "Was opvouwen",
    "Bloezen strijken",
    "Bloezen in de week zetten",
    "Tas werk klaarmaken",
    "Ontbijt werk klaarmaken",
    "Brooddeeg prepareren",
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
    storageKey: "today-vandaag",

    categories: {
        "Urgent": dailyTasks,
        "Optioneel": dailyTasks
    }
};
};
</script>

<script src="{{ '/assets/js/00_item-list2.js' | relative_url }}"></script>
