---
layout: default
title: Supermarkt
submenu: boodschappen
---

<style>
.item-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 10px;
    margin-top: 20px;
}

.item-category h5,
.item-group h5 {
    margin: 0 0 10px;
    font-size: 0.9rem;
    font-weight: 600;
}

.item-select-row,
.item-custom {
    display: flex;
    gap: 4px;
}

.item-select-row select,
.item-custom input {
    min-width: 0;
    width: 100%;
    flex: 1;
    font: inherit;
    font-size: 0.8rem;
    padding: 6px;
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

#hidden {
    margin-bottom: 20px;
}

#item-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 10px;
    margin-top: 20px;
}

.item-group {
    min-width: 0;
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
    color: white;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
}

.item-button:active {
    transform: scale(0.96);
}

.item-custom {
    width: 100%;
    margin-top: 12px;
}

.item-custom[hidden] {
    display: none !important;
}

h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-right: 40px;
}

.show-hide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--yellow-light);
    cursor: pointer;
    font-size: 2.4rem;
}

.dinges {
    padding-bottom: 6px;
}
</style>

<h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>To-do lijsten</h4>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "groc-test",

    categories: {
        "Vandaag": [
            "Afwassen",
            "Keuken schoonmaken",
            "Douchen",
            "Planten water",
            "Mail checken",
            "Badkamer schoonmaken",
            "Was ophangen",
            "Was afhalen",
            "Was opvouwen",
            "Bloezen strijken",
            "Bloezen in de week zetten",
            "Tas werk klaarmaken",
            "Ontbijt werk klaarmaken",
            "Brooddeeg prepareren",
            "Avondeten voorbereiden",
            "Groente snijden",
            "Boodschappen halen",
            "Markt",
            "WhatsAppjes beantwoorden",
            "Administratie",
            "Post openmaken",
            "Bed verschonen"
        ],

        "Morgen": [
            "Afwassen",
            "Keuken schoonmaken",
            "Douchen",
            "Planten water",
            "Mail checken",
            "Badkamer schoonmaken",
            "Was ophangen",
            "Was afhalen",
            "Was opvouwen",
            "Bloezen strijken",
            "Bloezen in de week zetten",
            "Tas werk klaarmaken",
            "Ontbijt werk klaarmaken",
            "Brooddeeg prepareren",
            "Avondeten voorbereiden",
            "Groente snijden",
            "Boodschappen halen",
            "Markt",
            "WhatsAppjes beantwoorden",
            "Administratie",
            "Post openmaken",
            "Bed verschonen"
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list2.js' | relative_url }}"></script>
