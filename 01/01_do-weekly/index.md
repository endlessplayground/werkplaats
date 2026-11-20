---
layout: default
title: Wekelijks
submenu: huishouden1
category: to-do
custom_css: extra-button
---


{% include 01_extra-button.html %}

<h2>
<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Elke week
</h2>

<div id="period-date" data-period="weekly"></div>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_weekly-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "weekly-tasks",
    customInputPerCategory: true,
    clearListButton: true,

    categories: {
"Doen": [
    "Sanitair",
    "Koelkast",
    "Trappen en vloeren",
    "__DIVIDER__",
    "Extra / toevoegen"

    ],
"Per dag…": [
    "Maandag",
    "__DIVIDER__",
    "Dinsdag",
    "__DIVIDER__",
    "Woensdag",
    "__DIVIDER__",
    "Donderdag",
    "__DIVIDER__",
    "Vrijdag",
    "__DIVIDER__",
    "Zaterdag",
    "__DIVIDER__",
    "Zondag",
    ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/02_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
<script src="{{ '/assets/js/01_period-date.js' | relative_url }}"></script>