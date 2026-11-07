
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

    window.dispatchEvent(new CustomEvent("item-list-updated", {
        detail: { storageKey }
    }));
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

            const heading = document.createElement("h3");
            heading.textContent = category;
            section.appendChild(heading);

            // Text-only categories get an input instead of a dropdown.
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

            // No dropdown for Rest.
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

            // Custom input for each category, when enabled.
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

    // Keep support for pages using one shared custom-input form.
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
                button.textContent = item.name;
                button.title = "Tik tweemaal om te verwijderen";

                let confirmRemoval = false;

                button.addEventListener("click", event => {
                    if (suppressNextClick) {
                        suppressNextClick = false;
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

    // Drag-and-drop reordering (mouse and touch).
    let draggedRow = null;
    let pendingRow = null;
    let startX = 0;
    let startY = 0;
    let suppressNextClick = false;
    let dragStarted = false;

    const listContainer = document.getElementById("item-list");

    if (listContainer) {

        listContainer.addEventListener("pointerdown", event => {
            const row = event.target.closest(".item-row");
            if (!row) return;

            pendingRow = row;
            startX = event.clientX;
            startY = event.clientY;
            dragStarted = false;
        });

        document.addEventListener("pointermove", event => {
            if (!pendingRow && !draggedRow) return;

            if (!draggedRow) {
                const distance = Math.hypot(
                    event.clientX - startX,
                    event.clientY - startY
                );

                if (distance < 6) return;

                draggedRow = pendingRow;
                pendingRow = null;
                dragStarted = true;
                draggedRow.classList.add("dragging");
            }

            const target = document.elementFromPoint(
                event.clientX,
                event.clientY
            );

            const targetRow = target?.closest(".item-row");

            if (
                !targetRow ||
                targetRow === draggedRow ||
                targetRow.parentElement !== draggedRow.parentElement
            ) return;

            const rect = targetRow.getBoundingClientRect();
            const after = event.clientY > rect.top + rect.height / 2;

            const buttons = draggedRow.parentElement;

            if (after) {
                buttons.insertBefore(draggedRow, targetRow.nextSibling);
            } else {
                buttons.insertBefore(draggedRow, targetRow);
            }
        });

        function finishDrag() {
            if (!draggedRow) {
                pendingRow = null;
                return;
            }

            const group = draggedRow.parentElement;
            const reordered = [...group.children].map(row => row._item);
            const category = reordered[0]?.category;

            const positions = [];

            items.forEach((item, index) => {
                if (item.category === category) {
                    positions.push(index);
                }
            });

            positions.forEach((position, index) => {
                items[position] = reordered[index];
            });

            draggedRow.classList.remove("dragging");
            draggedRow = null;
            pendingRow = null;

            suppressNextClick = true;
            setTimeout(() => {
                suppressNextClick = false;
            }, 400);

            saveItems();
            renderItems();
        }

        document.addEventListener("pointerup", finishDrag);
        document.addEventListener("pointercancel", finishDrag);
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
