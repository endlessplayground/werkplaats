
const klusjes = [
    "Koffiemachine",
    "Bank",
    "Bed verschonen",
    "Nog een ding",
    "Extra taakje",
    "Etc.",
];

const opslagKey = "tododiddone-monthly";
const lijst = document.getElementById("todo-list");

function huidigeMaand() {
    const nu = new Date();
    return `${nu.getFullYear()}-${String(nu.getMonth() + 1).padStart(2, "0")}`;
}

const cyclus = huidigeMaand();

let opgeslagen = {};

try {
    opgeslagen = JSON.parse(localStorage.getItem(opslagKey)) || {};
} catch (error) {
    opgeslagen = {};
}

if (opgeslagen.cyclus !== cyclus || !Array.isArray(opgeslagen.open)) {
    opgeslagen = { cyclus, open: [...klusjes] };
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
        klaarKnop.setAttribute("aria-label", "Klus afgerond");

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
