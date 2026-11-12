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

        if (items.some(item =>
            item.name === name && item.category === category
        )) return;

        items.push({ name, category, colourState: 0 });
        saveItems();
        renderItems();
    }

    function addDivider(category) {
    items.push({
        name: "",
        category,
        type: "divider",
        colourState: 0
    });

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
                dividerOption.textContent = "──────── Scheidingslijn ────────";
                select.appendChild(dividerOption);

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
                } else if (select.value === "__ADD_DIVIDER__") {
                    addDivider(category);
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
            "item-colour-3"
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


    // Gesture handling: drag, scroll and colour selection.
    let gestureMode = null;
    let pendingRow = null;
    let draggedRow = null;
    let activeButton = null;
    let activePointerId = null;

    let startX = 0;
    let startY = 0;
    let lastY = 0;

    let originalColourState = 0;
    let previewColourState = 0;

    let longPressTimer = null;
    let colourTimers = [];

    let scrollTarget = null;

    const listContainer = document.getElementById("item-list");


    function clearGestureTimers() {
        clearTimeout(longPressTimer);
        longPressTimer = null;

        colourTimers.forEach(timer => clearTimeout(timer));
        colourTimers = [];
    }


    function resetGesture() {
        clearGestureTimers();

        gestureMode = null;
        pendingRow = null;
        draggedRow = null;
        activeButton = null;
        activePointerId = null;
        scrollTarget = null;
    }


    function startColourPreview() {
        if (gestureMode !== "pending") return;

        gestureMode = "colour";
        previewColourState = 1;

        applyItemColour(activeButton, previewColourState);

        colourTimers.push(setTimeout(() => {
            if (gestureMode !== "colour") return;

            previewColourState = 2;
            applyItemColour(activeButton, previewColourState);
        }, 900));

        colourTimers.push(setTimeout(() => {
            if (gestureMode !== "colour") return;

            previewColourState = 3;
            applyItemColour(activeButton, previewColourState);
        }, 1900));

        colourTimers.push(setTimeout(() => {
            if (gestureMode !== "colour") return;

            previewColourState = 0;
            applyItemColour(activeButton, previewColourState);
        }, 2900));
    }


    // Find the page or nearest scrollable container.
    function findScrollTarget(element) {
        let parent = element.parentElement;

        while (
            parent &&
            parent !== document.body &&
            parent !== document.documentElement
        ) {
            const style = window.getComputedStyle(parent);

            if (
                /(auto|scroll)/.test(style.overflowY) &&
                parent.scrollHeight > parent.clientHeight
            ) {
                return parent;
            }

            parent = parent.parentElement;
        }

        return document.scrollingElement || document.documentElement;
    }


    function scrollPage(currentY) {
        if (!scrollTarget) return;

        scrollTarget.scrollTop += lastY - currentY;
        lastY = currentY;
    }


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
            if (item.category === category) {
                positions.push(index);
            }
        });

        positions.forEach((position, index) => {
            items[position] = reordered[index];
        });

        draggedRow.classList.remove("dragging");

        saveItems();
        renderItems();
    }


    if (listContainer) {

        listContainer.addEventListener("pointerdown", event => {
            if (event.button !== 0) return;
            if (gestureMode !== null) return;

            const button = event.target.closest(".item-button");
            if (!button) return;

            const row = button.closest(".item-row");
            if (!row) return;

            gestureMode = "pending";
            pendingRow = row;
            activeButton = button;
            activePointerId = event.pointerId;

            startX = event.clientX;
            startY = event.clientY;
            lastY = event.clientY;

            originalColourState = row._item.colourState;
            previewColourState = originalColourState;

            longPressTimer = setTimeout(startColourPreview, 600);
        });


        document.addEventListener("pointermove", event => {
            if (event.pointerId !== activePointerId) return;
            if (!gestureMode) return;

            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            const absX = Math.abs(dx);
            const absY = Math.abs(dy);
            const distance = Math.hypot(dx, dy);

            // A little movement cancels the long-press timer.
            if (gestureMode === "pending" && distance > 8) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }

            // Colour selection is cancelled if the finger moves.
            if (gestureMode === "colour" && distance > 8) {
                clearGestureTimers();
                applyItemColour(activeButton, originalColourState);
                gestureMode = "cancelled";
                return;
            }

            if (gestureMode === "pending") {

                if (event.pointerType === "touch") {

                    // Horizontal movement first: start dragging.
                    if (absX >= 12 && absX > absY * 1.2) {
                        gestureMode = "drag";
                        draggedRow = pendingRow;
                        pendingRow = null;

                        draggedRow.classList.add("dragging");
                        moveDraggedRow(event.clientX, event.clientY);
                        return;
                    }

                    // Vertical movement first: scroll the page.
                    if (absY >= 10 && absY > absX * 1.1) {
                        gestureMode = "scroll";
                        scrollTarget = findScrollTarget(activeButton);
                        scrollPage(event.clientY);
                        return;
                    }

                } else if (distance >= 5) {
                    // Normal mouse dragging.
                    gestureMode = "drag";
                    draggedRow = pendingRow;
                    pendingRow = null;

                    draggedRow.classList.add("dragging");
                    moveDraggedRow(event.clientX, event.clientY);
                    return;
                }
            }

            if (gestureMode === "drag") {
                event.preventDefault();
                moveDraggedRow(event.clientX, event.clientY);
            }

            if (gestureMode === "scroll") {
                event.preventDefault();
                scrollPage(event.clientY);
            }
        });


        document.addEventListener("pointerup", event => {
            if (event.pointerId !== activePointerId) return;

            const finishedMode = gestureMode;

            if (finishedMode === "drag") {
                finishDrag();
                suppressClickBriefly();

            } else if (finishedMode === "colour") {
                pendingRow._item.colourState = previewColourState;
                saveItems();
                suppressClickBriefly();
                renderItems();

            } else if (
                finishedMode === "scroll" ||
                finishedMode === "cancelled"
            ) {
                suppressClickBriefly();
            }

            resetGesture();
        });


        document.addEventListener("pointercancel", event => {
            if (event.pointerId !== activePointerId) return;

            const cancelledMode = gestureMode;

            if (cancelledMode === "colour") {
                applyItemColour(activeButton, originalColourState);
            }

            if (cancelledMode === "drag") {
                renderItems();
            }

            resetGesture();
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