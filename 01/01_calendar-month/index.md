---
layout: default
title: Calendar
submenu: kalender
---

<div class="calendar-page">

  <h4><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>De komende weken  <button type="button" id="calendar-today"><img src="{{ '/assets/images/up.svg' | relative_url }}"></button></h4>


<div class="calendar-weekdays" id="calendar-weekdays"></div>

<div id="calendar-scroll" class="calendar-scroll">
    <div id="calendar-grid" class="calendar-grid"></div>
</div>

  <section class="calendar-form-section">
    <h5 id="calendar-form-title">Afspraak toevoegen</h5>

<form id="calendar-form">
      <label for="event-date">Datum</label>
      <input type="date" id="event-date" required>

<label for="event-category">Categorie</label>
      <select id="event-category" required>
        <option value="hotel">Hotel</option>
        <option value="university">R'dam</option>
        <option value="university">Leiden</option>
        <option value="social">Sociaal</option>
      </select>

<label for="event-period">Dagdeel</label>
      <select id="event-period" required>
        <option value="morning">Ochtend</option>
        <option value="afternoon">Middag</option>
        <option value="evening">Avond</option>
      </select>

<label for="event-description">Omschrijving</label>
      <input type="text" id="event-description"
             placeholder="Bijv. ontbijtteam">

<div class="calendar-form-buttons">
        <button type="submit" id="calendar-save">Toevoegen</button>
      </div>
    </form>
  </section>

</div>

<script src="{{ '/assets/js/00_calendar.js' | relative_url }}"></script>