---
layout: default
title: Duivelsdingen
submenu: huishouden
category: to-do
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Heel eng…</h2>

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

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "to-do-devil",
    customCategory: "Rest",

    categories: {
        "Enge zure appels…": [
            "Mail checken", "WhatsApp beantwoorden", "[Instantie*] bellen", "[Contract*] tekenen", "[Iets ingewikkelds*] uitzoeken", "Post openen"
        ],
        "Rest": [
            "Dinges", "Dat", "En nog iets..."
        ]
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>

  <script>
(() => {
    const icon = document.querySelector(".devil-icon");
    if (!icon) return;

    const storageKey = "to-do-devil";

    function updateIcon() {
        let items = [];

        try {
            items = JSON.parse(localStorage.getItem(storageKey)) || [];
        } catch (error) {}

        const hasTasks = Array.isArray(items) && items.some(item => {
            const name = typeof item === "string" ? item : item?.name;
            return typeof name === "string" && !name.startsWith("- -");
        });

        icon.src = icon.src.replace(
            hasTasks ? "saint.svg" : "devil.svg",
            hasTasks ? "devil.svg" : "saint.svg"
        );

        icon.alt = hasTasks ? "To-do list met taken" : "To-do lijst leeg";
    }

    updateIcon();

    window.addEventListener("item-list-updated", updateIcon);
    window.addEventListener("storage", updateIcon);
})();
</script>

