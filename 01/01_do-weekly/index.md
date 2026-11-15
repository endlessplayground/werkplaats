---
layout: default
title: Wekelijks
submenu: huishouden1
category: to-do
---

{% include 01_extra-button-css.html %}


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Elke week

{% include 01_extra-button.html %}

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
     "": [
    "6 - 7",
    "__DIVIDER__",
    "5 - 4",
    "__DIVIDER__",
    "3 - 2",
    "__DIVIDER__",
    "Extra / toevoegen"
     ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>

<script src="{{ '/assets/js/00_period-date.js' | relative_url }}"></script>