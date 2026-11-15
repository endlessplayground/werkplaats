---
layout: default
title: Vandaag
submenu: huishouden2
category: to-do
---

<style>
.submenu {
  gap: 24px;
}
</style>

{% include 01_extra-button-css.html %}

<h2>

<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Klusjeslijst

{% include 01_extra-button-back.html %}

</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "to-do-list",
    customInputPerCategory: true,

    categories: {

        "": [
    "__DIVIDER__",
    "__DIVIDER__",
]

    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
