---
layout: default
title: Maandelijks
submenu: huishouden
category: to-do
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Terugkerend elke maand</h2>

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

    categories: {
     "": [
    "30 - 24",
    "__DIVIDER__",
    "23 - 17",
    "__DIVIDER__",
    "16 - 10",
    "__DIVIDER__",
    "9 - 3",
    "__DIVIDER__",
    "Extra / toevoegen",
    ]
    }

};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_period-date.js' | relative_url }}"></script>