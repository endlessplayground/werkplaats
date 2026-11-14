---
layout: default
title: Declutter
submenu: eruit
category: eruit
---

<style>
button {
    width: 40px;
    text-align: center;
}
/*button:hover {
    background: var(--green-dark);
}
.item-button.item-colour-1 {
    opacity: 1;
    background: var(--main-color);
}
.item-button.item-colour-2 {
    background: var(--orange);
}
.item-button.item-colour-3 {
    border: 4px solid var(--orange);
}*/
</style>

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Eén object eruit</h2>


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
<script>
window.itemListConfig = {
    storageKey: "eruit-ding",
    customCategory: "Rest",
    textOnlyCategories: ["Bol.com", "Kringloop"],

    categories: {
    "Tassen": [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
"41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
"51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
"61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
"71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
"81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
"91", "92", "93", "94", "95", "96", "97", "98", "99"
    ],

        "Rest": [
        "…", "…", "…", "…"
    ]

}
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>