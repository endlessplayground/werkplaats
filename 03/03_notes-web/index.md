---
layout: default
title: Aantekeningen
submenu: notities
category: notes
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Notities website</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>

    <form id="item-custom-form" class="item-custom">
        <input
            type="text"
            id="item-custom-input"
            placeholder="Voeg zelf toe …"
            autocomplete="off"
        >
        <button type="submit">+</button>
    </form>
</div>

<div id="item-list"></div>


<style>
    #item-categories .item-category h3 {
        display: none;
    }

    #item-list .item-group h3 {
        display: none;
    }

    .item-group {
        margin-top: 20px;
    }
</style>

<script>

window.itemListConfig = {
    storageKey: "notes-web",
    customCategory: "Rest",

    categories: {
        "Rest": [
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
