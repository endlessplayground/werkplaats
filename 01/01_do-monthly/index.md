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

<script src="{{ '/assets/js/00_monthly-tasks.js' | relative_url }}"></script>

<script>

window.itemListConfig = {
    storageKey: "to-do-monthly",
    customCategory: "Rest",

    categories: {
"Week 1": window.monthlyTasks,
        "Week 2": [
            "Dinges", "Dat", "En nog iets..."
        ],
        "Week 3": [
            "Dinges", "Dat", "En nog iets..."
        ],
        "Week 4": [
            "Dinges", "Dat", "En nog iets..."
        ],
        "Rest": [
            "Dinges", "Dat", "En nog iets..."
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>

<script src="{{ '/assets/js/00_period-date.js' | relative_url }}"></script>
