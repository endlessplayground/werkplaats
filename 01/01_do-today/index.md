---
layout: default
title: Daily to-do
submenu: huishouden
---

<h4><div id="toggle-input" class="show-hide"><span class="dinges">🖋️</span></div>Vandaag doen</h4>

<div id="hidden" hidden>
    <div id="item-categories" class="item-grid"></div>
</div>

<div id="item-list"></div>

<script src="{{ '/assets/js/00_daily-tasks.js' | relative_url }}"></script>

<script>
window.itemListConfig = {
    storageKey: "to-do-vandaag",
    customInputPerCategory: true,

    categories: {
        "Urgent": window.dailyTasks,
        "Optioneel": window.dailyTasks
    }
};
</script>

<script src="{{ '/assets/js/00_item-list.js' | relative_url }}"></script>
