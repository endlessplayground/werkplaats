/* =================================
   STANDAARDKLUSSEN
   Voeg hier zelf taken toe of pas ze aan.
   ================================= */

const standaardTaken = [
    "Afwassen",
    "Keuken schoonmaken",
    "Douchen",
    "Planten water",
    "Mail checken",
    "Badkamer schoonmaken",
    "Was ophangen",
    "Was afhalen",
    "Was opvouwen",
    "Bloezen strijken",
    "Bloezen in de week zetten",
    "Tas werk klaarmaken",
    "Ontbijt werk klaarmaken",
    "Brooddeeg prepareren",
    "Avondeten voorbereiden",
    "Groente snijden",
    "Boodschappen halen",
    "Markt",
    "WhatsAppjes beantwoorden",
    "Administratie",
    "Post openmaken",
    "Bed verschonen",
];


/* =================================
   OPSLAG
   ================================= */

const todoKey = "tododiddone-daily";

let taken = [];

try {
    const opgeslagen = localStorage.getItem(todoKey);
    taken = opgeslagen ? JSON.parse(opgeslagen) : [];

    if (!Array.isArray(taken)) {
        taken = [];
    }
} catch (error) {
    taken = [];
}

function bewaarTaken() {
    localStorage.setItem(todoKey, JSON.stringify(taken));
}


/* =================================
   ELEMENTEN
   ================================= */

const keuze = document.getElementById("todo-choice");
const voorraadKnop = document.getElementById("todo-add-stock");
const formulier = document.getElementById("todo-form");
const invoer = document.getElementById("todo-input");
const lijst = document.getElementById("todo-list");


/* =================================
   STANDAARDTAKEN TONEN
   ================================= */

standaardTaken.forEach((taak) => {
    const optie = document.createElement("option");
    optie.value = taak;
    optie.textContent = taak;
    keuze.appendChild(optie);
});



/* =================================
   TAAK TOEVOEGEN
   ================================= */

function voegTaakToe(taak) {
    taak = taak.trim();

    if (!taak) return;

    taken.push(taak);
    bewaarTaken();
    toonTaken();
}

voorraadKnop.addEventListener("click", () => {
    voegTaakToe(keuze.value);
    keuze.value = "";
});

formulier.addEventListener("submit", (event) => {
    event.preventDefault();

    voegTaakToe(invoer.value);
    invoer.value = "";
    invoer.focus();
});


/* =================================
   LIJST TONEN
   ================================= */

function toonTaken() {
    lijst.innerHTML = "";

    taken.forEach((taak, index) => {
        const item = document.createElement("li");

        const klaarKnop = document.createElement("button");
        klaarKnop.type = "button";
        klaarKnop.className = "todo-done";
        klaarKnop.textContent = "✅";
        klaarKnop.setAttribute(
            "aria-label",
            "Verwijder afgerond klusje"
        );

        klaarKnop.addEventListener("click", () => {
            taken.splice(index, 1);
            bewaarTaken();
            toonTaken();
        });

        const tekst = document.createElement("span");
        tekst.textContent = taak;

        item.append(klaarKnop, tekst);
        lijst.appendChild(item);
    });
}


/* =================================
   START
   ================================= */
console.log("Loaded daily script:", standaardTaken);
toonTaken();
