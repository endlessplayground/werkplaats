---
layout: default
title: Supermarkt
submenu: boodschappen
category: groceries
custom_css: pantry
---

<h2>
  <div id="toggle-input" class="show-hide">
    <div class="pen">
      <img src="{{ '/assets/images/pen.svg' | relative_url }}">
    </div>
  </div>
  Voorraadlijst
</h2>

<div class="pantry-table" id="pantry-table">

<table>
  <thead>
    <tr>
      <th>Produkt</th>
      <th>Gewenst</th>
      <th>Aanwezig</th>
      <th style="text-align:right;">Eenheid</th>
    </tr>
  </thead>

  <tbody>
    {% for category in site.data.pantry %}

      <tr class="pantry-category">
        <td colspan="4">{{ category.category }}</td>
      </tr>

      {% for product in category.products %}
        <tr data-product="{{ product.name | slugify }}">
          <td>{{ product.name }}</td>
          <td class="desired">{{ product.voorraad }}</td>
          <td class="available">
            <input type="number" min="0" step="1">
          </td>
          <td>{{ product.eenheid }}</td>
        </tr>
      {% endfor %}

    {% endfor %}
  </tbody>
</table>

</div>

<button type="button" id="transfer-pantry">
    Zet tekorten op boodschappenlijst
</button>

<script src="{{ '/assets/js/02_pantry.js' | relative_url }}"></script>
