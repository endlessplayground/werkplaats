const storageKey = document.currentScript.dataset.storageKey;
const pieces = document.querySelectorAll(".puzzle-piece");

function savePuzzle() {
    const states = {};

    pieces.forEach(piece => {
        states[piece.id] = {
            selected: piece.classList.contains("selected"),
            hidden: piece.classList.contains("hidden")
        };
    });

    localStorage.setItem(storageKey, JSON.stringify(states));
}

function loadPuzzle() {
    let states = {};

    try {
        states = JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {}

    pieces.forEach(piece => {
        const state = states[piece.id] || {};

        piece.classList.toggle("selected", !!state.selected);
        piece.classList.toggle("hidden", !!state.hidden);
    });
}

pieces.forEach(piece => {
    piece.addEventListener("click", () => {
        if (piece.classList.contains("hidden")) {
            piece.classList.remove("hidden", "selected");
        } else if (piece.classList.contains("selected")) {
            piece.classList.remove("selected");
            piece.classList.add("hidden");
        } else {
            piece.classList.add("selected");
        }

        savePuzzle();
    });
});

document.getElementById("reset-puzzle").addEventListener("click", () => {
    if (!confirm("Wil je de hele puzzel herstellen?")) return;

    localStorage.removeItem(storageKey);

    pieces.forEach(piece => {
        piece.classList.remove("selected", "hidden");
    });
});

loadPuzzle();
