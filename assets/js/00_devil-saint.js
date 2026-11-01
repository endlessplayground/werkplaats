(() => {
    const icon = document.querySelector(".devil-icon");
    if (!icon) return;

    const storageKey = "to-do-devil";

    function updateIcon() {
        let items = [];

        try {
            items = JSON.parse(localStorage.getItem(storageKey)) || [];
        } catch (error) {}

        const hasTasks = Array.isArray(items) && items.some(item => {
            const name = typeof item === "string" ? item : item?.name;
            return typeof name === "string" && !name.startsWith("- -");
        });

        icon.src = icon.src.replace(
            hasTasks ? "saint.svg" : "devil.svg",
            hasTasks ? "devil.svg" : "saint.svg"
        );

        icon.alt = hasTasks ? "To-do list met taken" : "To-do lijst leeg";
    }

    updateIcon();

    window.addEventListener("item-list-updated", updateIcon);
    window.addEventListener("storage", updateIcon);
})();