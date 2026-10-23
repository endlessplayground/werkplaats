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

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>

<script>

window.itemListConfig = {
    storageKey: "to-do-vandaag",
    customCategory: "Rest",

    categories: {
"Urgent": window.dailyTasks,
"Optioneel": window.dailyTasks,
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
