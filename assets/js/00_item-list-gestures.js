
(() => {
    // Get the functions and data shared by the main item-list script.
    const tools = window.itemListTools;

    if (!tools) {
        console.error("Item list tools are missing.");
        return;
    }

    const getItems = tools.getItems;
    const saveItems = tools.saveItems;
    const renderItems = tools.renderItems;
    const applyItemColour = tools.applyItemColour;
    const suppressClickBriefly = tools.suppressClickBriefly;

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

            previewColourState = 4;
            applyItemColour(activeButton, previewColourState);
        }, 2900));

        colourTimers.push(setTimeout(() => {
            if (gestureMode !== "colour") return;

            previewColourState = 0;
            applyItemColour(activeButton, previewColourState);
        }, 3900));
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

        // Get the current items, not an old copy.
        const items = getItems();

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

})();
