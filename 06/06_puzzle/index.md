---
layout: default
title: Puzzel
submenu: order
category: order
---

<style>

.puzzle {
    display: grid;
    width: 357px;
    height: 465.6px;
    grid-template-columns: repeat(7, 50.4px);
    gap: 0;
    margin: 0 auto;
    padding: 0;
    border-right: 2px solid rgba(208, 224, 195, 0.6);
    border-bottom: 2px solid rgba(154, 183, 174, 0.32);
    border-left: 2px solid  rgba(235, 244, 225, 0.9);
    border-top: 2px solid white;
    transform: scale(0.9);
}

.puzzle-piece {
    display: block;
    width: 84px;
    height: auto;
    margin: -16.8px;
    padding: 0;
    border: 0;
}

/* Example: rotate a specific piece */
#piece-01 {
    transform: rotate(0deg) scaleX(-1);
}

#piece-08, #piece-15, #piece-22, #piece-29, #piece-36, #piece-43, #piece-50 {
    transform: rotate(-90deg) scaleX(1);
}

#piece-14, #piece-21, #piece-28, #piece-35, #piece-42, #piece-49, #piece-56 {
    transform: rotate(90deg) scaleX(1);
}

#piece-57  {
    transform: rotate(0deg) scaleX(-1) scaleY(-1);
}

#piece-58, #piece-59, #piece-60, #piece-61, #piece-62  {
    transform: rotate(0deg) scaleY(-1);
}

#piece-63 {
    transform: rotate(0deg) scaleY(-1);
}

</style>

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Puzzel!</h2>

<div class="puzzle">
    <img id="piece-01" class="puzzle-piece orange" src="{{ '/assets/images/jigsaw_orange.svg' | relative_url }}">
    <img id="piece-02" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-03" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-04" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-05" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-06" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-07" class="puzzle-piece orange" src="{{ '/assets/images/jigsaw_orange.svg' | relative_url }}">

<img id="piece-08" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-09" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-10" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-11" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-12" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-13" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-14" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">

<img id="piece-15" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-16" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-17" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-18" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-19" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-20" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-21" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">

<img id="piece-22" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-23" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-24" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-25" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-26" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-27" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-28" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">

<img id="piece-29" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-30" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-31" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-32" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-33" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-34" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-35" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">

<img id="piece-36" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-37" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-38" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-39" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-40" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-41" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-42" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">

<img id="piece-43" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-44" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-45" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-46" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-47" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-48" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-49" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">

<img id="piece-50" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-51" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-52" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-53" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-54" class="puzzle-piece pink" src="{{ '/assets/images/jigsaw_pink.svg' | relative_url }}">
    <img id="piece-55" class="puzzle-piece yellow" src="{{ '/assets/images/jigsaw_yellow.svg' | relative_url }}">
    <img id="piece-56" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">

<img id="piece-57" class="puzzle-piece orange" src="{{ '/assets/images/jigsaw_orange.svg' | relative_url }}">
    <img id="piece-58" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-59" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-60" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-61" class="puzzle-piece green" src="{{ '/assets/images/jigsaw_green.svg' | relative_url }}">
    <img id="piece-62" class="puzzle-piece teal" src="{{ '/assets/images/jigsaw_teal.svg' | relative_url }}">
    <img id="piece-63" class="puzzle-piece orange" src="{{ '/assets/images/jigsaw_orange.svg' | relative_url }}">
</div>
