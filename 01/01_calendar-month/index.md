---
layout: default
title: Calendar
submenu: kalender
---

<div class="calendar-page">

  <h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>De komende weken</h4>

  <div id="calendar-grid" class="calendar-grid"></div>

  <section class="calendar-form-section">
    <h4 id="calendar-form-title">Afspraak toevoegen</h4>

<form id="calendar-form">
      <label for="event-date">Datum</label>
      <input type="date" id="event-date" required>

<label for="event-category">Categorie</label>
      <select id="event-category" required>
        <option value="hotel">Hotel</option>
        <option value="university">Universiteit</option>
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
        <button type="button" id="calendar-cancel" hidden>Annuleren</button>
      </div>
    </form>
  </section>

</div>

<script src="{{ '/assets/js/00_calendar.js' | relative_url }}"></script>