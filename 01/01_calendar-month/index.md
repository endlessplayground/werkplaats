---
layout: default
title: Overzicht
submenu: kalender
category: calendar
custom_css: calendar
---

<div class="calendar-page">

  <h2>
    <a href="#calendar-form-title">
        <div class="pen">
            <img src="{{ '/assets/images/pen.svg' | relative_url }}" alt="">
        </div>
    </a>
    De komende weken
    <button type="button" id="calendar-today">
        <img src="{{ '/assets/images/up.svg' | relative_url }}">
    </button>
</h2>


<div class="calendar-weekdays" id="calendar-weekdays"></div>

<div id="calendar-scroll" class="calendar-scroll">
    <div id="calendar-grid" class="calendar-grid"></div>
</div>

  <section class="calendar-form-section">
<a href="#top" style="display: flex; flex-direction:row; align-items:flex-end;">
  <h3 id="calendar-form-title">Afspraak toevoegen</h3><button type="button" class="calendar-today">
        <img src="{{ '/assets/images/up.svg' | relative_url }}" >
    </button>
</a>


<form id="calendar-form">

      <input type="date" id="event-date" required>

  <select id="event-category" required>
    <option value="" selected disabled>Categorie</option>
    <option value="vandervalk">Van der Valk</option>
    <option value="beschikbaar-hs">HS?</option>
    <option value="hogeschool-rotterdam">HS R'dam</option>
    <option value="hogeschool-leiden">HS Leiden</option>
    <option value="sociaal">Sociaal</option>
    <option value="rest">Rest</option>
</select>

  <select id="event-period" required>
      <option value="" selected disabled>Dagdeel</option>
      <option value="morning">Ochtend</option>
      <option value="afternoon">Middag</option>
      <option value="evening">Avond</option>
  </select>
      <input type="text" id="event-description"
             placeholder="Omschrijving…">

<div class="calendar-form-buttons">
        <button type="submit" id="calendar-save">Toevoegen</button>
      </div>
    </form>
  </section>

</div>

<script src="{{ '/assets/js/00_calendar.js' | relative_url }}"></script>