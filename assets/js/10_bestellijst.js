
const rubrieken = [
    [
        "Tlant Jam Aardbeien",
        "Tlant Jam Abrikoos",
        "Tlant Jam Bosvruchten",
        "Tlant pindakaas",
        "Tlant hazelnootpasta",
        "Tlant ahoornsiroop /maple sirop"
    ],
    [
        "Tlant granola wizzy walnut",
        "Tlant granola coconut",
        "Tlant granola cinnamon",
        "Tlant granola chocolate"
    ],
    [
        "Tlant cracker rosemarijn",
        "Tlant cracker tomaat",
        "Tlant cracker hazelnut",
        "Tlant cracker cinamon"
    ],
    [
        "Tlant Corn Flakes",
        "Tlant Toasted Oat",
        "Tlant Muesti Fruit",
        "Tlant Muesli Crunchy 4 Nuts",
        "Tlant Vanilla Loops",
        "Tlant Choco pops",
        "Tlant wafel cups (tippies)"
    ],
    [
        "Ontbijtkoek",
        "Beschuit",
        "Hagelslag puur",
        "Hagelslag melk"
    ],
    [
        "Hazelnoten wit",
        "Pompoenpitten",
        "Rozijnen",
        "Cranberries",
        "Walnoten"
    ],
    [
        "Mayonaise sticks",
        "Ketchup sticks",
        "Mosterd sticks",
        "Zeetzoutmolen",
        "Pepermolen"
    ],
    [
        "Jus d’orange Oranka",
        "Appelsap Oranka",
        "Cranberriesap Oranka",
        "Multuifruit Oranka"
    ],
    [
        "Verse Jus'd Orange",
        "Smoothie",
        "Munt",
        "Gember"
    ],
    [
        "Koffiebonen",
        "DE decafe koffiestick",
        "Nutroma cups valk",
        "Suikerstick VdV",
        "Sweetner VdV",
        "HoningsticksVdV",
        "Hotcemel"
    ],
    [
        "Melk Naarmann",
        "Alpro Havermelk",
        "Alpro Kokos"
    ],
    [
        "PuriTea-Ceylon Breakfast",
        "PuriTea-Ceylon Green",
        "PuriTea-Earl Grey",
        "PuriTea- Cherry Green",
        "PuriTea-Rooibos Honey",
        "PuriTea-Ginger Peach"
    ],
    [
        "Doos koffie koekjes",
        "Servet Ontbijt 1/8",
        "Servet Klein wit 24x24"
    ]
];

const opslagKey = "tododiddone-bestellijst";
const lijst = document.getElementById("order-list");

let opgeslagen = {};

try {
    opgeslagen =
        JSON.parse(localStorage.getItem(opslagKey)) || {};
} catch (error) {
    opgeslagen = {};
}

function bewaar() {
    localStorage.setItem(
        opslagKey,
        JSON.stringify(opgeslagen)
    );
}

function maakArtikel(artikel, rubriekIndex) {
    const item = document.createElement("li");
    item.className = "order-item";

    const gegevens = opgeslagen[artikel] || {
        magazijn: "",
        voorraad: "",
        klaar: false
    };

    const naam = document.createElement("span");
    naam.className = "order-name";
    naam.textContent = artikel;

    function maakInvoer(veld, omschrijving) {
        const invoer = document.createElement("input");
        invoer.type = "number";
        invoer.min = "0";
        invoer.step = "1";
        invoer.inputMode = "numeric";
        invoer.className = "order-input";
        invoer.value = gegevens[veld] ?? "";
        invoer.setAttribute(
            "aria-label",
            `${omschrijving}: ${artikel}`
        );

        invoer.addEventListener("input", () => {
            gegevens[veld] = invoer.value;
            opgeslagen[artikel] = gegevens;
            bereken();
            bewaar();
        });

        return invoer;
    }

    const magazijn = maakInvoer("magazijn", "In magazijn");
    const voorraad = maakInvoer("voorraad", "Voorraad nodig");

    const bestellen = document.createElement("span");
    bestellen.className = "order-amount";

    function bereken() {
        if (magazijn.value === "" || voorraad.value === "") {
            bestellen.textContent = "";
            return;
        }

        const aanwezig = Number(magazijn.value);
        const nodig = Number(voorraad.value);

        bestellen.textContent = Math.max(
            0,
            nodig - aanwezig
        );
    }

    const klaarKnop = document.createElement("button");
    klaarKnop.type = "button";
    klaarKnop.className = "order-status";
    klaarKnop.textContent = gegevens.klaar ? "✅" : "🔴";
    klaarKnop.setAttribute(
        "aria-label",
        gegevens.klaar
            ? "Weer markeren als te doen"
            : "Markeren als op papier genoteerd"
    );

    function toonStatus() {
        item.classList.toggle("order-complete", gegevens.klaar);
        klaarKnop.textContent = gegevens.klaar ? "✅" : "🔴";
        klaarKnop.setAttribute(
            "aria-label",
            gegevens.klaar
                ? "Weer markeren als te doen"
                : "Markeren als op papier genoteerd"
        );
    }

    klaarKnop.addEventListener("click", () => {
        gegevens.klaar = !gegevens.klaar;
        opgeslagen[artikel] = gegevens;
        toonStatus();
        bewaar();
    });

    item.append(
        naam,
        magazijn,
        voorraad,
        bestellen,
        klaarKnop
    );

    bereken();
    toonStatus();

    return item;
}

function toonLijst() {
    lijst.innerHTML = "";

    rubrieken.forEach((rubriek, index) => {
        rubriek.forEach((artikel, artikelIndex) => {
            const item = maakArtikel(artikel, index);

            if (artikelIndex === 0 && index > 0) {
                item.classList.add("order-group-start");
            }

            lijst.appendChild(item);
        });
    });
}

toonLijst();
