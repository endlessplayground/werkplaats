
const workdays = [0, 1, 3]; // Sunday, Monday, Wednesday
const workCategory = "hotel";
const workPeriod = "morning";
const workDescription = "Hotel";

const eventsKey = "personal-calendar-events";
const exceptionsKey = "personal-calendar-workday-exceptions";
const calendarDays = 371;

const grid = document.getElementById("timeline-grid");

function dateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getStartOfCurrentWeek() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const dayOfWeek = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - dayOfWeek);

    return date;
}

function renderTimeline() {
    if (!grid) return;

    grid.innerHTML = "";

    const events = JSON.parse(
        localStorage.getItem(eventsKey) || "[]"
    );

    const exceptions = JSON.parse(
        localStorage.getItem(exceptionsKey) || "[]"
    );

    const startDate = getStartOfCurrentWeek();

    const allEvents = [...events];

    const date = new Date(startDate);

    for (let i = 0; i < calendarDays; i++) {
        const key = dateString(date);

        if (
            workdays.includes(date.getDay()) &&
            !exceptions.includes(key)
        ) {
            allEvents.push({
                id: `work-${key}`,
                date: key,
                category: workCategory,
                period: workPeriod,
                description: workDescription,
                recurring: true
            });
        }

        const day = document.createElement("div");
        day.className = "calendar-day timeline-day";

        if (key === dateString(new Date())) {
            day.classList.add("today");
        }

        const weekday = document.createElement("div");
        weekday.className = "timeline-weekday";
        weekday.textContent = date.toLocaleDateString("nl-NL", {
            weekday: "short"
        });

        day.appendChild(weekday);

        const dateLabel = document.createElement("div");
        dateLabel.className = "calendar-date";
        dateLabel.textContent = date.getDate();

        const monthLabel = document.createElement("span");
        monthLabel.textContent = date.toLocaleDateString("nl-NL", {
            month: "short"
        });

        dateLabel.appendChild(monthLabel);
        day.appendChild(dateLabel);

        ["morning", "afternoon", "evening"].forEach(period => {
            const slot = document.createElement("div");
            slot.className = "calendar-slot";

            const slotEvents = allEvents.filter(event =>
                event.date === key && event.period === period
            );

            const categories = [
                ...new Set(slotEvents.map(event => event.category))
            ];

            if (categories.length === 1) {
                slot.classList.add(categories[0]);
            }

            slotEvents.forEach(event => {
                const item = document.createElement("div");
                item.className = "calendar-event";
                item.textContent = event.description || "Afspraak";
                item.title = event.description || "Afspraak";

                if (event.recurring) {
                    item.title += " (terugkerende werkdag)";
                }

                slot.appendChild(item);
            });

            day.appendChild(slot);
        });

        grid.appendChild(day);
        date.setDate(date.getDate() + 1);
    }

    // Start at the current week.
    const today = grid.querySelector(".today");

    if (today) {
        today.scrollIntoView({
            block: "nearest",
            inline: "start"
        });
    }
}

renderTimeline();
