---
layout: default
title: Maandelijks
submenu: huishouden1
category: to-do
custom_css: extra-button
---


{% include 01_extra-button.html %}

<h2>

<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Elke maand


</h2>

<div id="period-date" data-period="monthly"></div>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_monthly-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "monthly-tasks",
    customInputPerCategory: true,
    clearListButton: true,
    newPeriodButton: true,

    categories: {
     "": [
    "Dag 1 - 7",
    "Bed verschonen",
    "__DIVIDER__",
    "Dag 8 - 14",
    "Koelkast",
    "__DIVIDER__",
    "Dag 15 - 21",
    "Trappen en vloeren",
    "__DIVIDER__",
    "Dag 22 - 30",
    "Vriezer"
    ]
    }

};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_period-date.js' | relative_url }}"></script>