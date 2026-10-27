---
layout: default
title: Daily to-do
submenu: huishouden
---

<h4><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Heel eng…</h4>

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
    storageKey: "to-do-devil",
    customCategory: "Rest",

    categories: {
        "Enge zure appels…": [
            "Mail checken", "WhatsApp beantwoorden", "[Instantie*] bellen", "[Contract*] tekenen", "[Iets ingewikkelds*] uitzoeken", "Post openen"
        ],
        "Rest": [
            "Dinges", "Dat", "En nog iets..."
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
