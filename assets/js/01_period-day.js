
const klusjes = [
    "Planten water geven",
    "Mail checken",
    "Keukenvloer",
    "Kamervloer",
    "Badkamer",
    "Toilet",
    "Gang",
    "Kleding opruimen"
];

const opslagKey = "tododiddone-every-other-day";
const startDatum = "2026-10-17";
const lijst = document.getElementById("todo-list");

function dagNummer(datum) {
    const [jaar, maand, dag] = datum.split("-").map(Number);
    return Date.UTC(jaar, maand - 1, dag) / 86400000;
}

function vandaag() {
    const nu = new Date();
    return [
        nu.getFullYear(),
        String(nu.getMonth() + 1).padStart(2, "0"),
        String(nu.getDate()).padStart(2, "0")
    ].join("-");
}

const cyclus = Math.floor(
    (dagNummer(vandaag()) - dagNummer(startDatum)) / 2
);

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
            opgeslagen.open = opgeslagen.open.filter(
                taak => taak !== klus
            );
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
