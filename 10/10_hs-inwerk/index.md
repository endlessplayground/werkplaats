---
layout: default
title: Ordenen
submenu: actiefwerkt
category: hs
---

<style>
.submenu {
  gap: 30px;
}
h4 {
    color: var(--cyan);
    margin: 10px 0 0 0;
}
.cyan {
      color: var(--cyan);
  margin-right: 5px;
}
</style>

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Inwerkperiode</h2>

<h3 class="groter">Protocollen</h3>

<h4>Opstarten</h4>

<div class="custom-bullet">
    <div class="bullet"></div>
    <p>Surveillant moet half uur van tevoren in lokaal aanwezig zijn.
    <br>
    <span class="cyan">●</span> Check de opstelling.<br>
    <span class="cyan">●</span> Scherm voorin lokaal aanzetten.    </p>

</div>

<h4>Inloop studenten</h4>

<div class="custom-bullet">
    <div class="bullet"></div>
    <p>Inschrijven op de lijst, later checken of aantal op lijst klopt met aantal aanwezigen.
    <br>
    <span class="cyan">●</span> Let op naam en geldigheid ID!<br>
    <span class="cyan">●</span> ID op hoek van tafel.<br>
    <span class="cyan">●</span> Eenmaal binnen, niet meer naar toilet.
    </p>
</div>

<h4>Instructies</h4>

<div class="custom-bullet">
    <div class="bullet"></div>
    <p>Studenten moeten meteen inloggen op ANS.APP. Vanuit ANS.APP komen ze in Schoolyear.
    <br><span class="cyan">●</span> Invulveld inlog (onderin) in beeld!<br></p>

</div>

<div class="custom-bullet">
    <div class="bullet"></div>
    <p>Vóór aanvang melden:
    <br>
    <span class="cyan">●</span> Horloges, hoofddeksels, oordoppen weg.<br>
    <span class="cyan">●</span> Sleeve laptop en hoes rekenmach. weg.<br>
    <span class="cyan">●</span> Telefoon in de tas!<br>
    <span class="cyan">●</span> Tentamen gezamenlijk afsluiten!
    </p>
</div>

<div class="custom-bullet">
    <div class="bullet"></div>
    <p>Startmoment:
    <br>
    <span class="cyan">●</span> Kladpapier uitdelen.<br>
    <span class="cyan">●</span> Inlogcode bekend maken.<br>
    <span class="cyan">●</span> Telefoon in de tas!<br>
    <span class="cyan">●</span> Tentamen gezamenlijk afsluiten!
    </p>
</div>



<div id="hidden" hidden>

<div id="item-categories" class="item-grid"></div>

</div>

<div id="item-list"></div>

<script>
window.itemListConfig = {
    storageKey: "hs-inwerk",
    textOnlyCategories: ["Doen", "Later", "Nog later"],

    categories: {
        "Doen": [],
        "Later": [],
        "Nog later": []
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>