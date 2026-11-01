---
layout: default
title: Huis beneden
submenu: huis
category: house
---


<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Benedenverdieping</h2>


<div id="hidden" hidden>

<div id="item-categories" class="item-grid"></div>

</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "house-beneden",
    textOnlyCategories: ["Inventarisatie", "Ideeën", "Alvast doen"],

    categories: {
        "Inventarisatie": [],
        "Ideeën": [],
        "Alvast doen": []
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>