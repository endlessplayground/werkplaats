---
layout: default
title: Vandaag
submenu: huishouden1
category: to-do
custom_css: extra-button
---


{% include 01_extra-button.html %}

<h2>
<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Vandaag!
</h2>


<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "to-do-vandaag",
    customInputPerCategory: true,

    categories: {

        "": [
    "Ochtend",
    "Afwas 1",
    "Keukenvloer",
    "Vuilnis",
    "Klusje uit lijst",
    "__DIVIDER__",
    "Middag",
    "Was",
    "Planten",
    "🧩",
    "Afwas 2"
]

    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/02_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>



