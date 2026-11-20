(() => {
    const table = document.getElementById("pantry-table");
    if (!table) return;

    const storageKey = "pantry-shopping";

    // Restore saved selections.
    const savedRows = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );

    const selected = new Set(savedRows);

    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const productId = row.dataset.product;

        if (!productId) return;

        // Restore highlight.
        row.classList.toggle(
            "needs-shopping",
            selected.has(productId)
        );

        // Toggle highlight on click.
        row.addEventListener("click", () => {
            if (selected.has(productId)) {
                selected.delete(productId);
            } else {
                selected.add(productId);
            }

            row.classList.toggle(
                "needs-shopping",
                selected.has(productId)
            );

            localStorage.setItem(
                storageKey,
                JSON.stringify([...selected])
            );
        });
    });
})();
