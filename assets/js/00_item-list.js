
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
                        colourState: [0, 1, 2, 3].includes(item.colourState)
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

        // Prevent duplicates within the same category.
        if (items.some(item =>
            item.name === name && item.category === category
        )) return;

        items.push({ name, category, colourState: 0 });
        saveItems();
        renderItems();
    }


    function addEntireList(category) {
        categories[category].forEach(name => {
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

                // Restore the saved colour.
                if (item.colourState > 0) {
                    button.classList.add(
                        `item-colour-${item.colourState}`
                    );
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


    // Drag-and-drop and long-press colour changes.
    let draggedRow = null;
    let pendingRow = null;
    let startX = 0;
    let startY = 0;
    let dragTimer = null;
    let touchDragging = false;
    let touchLongPressReady = false;
    let touchStartTime = 0;
    let suppressNextClick = false;

    const listContainer = document.getElementById("item-list");


    function moveDraggedRow(x, y) {
        if (!draggedRow) return;

        const target = document.elementFromPoint(x, y);
        const targetRow = target?.closest(".item-row");

        if (
            !targetRow ||
            targetRow === draggedRow ||
            targetRow.parentElement !== draggedRow.parentElement
        ) return;

        const rect = targetRow.getBoundingClientRect();
        const after = y > rect.top + rect.height / 2;
        const buttons = draggedRow.parentElement;

        buttons.insertBefore(
            draggedRow,
            after ? targetRow.nextSibling : targetRow
        );
    }


    function finishDrag() {
        if (!draggedRow) return;

        const group = draggedRow.parentElement;
        const reordered = [...group.children].map(row => row._item);
        const category = reordered[0]?.category;

        const positions = [];

        items.forEach((item, index) => {
            if (item.category === category) positions.push(index);
        });

        positions.forEach((position, index) => {
            items[position] = reordered[index];
        });

        draggedRow.classList.remove("dragging");
        draggedRow = null;
        pendingRow = null;
        touchDragging = false;
        touchLongPressReady = false;

        suppressNextClick = true;

        saveItems();
        renderItems();

        setTimeout(() => {
            suppressNextClick = false;
        }, 500);
    }


    function cancelPendingDrag() {
        clearTimeout(dragTimer);
        pendingRow = null;
        touchLongPressReady = false;
    }


    // Change colour according to how long the finger was held.
    function changeItemColour(row, duration) {
        if (!row || !row._item) return;

        let newState;

        if (duration >= 3500) {
            newState = 0;
        } else if (duration >= 2500) {
            newState = 3;
        } else if (duration >= 1500) {
            newState = 2;
        } else {
            newState = 1;
        }

        row._item.colourState = newState;

        suppressNextClick = true;

        saveItems();
        renderItems();

        setTimeout(() => {
            suppressNextClick = false;
        }, 500);
    }


    if (listContainer) {

        // Mouse dragging.
        listContainer.addEventListener("pointerdown", event => {
            if (event.pointerType === "touch") return;

            pendingRow = event.target.closest(".item-row");
            if (!pendingRow) return;

            startX = event.clientX;
            startY = event.clientY;
        });


        document.addEventListener("pointermove", event => {
            if (!pendingRow && !draggedRow) return;

            if (!draggedRow) {
                if (Math.hypot(
                    event.clientX - startX,
                    event.clientY - startY
                ) < 6) return;

                draggedRow = pendingRow;
                pendingRow = null;
                draggedRow.classList.add("dragging");
            }

            moveDraggedRow(event.clientX, event.clientY);
        });


        document.addEventListener("pointerup", event => {
            if (event.pointerType === "touch") return;

            pendingRow = null;
            finishDrag();
        });


        // Touch: stationary long press changes colour.
        // Holding and then moving starts dragging.
        listContainer.addEventListener("touchstart", event => {
            if (event.touches.length !== 1) return;

            const row = event.target.closest(".item-row");
            if (!row) return;

            const touch = event.touches[0];

            startX = touch.clientX;
            startY = touch.clientY;
            touchStartTime = Date.now();

            touchLongPressReady = false;

            clearTimeout(dragTimer);
            pendingRow = row;

            // After 500 ms, movement can initiate dragging.
            dragTimer = setTimeout(() => {
                if (pendingRow !== row) return;
                touchLongPressReady = true;
            }, 500);

        }, { passive: true });


        document.addEventListener("touchmove", event => {
            if (!event.touches.length) return;

            const touch = event.touches[0];

            if (!pendingRow && !draggedRow) return;

            if (!touchLongPressReady && !touchDragging) {
                if (Math.hypot(
                    touch.clientX - startX,
                    touch.clientY - startY
                ) > 10) {
                    cancelPendingDrag();
                }

                return;
            }

            // After the long press, movement starts dragging.
            if (touchLongPressReady && pendingRow && !touchDragging) {
                if (Math.hypot(
                    touch.clientX - startX,
                    touch.clientY - startY
                ) > 10) {
                    draggedRow = pendingRow;
                    pendingRow = null;
                    touchDragging = true;
                    draggedRow.classList.add("dragging");
                }
            }

            if (!touchDragging) return;

            event.preventDefault();
            moveDraggedRow(touch.clientX, touch.clientY);

        }, { passive: false });


        document.addEventListener("touchend", () => {
            clearTimeout(dragTimer);

            if (touchDragging) {
                finishDrag();

            } else if (pendingRow) {
                const duration = Date.now() - touchStartTime;

                if (duration >= 600) {
                    changeItemColour(pendingRow, duration);
                } else {
                    pendingRow = null;
                }
            }

            touchLongPressReady = false;
        });


        document.addEventListener("touchcancel", () => {
            clearTimeout(dragTimer);

            if (draggedRow) {
                draggedRow.classList.remove("dragging");
                draggedRow = null;
            }

            pendingRow = null;
            touchDragging = false;
            touchLongPressReady = false;
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
