
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
        const desired = Number(
            row.querySelector(".desired").textContent
        );
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
        category.addEventListener("click", () => {
            const collapse = !category.classList.contains("collapsed");
            let row = category.nextElementSibling;

            while (row && !row.classList.contains("pantry-category")) {
                row.hidden = collapse;
                row = row.nextElementSibling;
            }

            category.classList.toggle("collapsed", collapse);
        });
    });
})();
