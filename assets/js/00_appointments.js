
(() => {
    const STORAGE_KEY = "personal-appointments-v1";
    const FILTER_KEY = "personal-appointments-selected-categories-v1";
    const DISMISSED_KEY = "personal-appointments-notice-dismissed-date-v1";
    const DEFAULT_CATEGORIES = ["Van der Valk", "HS ?", "HS Leiden", "HS Rotterdam", "Privé", "Zorg", "Overig"];

    const todayKey = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return dateToKey(date);
    };

    function dateToKey(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    function keyToDate(key) {
        const [year, month, day] = key.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    let appointments = readArray(STORAGE_KEY);
    let selectedCategories = readArray(FILTER_KEY);
    let filterHasBeenSaved = localStorage.getItem(FILTER_KEY) !== null;
    let editingId = null;

    const page = document.getElementById("appointments-page");
    const form = document.getElementById("appointment-form");
    const dateInput = document.getElementById("appointment-date");
    const timeInput = document.getElementById("appointment-time");
    const endTimeInput = document.getElementById("appointment-end-time");
    const categoryInput = document.getElementById("appointment-category");
    const titleInput = document.getElementById("appointment-title");
    const detailsInput = document.getElementById("appointment-details");
    const saveButton = document.getElementById("appointment-save");
    const cancelButton = document.getElementById("appointment-cancel");
    const list = document.getElementById("appointment-list");
    const filters = document.getElementById("appointment-category-filters");
    const noticeRoot = document.getElementById("appointment-notice-root");

    function saveAppointments() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }

function allCategories() {
    return [...new Set([
        ...DEFAULT_CATEGORIES,
        ...appointments.map(item => item.category).filter(Boolean)
    ])];
}

    function isCategorySelected(category) {
        return !filterHasBeenSaved || selectedCategories.includes(category);
    }

    function visibleAppointments() {
        const today = todayKey();

        return appointments
            .filter(item => item.date >= today && isCategorySelected(item.category))
            .sort((a, b) =>
                a.date.localeCompare(b.date) ||
                (a.time || "99:99").localeCompare(b.time || "99:99") ||
                a.title.localeCompare(b.title, "nl")
            );
    }

    function formatDay(dateKey) {
        if (dateKey === todayKey()) return "Vandaag";

        const tomorrow = keyToDate(todayKey());
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (dateKey === dateToKey(tomorrow)) return "Morgen";

        const date = keyToDate(dateKey);
        const weekday = date.toLocaleDateString("nl-NL", { weekday: "short" }).replace(".", "");
        const day = date.getDate();
        const month = date.toLocaleDateString("nl-NL", { month: "short" }).replace(".", "");

        return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${day} ${month}`;
    }


function makeAppointmentContent(container, item) {
    const entry = document.createElement("article");
    entry.className = "appointment-entry";

    const title = document.createElement("h5");
    title.textContent = item.title;
    entry.appendChild(title);

    if (item.details) {
        const details = document.createElement("p");
        details.textContent = item.details;
        entry.appendChild(details);
    }

    container.appendChild(entry);
}

function makeAppointmentControls(item) {
    const controls = document.createElement("div");
    controls.className = "appointment-entry-controls";

    const edit = document.createElement("button");
    edit.type = "button";

    edit.textContent = "";
    const editImg = document.createElement("img");
    editImg.src = document.getElementById("appointments-page").dataset.editIcon;
    editImg.alt = "";

edit.appendChild(editImg);
    edit.setAttribute("aria-label", `Wijzig: ${item.title}`);
    edit.addEventListener("click", () => startEditing(item));

    const remove = document.createElement("button");
    remove.type = "button";

    remove.textContent = "";
    const removeImg = document.createElement("img");
    removeImg.src = document.getElementById("appointments-page").dataset.deleteIcon;
    removeImg.alt = "";
    remove.appendChild(removeImg);

    remove.setAttribute("aria-label", `Verwijder: ${item.title}`);
    remove.addEventListener("click", () => {
        appointments = appointments.filter(saved => saved.id !== item.id);
        saveAppointments();
        renderAll();
    });

    controls.append(edit, remove);
    return controls;
}

    function renderFilters() {
        if (!filters) return;

        filters.innerHTML = "";

        allCategories().forEach(category => {
            const label = document.createElement("label");
            label.className = "appointment-filter-option";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isCategorySelected(category);

            checkbox.addEventListener("change", () => {
                if (!filterHasBeenSaved) {
                    selectedCategories = allCategories();
                    filterHasBeenSaved = true;
                }

                if (checkbox.checked && !selectedCategories.includes(category)) {
                    selectedCategories.push(category);
                } else if (!checkbox.checked) {
                    selectedCategories = selectedCategories.filter(value => value !== category);
                }

                localStorage.setItem(FILTER_KEY, JSON.stringify(selectedCategories));
                renderAll();
            });

            label.append(checkbox, document.createTextNode(` ${category}`));
            filters.appendChild(label);
        });
    }


function renderAppointmentList() {
    if (!list) return;

    list.innerHTML = "";
    const visible = visibleAppointments();

    if (!visible.length) {
        const empty = document.createElement("p");
        empty.className = "appointments-empty";
        empty.textContent = "Geen komende afspraken in de geselecteerde categorieën.";
        list.appendChild(empty);
        return;
    }

    visible.forEach(item => {
        const appointmentFrame = document.createElement("section");
        appointmentFrame.className = "appointment-day-frame";

        if (item.date === todayKey()) {
            appointmentFrame.classList.add("appointment-day-today");
        }

        const header = document.createElement("div");
        header.className = "appointment-day-header";

        const dayHeading = document.createElement("h4");
        dayHeading.textContent = formatDay(item.date);

if (item.time || item.endTime) {
    const time = document.createElement("span");
    time.className = "time";

    time.textContent = item.time && item.endTime
        ? `${item.time} - ${item.endTime}`
        : item.time || item.endTime;

    dayHeading.appendChild(time);
}

        header.appendChild(dayHeading);

        if (page) {
            header.appendChild(makeAppointmentControls(item));
        }

        appointmentFrame.appendChild(header);
        makeAppointmentContent(appointmentFrame, item);

        list.appendChild(appointmentFrame);
    });
}


    function resetForm() {
        if (!form) return;

        form.reset();
        editingId = null;
        saveButton.textContent = "Toevoegen";
        cancelButton.hidden = true;
    }

    function startEditing(item) {
        editingId = item.id;
        dateInput.value = item.date;
        timeInput.value = item.time || "";
        endTimeInput.value = item.endTime || "";
        categoryInput.value = item.category || "Other";
        titleInput.value = item.title || "";
        detailsInput.value = item.details || "";
        saveButton.textContent = "Opslaan";
        cancelButton.hidden = false;

        form.scrollIntoView({ behavior: "smooth", block: "start" });

        document.getElementById("hidden").hidden = false;
        document.getElementById("appointment-title").focus();
    }

function handleSubmit(event) {
    event.preventDefault();

    const category = categoryInput.value.trim();
    const title = titleInput.value.trim();

    if (!dateInput.value || !category || !title) return;

    const item = {
        id: editingId || `appointment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: dateInput.value,
        time: timeInput.value,
        endTime: endTimeInput.value,
        category,
        title,
        details: detailsInput.value.trim()
    };

    if (editingId) {
        appointments = appointments.map(saved => saved.id === editingId ? item : saved);
    } else {
        appointments.push(item);
    }

    if (filterHasBeenSaved && !selectedCategories.includes(category)) {
        selectedCategories.push(category);
        localStorage.setItem(FILTER_KEY, JSON.stringify(selectedCategories));
    }

    saveAppointments();
    resetForm();
    renderAll();
}

    function renderLandingNotice() {
        if (!noticeRoot) return;

        noticeRoot.innerHTML = "";
        const today = todayKey();

        if (localStorage.getItem(DISMISSED_KEY) === today) return;

        const lastDay = keyToDate(today);
        lastDay.setDate(lastDay.getDate() + 6);

        const upcoming = visibleAppointments().filter(item => item.date <= dateToKey(lastDay));
        if (!upcoming.length) return;

        const outer = document.createElement("section");
        outer.className = "appointment-notice";
        outer.setAttribute("aria-label", "Afspraken deze week");

        const close = document.createElement("button");
        close.type = "button";
        close.className = "appointment-notice-close";
        close.textContent = "×";
        close.setAttribute("aria-label", "Afsprakenvenster sluiten voor vandaag");

        close.addEventListener("click", () => {
            localStorage.setItem(DISMISSED_KEY, today);
            outer.remove();
        });

        outer.appendChild(close);

        const heading = document.createElement("h4");
        heading.textContent = "Afspraken";
        outer.appendChild(heading);

        const grouped = new Map();

        upcoming.forEach(item => {
            if (!grouped.has(item.date)) grouped.set(item.date, []);
            grouped.get(item.date).push(item);
        });

        grouped.forEach((items, dateKey) => {
            const dayFrame = document.createElement("section");
            dayFrame.className = "appointment-notice-day";

            if (dateKey === today) {
                dayFrame.classList.add("appointment-notice-today");
            }

const dayHeading = document.createElement("h4");
dayHeading.textContent = formatDay(dateKey);

const times = items.map(item => item.time).filter(Boolean);
if (times.length) {
    const time = document.createElement("span");
    time.className = "time";
    time.textContent = times.join(", ");
    dayHeading.appendChild(time);
}

dayFrame.appendChild(dayHeading);

            items.forEach(item => makeAppointmentContent(dayFrame, item));
            outer.appendChild(dayFrame);
        });

        noticeRoot.appendChild(outer);
    }

    function renderAll() {
        renderFilters();
        renderAppointmentList();
        renderLandingNotice();
    }

    if (form) form.addEventListener("submit", handleSubmit);
    if (cancelButton) cancelButton.addEventListener("click", resetForm);

    let lastRenderedDate = todayKey();
    renderAll();

    window.setInterval(() => {
        const currentDate = todayKey();

        if (currentDate !== lastRenderedDate) {
            lastRenderedDate = currentDate;
            renderAll();
        }
    }, 60_000);
})();
