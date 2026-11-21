---
layout: default
title: Duivelsdingen
submenu: huishouden2
category: to-do
custom_css: extra-button
---


{% include 01_extra-button-back.html %}

<h2>
<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Heel eng…
</h2>

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
<script src="{{ '/assets/js/02_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
