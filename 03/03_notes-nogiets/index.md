---
layout: default
title: Aantekeningen
submenu: notities
category: notes
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Nog meer notities</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>

</div>

<div id="item-list"></div>


<script>
window.itemListConfig = {
    storageKey: "notes-nogiets",
    textOnlyCategories: ["Nu", "Later", "Nog later"],

    categories: {
        "Nu": [],
        "Later": [],
        "Nog later": []
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
