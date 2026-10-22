
(() => {
    const config = window.itemListConfig;
    if (!config) return;

    const categories = config.categories;
    const categoryNames = Object.keys(categories);
    const storageKey = config.storageKey;

    function findCategory(name) {
        return categoryNames.find(category =>
            categories[category].includes(name)
        ) || categoryNames[0];
    }

    let items = [];

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];

        if (Array.isArray(saved)) {
            items = saved
                .filter(item =>
                    typeof item === "string" ||
                    (item && typeof item.name === "string")
                )
                .filter(item => {
                    const name = typeof item === "string"
                        ? item : item.name;
                    return !name.startsWith("- -");
                })
                .map(item => typeof item === "string"
                    ? { name: item, category: findCategory(item) }
                    : {
                        name: item.name,
                        category: categoryNames.includes(item.category)
                            ? item.category
                            : findCategory(item.name)
                    }
                );
        }
    } catch (error) {
        items = [];
    }

    function saveItems() {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }

    function addItem(name, category) {
        name = name.trim();
        if (!name) return;

        items.push({ name, category });
        saveItems();
        renderItems();
    }

    // BUILD HIDDEN INPUT AREA
    const categoryContainer =
        document.getElementById("item-categories");

    categoryNames.forEach(category => {
        const section = document.createElement("section");
        section.className = "item-category";

        const heading = document.createElement("h5");
        heading.textContent = category;

        const row = document.createElement("div");
        row.className = "item-select-row";

        const select = document.createElement("select");
        select.setAttribute("aria-label", category);

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Kies...";
        placeholder.selected = true;
        placeholder.disabled = true;
        placeholder.hidden = true;
        select.appendChild(placeholder);

        categories[category].forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });

        const addPreset = document.createElement("button");
        addPreset.type = "button";
        addPreset.textContent = "+";

        addPreset.addEventListener("click", () => {
            if (!select.value) return;
            addItem(select.value, category);
            select.value = "";
        });

        row.append(select, addPreset);

        // CUSTOM INPUT DIRECTLY BELOW THIS CATEGORY'S DROPDOWN
        const form = document.createElement("form");
        form.className = "item-custom";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Voeg toe...";
        input.autocomplete = "off";

        const addCustom = document.createElement("button");
        addCustom.type = "submit";
        addCustom.textContent = "+";

        form.append(input, addCustom);

        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!input.value.trim()) return;

            addItem(input.value, category);
            input.value = "";
        });

        section.append(row, form);
        categoryContainer.appendChild(section);
    });

    // TOGGLE THE WHOLE INPUT AREA
    const toggleButton = document.getElementById("toggle-input");
    const inputSection = document.getElementById("hidden");

    toggleButton.addEventListener("click", () => {
        inputSection.hidden = !inputSection.hidden;
    });

    // DISPLAY TASK LISTS WITHOUT INPUT FIELDS
    function renderItems() {
        const container = document.getElementById("item-list");
        container.innerHTML = "";

        categoryNames.forEach(category => {
            const group = document.createElement("section");
            group.className = "item-group";

            const heading = document.createElement("h5");
            heading.textContent = category;

            const buttons = document.createElement("div");
            buttons.className = "item-buttons";

            items.filter(item => item.category === category)
                .forEach(item => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = "item-button";
                    button.textContent = item.name;
                    button.title = "Tik om te verwijderen";

                    button.addEventListener("click", () => {
                        const index = items.indexOf(item);
                        if (index !== -1) {
                            items.splice(index, 1);
                            saveItems();
                            renderItems();
                        }
                    });

                    buttons.appendChild(button);
                });

            group.append(heading, buttons);
            container.appendChild(group);
        });
    }

    renderItems();
})();
