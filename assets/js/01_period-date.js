(() => {
    const container = document.getElementById("period-date");
    if (!container) return;

    const period = container.dataset.period;
    const storageKey = `period-start-${period}`;

    const config = window.itemListConfig;
    const tools = window.itemListTools;

    function localDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function parseDate(value) {
        if (!value) return null;
        const [year, month, day] = value.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    function formatDate(date) {
        return date.toLocaleDateString("nl-NL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    function render() {
        let savedDate = localStorage.getItem(storageKey);

        if (!savedDate) {
            savedDate = localDateString(new Date());
            localStorage.setItem(storageKey, savedDate);
        }

        const start = parseDate(savedDate);
        const today = parseDate(localDateString(new Date()));

        const daysPassed = Math.round(
            (today - start) / 86400000
        );

        const dayNumber = daysPassed + 1;

        container.replaceChildren();

        const calendar = document.createElement("button");
        calendar.type = "button";
        calendar.textContent = "🗓️";
        calendar.setAttribute("aria-label", "Startdatum wijzigen");
        calendar.title = "Startdatum wijzigen";
        calendar.style.cssText =
            "border:0;background:none;cursor:pointer;font:inherit;padding:0 3px;";

        const label = document.createElement("span");
        label.textContent = " Gestart op ";

        const weekday = document.createElement("span");
        weekday.textContent = start.toLocaleDateString("nl-NL", {
            weekday: "short"
        });

        const dateText = document.createElement("strong");
        dateText.textContent = formatDate(start);

        const spacing = document.createTextNode("\u00A0\u00A0");

        const countdown = document.createElement("span");
        countdown.textContent = `(dag ${dayNumber})`;

        const input = document.createElement("input");
        input.type = "date";
        input.value = savedDate;
        input.hidden = true;
        input.setAttribute("aria-label", "Startdatum");

        calendar.addEventListener("click", () => {
            input.hidden = !input.hidden;

            if (!input.hidden) {
                if (typeof input.showPicker === "function") {
                    input.showPicker();
                } else {
                    input.focus();
                }
            }
        });

        input.addEventListener("change", () => {
            if (!input.value) return;

            localStorage.setItem(storageKey, input.value);
            render();
        });

        container.append(
            calendar,
            label,
            weekday,
            document.createTextNode(" "),
            dateText,
            spacing,
            countdown,
            input
        );
    }

    // Clear the task list when a new period starts.
    document.addEventListener("start-new-period", () => {
        if (!tools) {
            console.error("Item list tools are missing.");
            return;
        }

        const items = tools.getItems();
        items.length = 0;

        tools.saveItems();
        tools.renderItems();
    });

    // Create the button to start a new week or month.
    const categoryContainer = document.getElementById("item-categories");

    if (
        categoryContainer &&
        config?.newPeriodButton === true &&
        (period === "weekly" || period === "monthly")
    ) {
        const newPeriodButton = document.createElement("button");
        newPeriodButton.type = "button";
        newPeriodButton.className = "item-clear-list-button";
        newPeriodButton.textContent = period === "weekly"
            ? "Start nieuwe week"
            : "Start nieuwe maand";

        newPeriodButton.addEventListener("click", () => {
            const message = period === "weekly"
                ? "Een nieuwe week starten? De huidige lijst wordt leeggemaakt en de startdatum wordt vandaag."
                : "Een nieuwe maand starten? De huidige lijst wordt leeggemaakt en de startdatum wordt vandaag.";

            if (!confirm(message)) return;

            const today = localDateString(new Date());

            localStorage.setItem(storageKey, today);
            document.dispatchEvent(new Event("start-new-period"));
            document.dispatchEvent(new Event("period-date-updated"));
        });

        categoryContainer.appendChild(newPeriodButton);
    }

    render();

    document.addEventListener("period-date-updated", render);
})();
