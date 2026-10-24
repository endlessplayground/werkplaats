
(() => {
    const container = document.getElementById("period-date");
    if (!container) return;

    const period = container.dataset.period;
    const storageKey = `period-start-${period}`;

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

    function nextPeriod(start) {
        const next = new Date(start);

        if (period === "weekly") {
            next.setDate(next.getDate() + 7);
        } else {
            const day = next.getDate();
            next.setDate(1);
            next.setMonth(next.getMonth() + 1);

            const lastDay = new Date(
                next.getFullYear(),
                next.getMonth() + 1,
                0
            ).getDate();

            next.setDate(Math.min(day, lastDay));
        }

        return next;
    }

    function render() {
        let savedDate = localStorage.getItem(storageKey);

        if (!savedDate) {
            savedDate = localDateString(new Date());
            localStorage.setItem(storageKey, savedDate);
        }

        const start = parseDate(savedDate);
        const today = parseDate(localDateString(new Date()));
        let next = nextPeriod(start);

        while (next <= today) {
            next = nextPeriod(next);
        }

        const daysLeft = Math.round(
            (next - today) / 86400000
        );

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

        const dateText = document.createElement("strong");
        dateText.textContent = formatDate(start);

        const countdown = document.createElement("span");
        countdown.textContent =
            ` (nog ${daysLeft} ${daysLeft === 1 ? "dag" : "dagen"}…)`;

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
            dateText,
            countdown,
            input
        );
    }

    render();
})();
