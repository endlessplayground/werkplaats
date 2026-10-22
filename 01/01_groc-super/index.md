---
layout: default
title: Supermarkt
submenu: boodschappen
---
<style>

/* =================================
   SUPERMARKT: CATEGORIEËN
   ================================= */

#grocery-list {
    margin-bottom: 200px;
}

.grocery-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 10px;
}

.grocery-category h5,
.grocery-list-group h5 {
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: var(--text-color);
    font-weight: 600;
}

.grocery-select-row {
    display: flex;
    gap: 4px;
}

.grocery-select-row select {
    min-width: 0;
    width: 100%;
    flex: 1;
    font: inherit;
    font-size: 0.8rem;
}

.grocery-select-row button,
.grocery-custom button {
    padding: 3px 9px;
    border: none;
    border-radius: 4px;
    background: var(--blue);
    color: var(--grey-dark);
    font: inherit;
    cursor: pointer;
}

/* EIGEN BOODSCHAP: VOLLE BREEDTE */

.grocery-custom {
    display: flex;
    gap: 6px;
    width: 100%;
    margin-top: 16px;
}

.grocery-custom input {
    min-width: 0;
    flex: 1;
    padding: 6px;
    font: inherit;
}

.grocery-custom button {
    padding: 4px 12px;
}

/* BOODSCHAPPENLIJST PER CATEGORIE */

.grocery-list-group {
    margin-top: 18px;
}

.grocery-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

/* GROCERY BUTTONS: CHANGE THEIR STYLE HERE */

.grocery-item {
    padding: 5px 9px;
    border: none;
    border-radius: 5px;
    background: var(--blue);
    color: var(--yellow-light);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
}

.grocery-item:active {
    transform: scale(0.96);
}


</style>


<h4>Boodschappen supermarkt</h4>

<div id="grocery-list"></div>


<div id="grocery-categories" class="grocery-grid"></div>

<form id="grocery-custom-form" class="grocery-custom">
    <input
        type="text"
        id="grocery-custom-input"
        placeholder="Voeg zelf toe …"
        autocomplete="off"
    >
    <button type="submit">+</button>
</form>


<script src="{{ '/assets/js/01_groc-super.js' | relative_url }}"></script>
