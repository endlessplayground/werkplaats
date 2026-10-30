---
layout: default
title: Afspraken
submenu: kalender
category: calendar
---

<style>
    .appointment-editor label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }
</style>

<h2>
    <div id="toggle-input" class="show-hide">
        <div class="pen">
            <img src="{{ '/assets/images/pen.svg' | relative_url }}">
        </div>
    </div>
    Afspraken overzicht
</h2>

<div class="appointments-page" id="appointments-page"
     data-edit-icon="{{ '/assets/images/edit.svg' | relative_url }}"
     data-delete-icon="{{ '/assets/images/delete.svg' | relative_url }}">

<div id="hidden" hidden>

  <section class="appointment-editor">
            <form id="appointment-form">
                <label for="appointment-date">Datum</label>
                <input id="appointment-date" name="date" type="date" required>

  <label for="appointment-time">Tijd</label>
    <input id="appointment-time" name="time" type="time">
  <label for="appointment-end-time">Eindtijd</label>
    <input id="appointment-end-time" name="end-time" type="time">

  <label for="appointment-category">Categorie</label>
                <select id="appointment-category" name="category" required>
                    <option value="" selected disabled>Kies een categorie</option>
                    <option value="Social">Sociaal</option>
                    <option value="Health">Gezondheid</option>
                    <option value="University">Opleiding</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Personal">Persoonlijk</option>
                    <option value="Other">Overig</option>
                </select>

  <label for="appointment-title">Afspraak</label>
                <input id="appointment-title" name="title" type="text"
                       placeholder="Afspraak met / bij" required>

  <label for="appointment-details">Extra informatie (optioneel)</label>
                <textarea id="appointment-details" name="details" rows="2"
                          placeholder="Extra informatie (optioneel)"></textarea>

  <div class="appointment-form-buttons">
                    <button type="submit" id="appointment-save">Toevoegen</button>
                    <button type="button" id="appointment-cancel" hidden>Annuleren</button>
                </div>
            </form>
        </section>

  <section class="appointment-filters" aria-labelledby="appointment-filter-heading">
            <h4 id="appointment-filter-heading">Toon categorieën</h4>
            <div id="appointment-category-filters"></div>
        </section>

  </div>

  <section id="appointment-list" class="appointment-list" aria-live="polite"></section>

</div>

<link rel="stylesheet" href="{{ '/assets/css/appointments.css' | relative_url }}">

<script src="{{ '/assets/js/00_appointments.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_show-hide.js' | relative_url }}"></script>
