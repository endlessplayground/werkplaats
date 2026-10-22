
(() => {
    const config = window.itemListConfig;

    if (!config) {
        console.error("Item list configuration is missing.");
        return;
    }

    const categories = config.categories;
    const categoryNames = Object.keys(categories);
    const storageKey = config.storageKey;
    const customCategory = config.customCategory || categoryNames[0];

    function findCategory(name) {
        return categoryNames.find(category =>
            categories[category].includes(name)
        ) || customCategory;
    }

    let items = [];

    // Load saved items, including older string-based lists.
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
                        ? item
                        : item.name;

                    return !name.startsWith("- -");
                })
                .map(item => {
                    if (typeof item === "string") {
                        return {
                            name: item,
                            category: findCategory(item)
                        };
                    }

                    return {
                        name: item.name,
                        category: categoryNames.includes(item.category)
                            ? item.category
                            : findCategory(item.name)
                    };
                });
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

    // Build the category selectors.
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

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "+";
        button.setAttribute("aria-label", `Voeg toe: ${category}`);

        button.addEventListener("click", () => {
            if (!select.value) return;

            addItem(select.value, category);
            select.value = "";
        });

        row.append(select, button);
        section.append(heading, row);
        categoryContainer.appendChild(section);
    });

    // Add a custom item.
    document.getElementById("item-custom-form")
        .addEventListener("submit", event => {
            event.preventDefault();

            const input =
                document.getElementById("item-custom-input");

            addItem(input.value, customCategory);
            input.value = "";
        });

    // Display items grouped by category.
    function renderItems() {
        const container = document.getElementById("item-list");
        container.innerHTML = "";

        categoryNames.forEach(category => {
            const categoryItems = items.filter(
                item => item.category === category
            );

            if (!categoryItems.length) return;

            const group = document.createElement("section");
            group.className = "item-group";

            const heading = document.createElement("h5");
            heading.textContent = category;

            const buttons = document.createElement("div");
            buttons.className = "item-buttons";

            categoryItems.forEach(item => {
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
