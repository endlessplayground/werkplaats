
const categorieen = {
    "Groenten & fruit 1": [
        "Uien", "Knoflook", "Gember", "Peper"
    ],
    "Groenten & fruit 2": [
        "Paprika", "Lente-ui", "Witlof", "Broccoli", "Courgette", "Spitskool", "Pompoen"
    ],
    "Groenten & fruit 3": [
        "Aardappelen", "Koriander", "Basilicum", "Lente-ui", "Voorgesneden", "Rucola", "Champignons"
    ],
    "Vlees & eieren": [
        "Gehakt", "Kip", "Hamburger", "Rookworst", "Zalm", "Vis blik", "Eieren"
    ],
    "Blik & pot": [
        "Bliktomaten", "Tomatenpuree", "Pesto", "Jalapeño", "Artisjokken", "Bonen", "Mosterd",
    ],
    "Granen & noten": [
        "Pasta", "Rijst", "Wraps", "Walnoten", "Cashew", "Pistache", "Zonnebloempit", "Pompoenpit", "Pijnoompit"
    ],
    "Zuivel & vriezer": [
        "Sperziebonen", "Spinazie", "Bloemkool", "Zoete aardappel", "Rood fruit"
    ],
    "Rest": [
        "Koffie", "Koekjes", "Kattenvoer", "Toiletpapier", "Vuilniszak", "Handzeep"
    ]
};

const todoKey = "groc-super";
const namenCategorieen = Object.keys(categorieen);

function categorieVan(naam) {
    return namenCategorieen.find(
        categorie => categorieen[categorie].includes(naam)
    ) || "Rest";
}

let boodschappen = [];

try {
    const opgeslagen = JSON.parse(localStorage.getItem(todoKey)) || [];

    if (Array.isArray(opgeslagen)) {
        boodschappen = opgeslagen
            .filter(item => typeof item === "string" || (
                item && typeof item.name === "string"
            ))
            .map(item => typeof item === "string"
                ? { name: item, category: categorieVan(item) }
                : {
                    name: item.name,
                    category: namenCategorieen.includes(item.category)
                        ? item.category
                        : categorieVan(item.name)
                }
            )
            .filter(item => !item.name.startsWith("- -"));
    }
} catch (error) {
    boodschappen = [];
}

function bewaarBoodschappen() {
    localStorage.setItem(todoKey, JSON.stringify(boodschappen));
}

/* CATEGORIEËN OPBOUWEN */

const categorieGrid = document.getElementById("grocery-categories");

namenCategorieen.forEach(categorie => {
    const vak = document.createElement("section");
    vak.className = "grocery-category";

    const titel = document.createElement("h3");
    titel.textContent = categorie;

    const rij = document.createElement("div");
    rij.className = "grocery-select-row";

    const keuze = document.createElement("select");
    keuze.setAttribute("aria-label", categorie);

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Kies...";
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.hidden = true;
    keuze.appendChild(placeholder);

    categorieen[categorie].forEach(naam => {
        const optie = document.createElement("option");
        optie.value = naam;
        optie.textContent = naam;
        keuze.appendChild(optie);
    });

    const knop = document.createElement("button");
    knop.type = "button";
    knop.textContent = "+";
    knop.setAttribute("aria-label", "Voeg toe aan " + categorie);

    knop.addEventListener("click", () => {
        if (!keuze.value) return;

        boodschappen.push({
            name: keuze.value,
            category: categorie
        });

        keuze.value = "";
        bewaarBoodschappen();
        toonBoodschappen();
    });

    rij.append(keuze, knop);
    vak.append(titel, rij);
    categorieGrid.appendChild(vak);
});

/* EIGEN BOODSCHAP TOEVOEGEN */

document.getElementById("grocery-custom-form")
    .addEventListener("submit", event => {
        event.preventDefault();

        const invoer = document.getElementById("grocery-custom-input");
        const naam = invoer.value.trim();

        if (!naam) return;

        boodschappen.push({
            name: naam,
            category: "Rest"
        });

        invoer.value = "";
        bewaarBoodschappen();
        toonBoodschappen();
    });

/* BOODSCHAPPEN TONEN PER CATEGORIE */

function toonBoodschappen() {
    const lijst = document.getElementById("grocery-list");
    lijst.innerHTML = "";

    namenCategorieen.forEach(categorie => {
        const items = boodschappen.filter(
            item => item.category === categorie
        );

        if (items.length === 0) return;

        const groep = document.createElement("section");
        groep.className = "grocery-list-group";

        const titel = document.createElement("h3");
        titel.textContent = categorie;
        groep.appendChild(titel);

        const rij = document.createElement("div");
        rij.className = "grocery-items";

        items.forEach(item => {
            const knop = document.createElement("button");
            knop.type = "button";
            knop.className = "grocery-item";
            knop.textContent = item.name;
            knop.title = "Tik om te verwijderen";

            knop.addEventListener("click", () => {
                const index = boodschappen.indexOf(item);
                if (index !== -1) {
                    boodschappen.splice(index, 1);
                    bewaarBoodschappen();
                    toonBoodschappen();
                }
            });

            rij.appendChild(knop);
        });

        groep.appendChild(rij);
        lijst.appendChild(groep);
    });
}

toonBoodschappen();
