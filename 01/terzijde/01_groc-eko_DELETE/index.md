---
layout: default
title: Daily to-do
submenu: boodschappen
---

<h2>Boodschappen Ekoplaza</h2>

<div id="todo-add">
    <select id="todo-choice">
        <option value="" selected disabled hidden>Kies een boodschap uit de lijst …</option>
    </select>
    <button type="button" id="todo-add-stock">+</button>
</div>

<form id="todo-form">
    <input
        type="text"
        id="todo-input"
        placeholder="Of voeg zelf een boodschap toe …"
        autocomplete="off"
    >
    <button type="submit">+</button>
</form>

<ul id="todo-list"></ul>

<script src="{{ '/assets/js/01_groc-eko.js' | relative_url }}"></script>
