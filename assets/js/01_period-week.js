
const klusjes = [
    "Koelkast",
    "Srtijkkamer",
    "Kleding zolder",
    "Nog iets",
    "Verzin wat",
];

const opslagKey = "tododiddone-weekly";
const startDatum = "2026-10-17";
const lijst = document.getElementById("todo-list");

function datumNummer(datum) {
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

// Start a new cycle every Monday, using the initial date as the anchor.
function weekCyclus(datum) {
    const dag = datumNummer(datum);
    const start = datumNummer(startDatum);
    const weekdag = new Date(dag * 86400000).getUTCDay();
    const maandag = dag - ((weekdag + 6) % 7);
    const startWeekdag = new Date(start * 86400000).getUTCDay();
    const startMaandag = start - ((startWeekdag + 6) % 7);

    return Math.floor((maandag - startMaandag) / 7);
}

const cyclus = weekCyclus(vandaag());

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
