
const workdays = [0, 1, 3]; // Sunday, Monday, Wednesday
const workDescription = "Hotel";
const workPeriod = "morning";
const workCategory = "hotel";

const eventsKey = "personal-calendar-events";
const exceptionsKey = "personal-calendar-workday-exceptions";

const grid = document.getElementById("calendar-grid");
const form = document.getElementById("calendar-form");
const dateInput = document.getElementById("event-date");
const categoryInput = document.getElementById("event-category");
const periodInput = document.getElementById("event-period");
const descriptionInput = document.getElementById("event-description");
const formTitle = document.getElementById("calendar-form-title");
const saveButton = document.getElementById("calendar-save");

let events = JSON.parse(localStorage.getItem(eventsKey) || "[]");
let exceptions = JSON.parse(localStorage.getItem(exceptionsKey) || "[]");
let editingId = null;
let editingRecurringDate = null;

function saveEvents() {
    localStorage.setItem(eventsKey, JSON.stringify(events));
}

function saveExceptions() {
    localStorage.setItem(exceptionsKey, JSON.stringify(exceptions));
}

function dateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getRecurringEvents(startDate) {
    const recurring = [];
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < 35; i++) {
        const key = dateString(date);

        if (
            workdays.includes(date.getDay()) &&
            !exceptions.includes(key)
        ) {
            recurring.push({
                id: `work-${key}`,
                date: key,
                category: workCategory,
                period: workPeriod,
                description: workDescription,
                recurring: true
            });
        }

        date.setDate(date.getDate() + 1);
    }

    return recurring;
}

function renderCalendar() {
    grid.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    const dayOfWeek = (startDate.getDay() + 6) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const allEvents = [
        ...getRecurringEvents(startDate),
        ...events
    ];

    const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

    weekdays.forEach(day => {
        const heading = document.createElement("div");
        heading.className = "calendar-weekday";
        heading.textContent = day;
        grid.appendChild(heading);
    });

    for (let i = 0; i < 35; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const key = dateString(date);
        const day = document.createElement("div");
        day.className = "calendar-day";

        if (date.getTime() === today.getTime()) {
            day.classList.add("today");
        }

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

            const categories = [...new Set(
                slotEvents.map(event => event.category)
            )];

            if (categories.length === 1) {
                slot.classList.add(categories[0]);
            }

            slotEvents.forEach(event => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "calendar-event";
                button.textContent = event.description || "Afspraak";
                button.title = event.description || "Afspraak";

                if (event.recurring) {
                    button.title += " (terugkerende werkdag)";
                }

                button.addEventListener("click", () => editEvent(event));
                slot.appendChild(button);
            });

            day.appendChild(slot);
        });

        grid.appendChild(day);
    }
}

function editEvent(event) {
    editingId = event.recurring ? null : event.id;
    editingRecurringDate = event.recurring ? event.date : null;

    dateInput.value = event.date;
    categoryInput.value = event.category;
    periodInput.value = event.period;
    descriptionInput.value = event.description;

    formTitle.textContent = event.recurring
        ? "Hotelshift aanpassen"
        : "Afspraak aanpassen";

    saveButton.textContent = "Opslaan";

    let deleteButton = document.getElementById("calendar-delete");

    if (!deleteButton) {
        deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.id = "calendar-delete";
        deleteButton.className = "calendar-delete";
        deleteButton.textContent = "Verwijderen";
        document.querySelector(".calendar-form-buttons")
            .appendChild(deleteButton);
    }

    deleteButton.hidden = false;
    deleteButton.onclick = deleteCurrentEvent;

    form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
    form.reset();
    editingId = null;
    editingRecurringDate = null;

    formTitle.textContent = "Afspraak toevoegen";
    saveButton.textContent = "Toevoegen";

    const deleteButton = document.getElementById("calendar-delete");
    if (deleteButton) deleteButton.hidden = true;
}

function deleteCurrentEvent() {
    if (editingRecurringDate) {
        if (!exceptions.includes(editingRecurringDate)) {
            exceptions.push(editingRecurringDate);
            saveExceptions();
        }
    } else if (editingId !== null) {
        events = events.filter(event => event.id !== editingId);
        saveEvents();
    }

    resetForm();
    renderCalendar();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    if (!dateInput.value) return;

    const appointment = {
        id: editingId || `event-${Date.now()}`,
        date: dateInput.value,
        category: categoryInput.value,
        period: periodInput.value,
        description: descriptionInput.value.trim()
    };

    if (editingRecurringDate) {
        if (!exceptions.includes(editingRecurringDate)) {
            exceptions.push(editingRecurringDate);
            saveExceptions();
        }

        events.push(appointment);
    } else if (editingId !== null) {
        events = events.map(event =>
            event.id === editingId ? appointment : event
        );
    } else {
        events.push(appointment);
    }

    saveEvents();
    resetForm();
    renderCalendar();
});

renderCalendar();
