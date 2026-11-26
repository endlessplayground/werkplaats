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
    newPeriodButton: true,

    categories: {
"Per dag…": [
    "Maandag", "Mail 1",
    "__DIVIDER__",
    "Dinsdag", "Planten 1", "Voorraadlijst",
    "__DIVIDER__",
    "Woensdag", "Mail 2",
    "__DIVIDER__",
    "Donderdag", "Markt", "Rondom bed",
    "__DIVIDER__",
    "Vrijdag", "Mail 3", "Planten 2",
    "__DIVIDER__",
    "Zaterdag", "Werktas",
    "__DIVIDER__",
    "Zondag", "Rondom bank",
    "__DIVIDER__",
    "Extra…"
    ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_period-date.js' | relative_url }}"></script>