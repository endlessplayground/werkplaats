---
layout: default
title: Supermarkt
submenu: boodschappen
category: groceries
---
<style>
/* Pantry table */

/* Pantry table */

.pantry-table {
    width: 100%;
    margin: 20px auto;

}

.pantry-table table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.pantry-table th,
.pantry-table td {
    padding: 2px 4px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 1rem;
}

/* Column widths */

.pantry-table th:nth-child(1),
.pantry-table td:nth-child(1) {
    width: 55%;
}

.pantry-table th:nth-child(2),
.pantry-table td:nth-child(2) {
    width: 30%;
}

.pantry-table th:nth-child(3),
.pantry-table td:nth-child(3) {
    width: 15%;
    text-align: center;
}

/* Table headings */

.pantry-table th {
    background: var(--main-color);
    color: white;
}

/* Product rows */

.pantry-table tbody tr[data-product] {
    background: #ffffeb;
}

.pantry-table tbody tr[data-product] td {
    cursor: pointer;
}

/* Highlighted products */

.pantry-table tbody tr.needs-shopping {
    background: #f5e5c9;
}

/* Category headings */

.pantry-table tbody tr.pantry-category {
    background: #e8e8e8;
    cursor: default;
}

.pantry-table tbody tr.pantry-category td {
    font-weight: 500;
    border-bottom: 1px solid #ccc;
    cursor: default;
}

/* Number input */

/* Pantry: completely independent number fields */

#pantry-table table tbody td input[type="number"] {
    all: unset;

    display: inline-block;
    box-sizing: border-box;

    width: 35px;
    min-width: 0;
    max-width: 35px;
    height: 18px;

    padding: 0;
    margin: 0;

    border: none;
    border-radius: 0;
    outline: none;
    box-shadow: none;

    background: transparent;
    color: inherit;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: normal;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
}

#pantry-table table tbody td input[type="number"]::-webkit-inner-spin-button,
#pantry-table table tbody td input[type="number"]::-webkit-outer-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
}
</style>

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Voorraadlijst</h2>


<div class="pantry-table" id="pantry-table">



<table>
  <thead>
    <tr>
      <th>Produkt</th>
      <th>Voorraad</th>
      <th>Kopen</th>
    </tr>
  </thead>

  <tbody>
    {% for category in site.data.pantry %}

      <tr class="pantry-category">
        <td colspan="3">{{ category.category }}</td>
      </tr>

      {% for product in category.products %}
        <tr data-product="{{ product.name | slugify }}">
          <td>{{ product.name }}</td>
          <td>{{ product.voorraad }}</td>
          <td>
            <input type="number" min="0" step="1" value="">
          </td>
        </tr>
      {% endfor %}

    {% endfor %}
  </tbody>
</table>


</div>

<script src="{{ '/assets/js/01_pantry.js' | relative_url }}"></script>