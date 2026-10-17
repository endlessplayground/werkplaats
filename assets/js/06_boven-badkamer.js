
const klusjes = [
    "Badkamer 1",
    "Badkamer 2",
    "Badkamer 3"
];

const opslagKey = "tododiddone-permanent";
const lijst = document.getElementById("todo-list");

let opgeslagen = {};

try {
    opgeslagen = JSON.parse(localStorage.getItem(opslagKey)) || {};
} catch (error) {
    opgeslagen = {};
}

if (!Array.isArray(opgeslagen.open)) {
    opgeslagen = { open: [...klusjes] };
}

function bewaarTaken() {
    localStorage.setItem(opslagKey, JSON.stringify(opgeslagen));
}

function toonTaken() {
    lijst.innerHTML = "";

    opgeslagen.open.forEach((klus) => {
        const item = document.createElement("li");

        const klaarKnop = document.createElement("button");
        klaarKnop.type = "button";
        klaarKnop.className = "todo-done";
        klaarKnop.textContent = "✅";
        klaarKnop.setAttribute("aria-label", "Taak afgerond");

        klaarKnop.addEventListener("click", () => {
            opgeslagen.open = opgeslagen.open.filter(taak => taak !== klus);
            bewaarTaken();
            toonTaken();
        });

        const tekst = document.createElement("span");
        tekst.textContent = klus;

        item.append(klaarKnop, tekst);
        lijst.appendChild(item);
    });
}

document.getElementById("todo-reset").addEventListener("click", () => {
    opgeslagen.open = [...klusjes];
    bewaarTaken();
    toonTaken();
});

bewaarTaken();
toonTaken();
