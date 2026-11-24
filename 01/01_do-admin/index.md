---
layout: default
title: Vandaag
submenu: huishouden2
category: to-do
custom_css: extra-button
---


{% include 01_extra-button-back.html %}

<h2>

<div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Administratieve klusjes
</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "to-do-admin",
    customInputPerCategory: true,

    categories: {
        "Administratief": [],
        "Rest": []
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
