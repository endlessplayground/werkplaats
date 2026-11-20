(() => {
    const config = window.itemListConfig;

    if (!config) {
        console.error("Item list configuration is missing.");
        return;
    }

    const categories = config.categories;
    const categoryNames = Object.keys(categories);
    const storageKey = config.storageKey;
    const customCategory = config.customCategory;
    const textOnlyCategories = config.textOnlyCategories || [];
    const LOAD_ALL = "__LOAD_ENTIRE_LIST__";
    const DIVIDER = "__DIVIDER__";

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
                            category: findCategory(item),
                            colourState: 0
                        };
                    }

                    return {
                        ...item,
                        name: item.name,
                        category: categoryNames.includes(item.category)
                            ? item.category
                            : findCategory(item.name),
                        colourState: [0, 1, 2, 3, 4].includes(item.colourState)
                            ? item.colourState
                            : 0
                    };
                });
        }
    } catch (error) {
        items = [];
    }


    function saveItems() {
        localStorage.setItem(storageKey, JSON.stringify(items));

        window.dispatchEvent(new CustomEvent("item-list-updated", {
            detail: { storageKey }
        }));
    }


    function addItem(name, category) {
        name = name.trim();
        if (!name) return;

        if (items.some(item =>
            item.name === name && item.category === category
        )) return;

        items.push({ name, category, colourState: 0 });
        saveItems();
        renderItems();
    }


    function addDivider(category, dividerIndex = null) {
        const divider = {
            name: "",
            category,
            type: "divider",
            colourState: 0
        };

        if (dividerIndex !== null) {
            divider.dividerIndex = dividerIndex;
        }

        items.push(divider);
        saveItems();
        renderItems();
    }


    function addEntireList(category) {
        categories[category].forEach((name, index) => {

            if (name === DIVIDER) {
                if (!items.some(item =>
                    item.category === category &&
                    item.type === "divider" &&
                    item.dividerIndex === index
                )) {
                    items.push({
                        name: "",
                        category,
                        type: "divider",
                        dividerIndex: index,
                        colourState: 0
                    });
                }

                return;
            }

            if (!items.some(item =>
                item.name === name && item.category === category
            )) {
                items.push({ name, category, colourState: 0 });
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

            const heading = document.createElement("h3");
            heading.textContent = category;
            section.appendChild(heading);

            if (textOnlyCategories.includes(category)) {
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

            } else if (category !== "Rest") {
                const select = document.createElement("select");
                select.setAttribute("aria-label", category);

                const placeholder = document.createElement("option");
                placeholder.value = "";
                placeholder.textContent = "Kies...";
                placeholder.selected = true;
                placeholder.disabled = true;
                placeholder.hidden = true;
                select.appendChild(placeholder);

                const dividerOption = document.createElement("option");
                dividerOption.value = "__ADD_DIVIDER__";
                dividerOption.textContent = "────── Lijntje ──────";
                select.appendChild(dividerOption);

                categories[category].forEach((name, index) => {
                    const option = document.createElement("option");

                    if (name === DIVIDER) {
                        option.value = `${DIVIDER}:${index}`;
                        option.textContent = "────────";
                    } else {
                        option.value = name;
                        option.textContent = name;
                    }

                    select.appendChild(option);
                });

                const loadAllOption = document.createElement("option");
                loadAllOption.value = LOAD_ALL;
                loadAllOption.textContent = "📋 Laad de hele lijst";
                select.appendChild(loadAllOption);

                select.addEventListener("change", () => {
                    if (select.value === LOAD_ALL) {
                        addEntireList(category);
                    } else if (select.value === "__ADD_DIVIDER__") {
                        addDivider(category);
                    } else if (select.value.startsWith(`${DIVIDER}:`)) {
                        const index = Number(select.value.split(":")[1]);
                        addDivider(category, index);
                    } else if (select.value) {
                        addItem(select.value, category);
                    }

                    select.selectedIndex = 0;
                });

                section.appendChild(select);
            }

            if (
                config.customInputPerCategory === true &&
                category !== "Elke dag" &&
                !textOnlyCategories.includes(category)
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


    // Optional button to clear the list.
    if (categoryContainer && config.clearListButton === true) {
        const clearButton = document.createElement("button");
        clearButton.type = "button";
        clearButton.className = "item-clear-list-button";
        clearButton.textContent = "Maak de hele lijst leeg";

        clearButton.addEventListener("click", () => {
            if (!items.length) return;

            if (!confirm("Weet je zeker dat je de hele lijst wilt leegmaken?")) {
                return;
            }

            items = [];
            saveItems();
            renderItems();
        });

        categoryContainer.appendChild(clearButton);
    }

    // Support pages using one shared custom-input form.
    const customForm = document.getElementById("item-custom-form");

    if (customForm && customCategory) {
        customForm.addEventListener("submit", event => {
            event.preventDefault();

            const input = document.getElementById("item-custom-input");

            if (input) {
                addItem(input.value, customCategory);
                input.value = "";
            }
        });
    }

    // Apply a colour to an item button.
    function applyItemColour(button, state) {
        button.classList.remove(
            "item-colour-1",
            "item-colour-2",
            "item-colour-3",
            "item-colour-4"
        );

        if (state > 0) {
            button.classList.add(`item-colour-${state}`);
        }
    }


    // Display items grouped by category.
    let suppressNextClick = false;

    function suppressClickBriefly() {
        suppressNextClick = true;

        setTimeout(() => {
            suppressNextClick = false;
        }, 500);
    }


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

            const heading = document.createElement("h3");
            heading.textContent = category;

            const buttons = document.createElement("div");
            buttons.className = "item-buttons";

            categoryItems.forEach(item => {
                const row = document.createElement("div");
                row.className = "item-row";
                row._item = item;

                const button = document.createElement("button");
                button.type = "button";
                button.className = "item-button";
                button.title = "Tik tweemaal om te verwijderen";

                if (item.type === "divider") {
                    button.classList.add("item-divider-button");

                    const line = document.createElement("hr");
                    button.appendChild(line);
                } else {
                    button.textContent = item.name;
                    applyItemColour(button, item.colourState);
                }

                let confirmRemoval = false;

                button.addEventListener("click", event => {
                    if (suppressNextClick) {
                        event.preventDefault();
                        return;
                    }

                    if (!confirmRemoval) {
                        confirmRemoval = true;
                        button.classList.add("confirm-removal");
                        return;
                    }

                    const index = items.indexOf(item);

                    if (index !== -1) {
                        items.splice(index, 1);
                        saveItems();
                        renderItems();
                    }
                });

                row.appendChild(button);
                buttons.appendChild(row);
            });

            group.append(heading, buttons);
            container.appendChild(group);
        });
    }

    // Make selected functions available to other item-list scripts.
    window.itemListTools = {
        getItems: () => items,
        saveItems,
        renderItems,
        applyItemColour,
        suppressClickBriefly
    };

    renderItems();

})();