---
layout: default
title: Supermarkt
submenu: boodschappen
---

<style>
/* CATEGORY GRID */

.item-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 10px;
    margin-top: 120px;
}

.item-category h5,
.item-group h5 {
    margin: 0 0 5px;
    font-size: 0.9rem;
    font-weight: 600;
}

.item-select-row {
    display: flex;
    gap: 4px;
}

.item-select-row select {
    min-width: 0;
    width: 100%;
    flex: 1;
    font: inherit;
    font-size: 0.8rem;
}

.item-select-row button,
.item-custom button {
    padding: 3px 9px;
    border: none;
    border-radius: 4px;
    background: var(--blue);
    color: var(--grey-dark);
    font: inherit;
    cursor: pointer;
}

/* CUSTOM ITEM */

.item-custom {
    display: flex;
    gap: 6px;
    width: 100%;
    margin-top: 16px;
}

.item-custom input {
    min-width: 0;
    flex: 1;
    padding: 6px;
    font: inherit;
}

.item-custom button {
    padding: 4px 12px;
}

/* SAVED ITEMS */

.item-group {
    margin-top: 18px;
}

.item-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.item-button {
    padding: 5px 9px;
    border: none;
    border-radius: 5px;
    background: var(--blue);
    color: var(--yellow-light);
    font: inherit;
    font-size: 0.9rem;
    cursor: pointer;
}

.item-button:active {
    transform: scale(0.96);
}
</style>



<h4>Boodschappen supermarkt</h4>

<div id="item-list"></div>

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


<script>
window.itemListConfig = {
    storageKey: "groc-super",
    customCategory: "Rest",

    categories: {
    "Groenten & fruit 1": [
        "Uien", "Knoflook", "Gember", "Peper"
    ],
    "Groenten & fruit 2": [
        "Paprika", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool", "Pompoen"
    ],
    "Groenten & fruit 3": [
        "Aardappelen", "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola", "Champignons"
    ],
    "Vlees & eieren": [
        "Gehakt", "Kip", "Hamburger", "Rookworst", "Zalm", "Vis blik", "Eieren"
    ],
    "Blik & pot": [
        "Bliktomaten", "Tomatenpuree", "Pesto", "Jalapeño", "Artisjokken", "Bonen", "Mosterd",
    ],
    "Granen & noten": [
        "Pasta", "Rijst", "Wraps", "Walnoten", "Cashew", "Pistache", "Zonnebloempit", "Pompoenpit", "Pijnoompit"
    ],
    "Zuivel & vriezer": [
        "Sperziebonen", "Spinazie", "Bloemkool", "Zoete aardappel", "Rood fruit"
    ],
    "Rest": [
        "Koffie", "Koekjes", "Kattenvoer", "Toiletpapier", "Vuilniszak", "Handzeep"
    ]
}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>