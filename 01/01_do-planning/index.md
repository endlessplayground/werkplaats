---
layout: default
title: Vandaag
submenu: huishouden
category: to-do
---

<h2><div id="toggle-input" class="show-hide"><div class="pen"><img src="{{ '/assets/images/pen.svg' | relative_url }}"></div></div>Vandaag doen</h2>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>
<script src="{{ '/assets/js/00_admin-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "to-do-planning",
    customInputPerCategory: true,

    categories: {

        "": window.dailyTasks,
/*        "Optioneel": window.dailyTasks,
        "Administratief": window.adminTasks,
        "Rest": [
        ]
*/

    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
