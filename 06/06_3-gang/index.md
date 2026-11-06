---
layout: default
title: Puzzel
submenu: order
category: order
custom_css: jigsaw
puzzle_title: Gang
puzzle_background: gang.png
---

<style>
.puzzle {
    background-size: 110% 100%;
    background-repeat: no-repeat;
    background-position: center;
}
</style>

{% include jigsaw-puzzle.html %}

<script src="{{ '/assets/js/06_jigsaw.js' | relative_url }}"
        data-storage-key="gang-puzzle"></script>