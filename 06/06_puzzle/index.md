---
layout: default
title: Puzzel
submenu: order
category: order
---

<style>
main {
  flex: 1;
  padding: 18px 0px 80px 0px;
}

.puzzle {
    display: grid;
    width: 357px;
    height: 416px;
    grid-template-columns: repeat(7, 50.4px);
    gap: 0;
    margin: 0 auto;
    padding: 0;
    border-right: 2px solid rgba(208, 224, 195, 0.6);
    border-bottom: 2px solid rgba(154, 183, 174, 0.32);
    border-left: 2px solid  rgba(235, 244, 225, 0.9);
    border-top: 2px solid rgba(235, 244, 225, 0.9);
    transform: scale(0.99);
    background-image: url("{{ '/assets/images/interior.png' | relative_url }}");
    background-size: cover;
    background-position: center;
}

.puzzle-piece {
    display: block;
    width: 84px;
    height: auto;
    margin: -16.8px;
    padding: 0;
    border: 0;
}

.puzzle-piece {
    cursor: pointer;
    transition: filter 0.2s ease, opacity 0.2s ease;
}

.puzzle-piece.selected {
    filter: hue-rotate(120deg);
}

.puzzle-piece.hidden {
    opacity: 0;
}

.row {
    display: flex;
    flex-direction: row;
    height: 40px;
    background: aqua;
    align-items: center;
    justify-content: center;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    margin: 0 0 0 10px;
    border-radius: 50%;
    background: var(--green-darker);
}

button img {
    width: 28px;
}




/* Example: rotate a specific piece */

</style>

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Zolder<button id="reset-puzzle" type="button"><img src="{{ '/assets/images/reload.svg' | relative_url }}"></button></h2> 

<!--1-->
<div class="puzzle">
    <img id="piece-01" class="puzzle-piece" src="{{ '/assets/images/jigsaw_lb.svg' | relative_url }}">
    <img id="piece-02" class="puzzle-piece" src="{{ '/assets/images/jigsaw_b2.svg' | relative_url }}">
    <img id="piece-03" class="puzzle-piece" src="{{ '/assets/images/jigsaw_b1.svg' | relative_url }}">
    <img id="piece-04" class="puzzle-piece" src="{{ '/assets/images/jigsaw_b2.svg' | relative_url }}">
    <img id="piece-05" class="puzzle-piece" src="{{ '/assets/images/jigsaw_b1.svg' | relative_url }}">
    <img id="piece-06" class="puzzle-piece" src="{{ '/assets/images/jigsaw_b2.svg' | relative_url }}">
    <img id="piece-07" class="puzzle-piece" src="{{ '/assets/images/jigsaw_rb.svg' | relative_url }}">

<!--2-->
<img id="piece-08" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l1.svg' | relative_url }}">
    <img id="piece-09" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-10" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-11" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-12" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-13" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-14" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r1.svg' | relative_url }}">

<!--3-->
<img id="piece-15" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l2.svg' | relative_url }}">
    <img id="piece-16" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-17" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-18" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-19" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-20" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-21" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r2.svg' | relative_url }}">

<!--4-->
<img id="piece-22" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l1.svg' | relative_url }}">
    <img id="piece-23" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-24" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-25" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-26" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-27" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-28" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r1.svg' | relative_url }}">

<!--5-->
<img id="piece-29" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l2.svg' | relative_url }}">
    <img id="piece-30" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-31" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-32" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-33" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-34" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-35" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r2.svg' | relative_url }}">

<!--6-->
<img id="piece-36" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l1.svg' | relative_url }}">
    <img id="piece-37" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-38" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-39" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-40" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-41" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-42" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r1.svg' | relative_url }}">

<!--5-->
<img id="piece-43" class="puzzle-piece" src="{{ '/assets/images/jigsaw_l2.svg' | relative_url }}">
    <img id="piece-44" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-45" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-46" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-47" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m2.svg' | relative_url }}">
    <img id="piece-48" class="puzzle-piece" src="{{ '/assets/images/jigsaw_m1.svg' | relative_url }}">
    <img id="piece-49" class="puzzle-piece" src="{{ '/assets/images/jigsaw_r2.svg' | relative_url }}">

<!--9-->
<img id="piece-50" class="puzzle-piece" src="{{ '/assets/images/jigsaw_lo.svg' | relative_url }}">
    <img id="piece-51" class="puzzle-piece" src="{{ '/assets/images/jigsaw_o1.svg' | relative_url }}">
    <img id="piece-52" class="puzzle-piece" src="{{ '/assets/images/jigsaw_o2.svg' | relative_url }}">
    <img id="piece-53" class="puzzle-piece" src="{{ '/assets/images/jigsaw_o1.svg' | relative_url }}">
    <img id="piece-54" class="puzzle-piece" src="{{ '/assets/images/jigsaw_o2.svg' | relative_url }}">
    <img id="piece-55" class="puzzle-piece" src="{{ '/assets/images/jigsaw_o1.svg' | relative_url }}">
    <img id="piece-56" class="puzzle-piece" src="{{ '/assets/images/jigsaw_ro.svg' | relative_url }}">
</div>

<script>
const storageKey = "zolder-puzzle";
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
</script>
