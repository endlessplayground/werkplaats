
(() => {
    const table = document.getElementById("pantry-table");
    if (!table) return;

    const storageKey = "pantry-quantities-v1";

    // Load previously saved quantities.
    let savedQuantities = {};

    try {
        savedQuantities = JSON.parse(
            localStorage.getItem(storageKey) || "{}"
        );
    } catch {
        savedQuantities = {};
    }

    const rows = table.querySelectorAll("tbody tr[data-product]");

    rows.forEach(row => {
        const productId = row.dataset.product;
        const desiredCell = row.querySelector(".desired");
        if (!desiredCell) return;

        const desired = Number(desiredCell.textContent);

        const input = row.querySelector("input");

        // Restore previously entered quantity.
        if (savedQuantities[productId] !== undefined) {
            input.value = savedQuantities[productId];
        }

        // Compare quantities and colour the cell.
        function updateColour() {
            const cell = input.closest("td");
            const available = input.value;

            cell.classList.remove(
                "quantity-low",
                "quantity-ok",
                "quantity-high"
            );

            if (available === "") return;

            const amount = Number(available);

            if (amount < desired) {
                cell.classList.add("quantity-low");
            } else if (amount > desired) {
                cell.classList.add("quantity-high");
            } else {
                cell.classList.add("quantity-ok");
            }
        }

        // Save every change.
        input.addEventListener("input", () => {
            if (input.value === "") {
                delete savedQuantities[productId];
            } else {
                savedQuantities[productId] = input.value;
            }

            localStorage.setItem(
                storageKey,
                JSON.stringify(savedQuantities)
            );

            updateColour();
        });

        // Restore colour on page load.
        updateColour();
    });
})();

 // Collapse and expand pantry categories.
(() => {
    const table = document.getElementById("pantry-table");
    if (!table) return;

    const categories = table.querySelectorAll("tr.pantry-category");

    categories.forEach(category => {
        category.classList.add("collapsed");

        let row = category.nextElementSibling;

        while (row && !row.classList.contains("pantry-category")) {
            row.hidden = true;
            row = row.nextElementSibling;
        }

        category.addEventListener("click", () => {
            const collapse = !category.classList.contains("collapsed");
            category.classList.toggle("collapsed", collapse);

            const rows = [];
            let row = category.nextElementSibling;

            while (row && !row.classList.contains("pantry-category")) {
                rows.push(row);
                row = row.nextElementSibling;
            }

            rows.forEach((currentRow, index) => {
                if (currentRow._pantryAnimation) {
                    currentRow._pantryAnimation.cancel();
                }

                const delay = collapse
                    ? (rows.length - 1 - index) * 15
                    : index * 8;

                if (collapse) {
                    currentRow._pantryAnimation = currentRow.animate(
                        [
                            { opacity: 1, transform: "translateY(0)" },
                            { opacity: 0, transform: "translateY(-6px)" }
                        ],
                        { duration: 320, delay, easing: "ease-in-out" }
                    );

                    currentRow._pantryAnimation.onfinish = () => {
                        if (category.classList.contains("collapsed")) {
                            currentRow.hidden = true;
                        }
                    };
                } else {
                    currentRow.hidden = false;

                    currentRow._pantryAnimation = currentRow.animate(
                        [
                            { opacity: 0, transform: "translateY(-6px)" },
                            { opacity: 1, transform: "translateY(0)" }
                        ],
                        { duration: 320, delay, easing: "ease-out" }
                    );
                }
            });
        });
    });
})();

// Transfer shortages to the shopping list.
(() => {
    const table = document.getElementById("pantry-table");
    const button = document.getElementById("transfer-pantry");

    if (!table || !button) return;

    const transferKey = "pantry-shopping-transfer-v1";

    button.addEventListener("click", () => {

        if (localStorage.getItem(transferKey)) {
            alert("Er staat nog een eerdere overdracht klaar. Open eerst de boodschappenlijst.");
            return;
        }

        const products = [];
        const rows = table.querySelectorAll("tbody tr[data-product]");

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const input = row.querySelector("input");
            const desiredCell = row.querySelector(".desired");

            if (!input || !desiredCell || input.value === "") return;

            const desired = Number(desiredCell.textContent);
            const available = Number(input.value);

            if (!Number.isFinite(desired) || !Number.isFinite(available)) return;

            const shortage = desired - available;

            if (shortage <= 0) return;

            products.push({
                name: cells[0].textContent.trim(),
                quantity: shortage,
                unit: cells[3].textContent.trim()
            });
        });

localStorage.setItem(transferKey, JSON.stringify(products));

            if (!products.length) {
                alert("Geen tekorten meer! Open de supermarktpagina om de voorraadartikelen bij te werken.");
            } else {
                alert(
                    products.length +
                    " producten klaargezet voor de boodschappenlijst. Open nu de supermarktpagina."
                );
            }
    });
})();