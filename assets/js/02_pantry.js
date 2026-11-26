
(() => {
    const table = document.getElementById("pantry-table");
    if (!table) return;

    const storageKey = "pantry-quantities-v1";

    // Load previously saved quantities.
    let savedQuantities = {};

    try {
        savedQuantities = JSON.parse(
            localStorage.getItem(storageKey) || "{}"
        );
    } catch {
        savedQuantities = {};
    }

    const rows = table.querySelectorAll("tbody tr[data-product]");

    rows.forEach(row => {
        const productId = row.dataset.product;
        const desiredCell = row.querySelector(".desired");
        if (!desiredCell) return;

        const desired = Number(desiredCell.textContent);

        const input = row.querySelector("input");

        // Restore previously entered quantity.
        if (savedQuantities[productId] !== undefined) {
            input.value = savedQuantities[productId];
        }

        // Compare quantities and colour the cell.
        function updateColour() {
            const cell = input.closest("td");
            const available = input.value;

            cell.classList.remove(
                "quantity-low",
                "quantity-ok",
                "quantity-high"
            );

            if (available === "") return;

            const amount = Number(available);

            if (amount < desired) {
                cell.classList.add("quantity-low");
            } else if (amount > desired) {
                cell.classList.add("quantity-high");
            } else {
                cell.classList.add("quantity-ok");
            }
        }

        // Save every change.
        input.addEventListener("input", () => {
            if (input.value === "") {
                delete savedQuantities[productId];
            } else {
                savedQuantities[productId] = input.value;
            }

            localStorage.setItem(
                storageKey,
                JSON.stringify(savedQuantities)
            );

            updateColour();
        });

        // Restore colour on page load.
        updateColour();
    });
})();

 // Collapse and expand pantry categories.
(() => {
    const table = document.getElementById("pantry-table");
    if (!table) return;

    const categories = table.querySelectorAll("tr.pantry-category");

    categories.forEach(category => {
        category.classList.add("collapsed");

        let row = category.nextElementSibling;

        while (row && !row.classList.contains("pantry-category")) {
            row.hidden = true;
            row = row.nextElementSibling;
        }

        category.addEventListener("click", () => {
            const collapse = !category.classList.contains("collapsed");
            category.classList.toggle("collapsed", collapse);

            const rows = [];
            let row = category.nextElementSibling;

            while (row && !row.classList.contains("pantry-category")) {
                rows.push(row);
                row = row.nextElementSibling;
            }

            rows.forEach((currentRow, index) => {
                if (currentRow._pantryAnimation) {
                    currentRow._pantryAnimation.cancel();
                }

                const delay = collapse
                    ? (rows.length - 1 - index) * 15
                    : index * 8;

                if (collapse) {
                    currentRow._pantryAnimation = currentRow.animate(
                        [
                            { opacity: 1, transform: "translateY(0)" },
                            { opacity: 0, transform: "translateY(-6px)" }
                        ],
                        { duration: 320, delay, easing: "ease-in-out" }
                    );

                    currentRow._pantryAnimation.onfinish = () => {
                        if (category.classList.contains("collapsed")) {
                            currentRow.hidden = true;
                        }
                    };
                } else {
                    currentRow.hidden = false;

                    currentRow._pantryAnimation = currentRow.animate(
                        [
                            { opacity: 0, transform: "translateY(-6px)" },
                            { opacity: 1, transform: "translateY(0)" }
                        ],
                        { duration: 320, delay, easing: "ease-out" }
                    );
                }
            });
        });
    });
})();

// Coloring table rows.

const productRijKleuren = [
  { producten: [
  "melk",
  "melk-m",
  "kwark",
  "karnemelk",
  "yoghurt",
  "crème-fraiche",
  "kip",
  "eieren",
], 
    kleur: "telkens"
  },

  { producten: [
  "brood",
  "uien",
  "knoflook",
  "gember",
  "peen-wortel",
  "pompoen",
  "aardappelen",
  "paprika-rood",
  "paprika-groen",
  "lente-ui",
  "witlof",
  "broccoli",
  "courgette",
  "spitskool",
  "chinese-kool",
  "zuurkool",
  "koriander",
  "basilicum",
  "voorgesneden",
  "rucola",
  "raapsteel",
  "snijbiet",
  "prei",
  "stamppotgroenten",
  "tomaten",
  "appels",
  "avocado",
  "hamburger",
  "zalm",
  "gehakt",
  "dressing",
  "gesn-groenten",
  ], 
kleur: "wekelijks"
  },

  {
    producten: [
  "citroen",
  "kaas",
  "sperziebonen",
  "spinazie",
  "bloemkool",
  "boter",
  "zoete-aardappel",
  "rood-fruit",
  "bliktomaten",
  "tomatenpuree",
  "pesto",
  "jalapeño",
  "sriracha",
  "mosterd",
  "mayonaise",
  "rookworst",
  "bonen",
  "witte-bonen",
  "kikkererwten",
  "sojamelk",
  "strooikaas",
  "balsamico",
  "ketjap",
  "sojasaus",
  "oestersaus",
  "sambal",
  "miso",
  "pindakaas",
  "tahin",
  "azijn",
  "olijfolie",
  "lijnzaadolie",
  "koffie",
  "koffiefilters",
  "pasta-penne",
  "pasta-fussili",
  "pasta-macaroni",
  "lasagne-vellen",
  "rijst",
  "linzen",
  "taco-chips",
  "wraps",
  "walnoten",
  "cashewnoten",
  "pecannoten",
  "pistache",
  "zonnebloempitten",
  "pompoenpitten",
  "pijnboompitten",
  "rijstvlokken",
  "havermout",
  "kattenvoer",
  "kattenbrokjes",
  "speculaas",
  "sprits",
  "koekjes-overig",
  "chocola-100",
  "chocola-85",
  "kamille",
  "toiletpapier",
  "quetiapine",
  "macrogol",
  "notenpasta",
  "masala-gestampt",
  "pepertje",
],
    kleur: "maandelijks"
  },
  {
    producten: [
  "handzeep",
  "afwasmiddel",
  "handschoenen",
  "vuilniszakken",
  "garam-masala-fijn",
  "garam-masala-grof",
  "peperkorrels",
  "paprika-poeder",
  "chilivlokken",
  "bouillon",
  "tandpasta",
  "tandenstokers",
  "oordopjes",
  "neusdruppels",
  "paracetamol",
  "saridon",
  "baking-soda",
  "vaseline",
  "artisjokken",
  "vis-blik",
  "chilivlokken",
  "peper",
  "roggemeel",
  "tarwe-speltmeel",
  "boekweitmeel",
  "rozijnen",
  "abrikozen",
  "brood-ekoplaza",
  "baking-soda-1",
  "baking-soda-2",
  "bulgur",
  "gierst",
  "noedels",
  "limoenblad",
  "santen"
],
    kleur: "heelsoms"
  }



].flatMap(groep =>
  groep.producten.map(product => ({
    product,
    kleur: groep.kleur
  }))
);

/*
 */





function pasProductRijKleurenToe() {
  productRijKleuren.forEach(item => {
    document.querySelectorAll(
      `tr[data-product="${item.product}"]`
    ).forEach(row => {
      row.classList.add(item.kleur);
    });
  });
}

pasProductRijKleurenToe();

// Transfer shortages to the shopping list.
(() => {
    const table = document.getElementById("pantry-table");
    const button = document.getElementById("transfer-pantry");

    if (!table || !button) return;

    const transferKey = "pantry-shopping-transfer-v1";

    button.addEventListener("click", () => {

        if (localStorage.getItem(transferKey)) {
            alert("Er staat nog een eerdere overdracht klaar. Open eerst de boodschappenlijst.");
            return;
        }

        const products = [];
        const rows = table.querySelectorAll("tbody tr[data-product]");

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const input = row.querySelector("input");
            const desiredCell = row.querySelector(".desired");

            if (!input || !desiredCell || input.value === "") return;

            const desired = Number(desiredCell.textContent);
            const available = Number(input.value);

            if (!Number.isFinite(desired) || !Number.isFinite(available)) return;

            const shortage = desired - available;

            if (shortage <= 0) return;

            products.push({
                name: cells[0].textContent.trim(),
                quantity: shortage,
                unit: cells[3].textContent.trim()
            });
        });

localStorage.setItem(transferKey, JSON.stringify(products));

            if (!products.length) {
                alert("Geen tekorten meer! Open de supermarktpagina om de voorraadartikelen bij te werken.");
            } else {
                alert(
                    products.length +
                    " producten klaargezet voor de boodschappenlijst. Open nu de supermarktpagina."
                );
            }
    });
})();

// Filter pantry table rows.

document.querySelectorAll(".pantry-filters button").forEach(button => {
  button.addEventListener("click", () => {

    const filter = button.dataset.filter;
    const rows = document.querySelectorAll("tbody tr");

    const reset = button.classList.contains("active");

    document.querySelectorAll(".pantry-filters button")
      .forEach(btn => btn.classList.remove("active"));

    if (!reset) {
      button.classList.add("active");
    }

    rows.forEach(row => {
      row.hidden = !reset && !row.classList.contains(filter);
    });

  });
});