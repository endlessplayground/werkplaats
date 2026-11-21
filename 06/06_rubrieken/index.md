---
layout: default
title: Rubrieken
submenu: order
category: order
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Rubrieken</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "rubrieken",
    customInputPerCategory: true,
    textOnlyCategories: [],

    categories: {
        "": ["Plastic emmers", "Plantenpotten", "Keukentextiel", "Glazen potten", "Boeken", "Schrijfgerei", "Eten gangkast", "Ongeopende post"], 
    }
};
</script>


<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
<script src="{{ '/assets/js/02_show-hide.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_item-list-gestures.js' | relative_url }}"></script>
