---
layout: default
title: Daily to-do
submenu: huishouden
---

<h4>Mijn to-do lijstje</h4>

<div id="todo-add">
    <select id="todo-choice">
        <option value="">Kies een klus uit de lijst …</option>
    </select>
    <button type="button" id="todo-add-stock">+</button>
</div>

<form id="todo-form">
    <input
        type="text"
        id="todo-input"
        placeholder="Of bedenk zelf een klusje …"
        autocomplete="off"
    >
    <button type="submit">+</button>
</form>

<ul id="todo-list"></ul>

<script src="{{ '/assets/js/01_do-today.js' | relative_url }}"></script>
