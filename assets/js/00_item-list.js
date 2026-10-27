
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
    const LOAD_ALL = "__LOAD_ENTIRE_LIST__";

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

        // Prevent duplicates within the same category.
        if (items.some(item =>
            item.name === name && item.category === category
        )) return;

        items.push({ name, category });
        saveItems();
        renderItems();
    }

    function addEntireList(category) {
        categories[category].forEach(name => {
            if (!items.some(item =>
                item.name === name && item.category === category
            )) {
                items.push({ name, category });
            }
        });

        saveItems();
        renderItems();
    }
    
    // Build the category selectors.
    const categoryContainer =
        document.getElementById("item-categories");

    if (categoryContainer) {
        categoryNames.forEach(category => {
            const section = document.createElement("section");
            section.className = "item-category";

            const heading = document.createElement("h5");
            heading.textContent = category;
            section.appendChild(heading);

            // No dropdown for Rest.
            if (category !== "Rest") {
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

                const loadAllOption = document.createElement("option");
                loadAllOption.value = LOAD_ALL;
                loadAllOption.textContent = "📋 Laad de hele lijst";
                select.appendChild(loadAllOption);

                select.addEventListener("change", () => {
                    if (select.value === LOAD_ALL) {
                        addEntireList(category);
                    } else if (select.value) {
                        addItem(select.value, category);
                    }

                    select.selectedIndex = 0;
                });

                section.appendChild(select);
            }

            // Custom input for each category.
            
            if (
                config.customInputPerCategory === true &&
                category !== "Elke dag"
                ) {
                const customForm = document.createElement("form");
                customForm.className = "item-custom";

                const customInput = document.createElement("input");
                customInput.type = "text";
                customInput.placeholder = "Voeg zelf toe …";
                customInput.autocomplete = "off";

                const customButton = document.createElement("button");
                customButton.type = "submit";
                customButton.textContent = "+";

                customForm.append(customInput, customButton);

                customForm.addEventListener("submit", event => {
                    event.preventDefault();
                    addItem(customInput.value, category);
                    customInput.value = "";
                });

                section.appendChild(customForm);
            }

            categoryContainer.appendChild(section);
        });
    }


    // Keep support for pages using one shared custom-input form.
    const customForm = document.getElementById("item-custom-form");

    if (customForm) {
        customForm.addEventListener("submit", event => {
            event.preventDefault();

            const input = document.getElementById("item-custom-input");

            if (input) {
                addItem(input.value, customCategory);
                input.value = "";
            }
        });
    }

    // Display items grouped by category.
    function renderItems() {
        const container = document.getElementById("item-list");
        if (!container) return;

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

    // Show/hide the input area.
    const toggleButton = document.getElementById("toggle-input");
    const inputSection = document.getElementById("hidden");

    if (toggleButton && inputSection) {
        toggleButton.addEventListener("click", () => {
            inputSection.hidden = !inputSection.hidden;
        });
    }

    renderItems();
})();
