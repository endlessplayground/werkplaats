---
layout: jigsaw
title: Home
custom_css: jigsaw
---


<div class="home-grid">
  {% for item in site.data.jigsaw_tiles %}
    <a class="home-tile{% if item.image contains 'jigsaw_tile-1' %} tile-one{% endif %}"
   href="{{ item.url | relative_url }}"
   title="{{ item.title }}"
   style="background-image: url('{{ item.image | relative_url }}');">

      <span class="tile-label">{{ item.title }}</span>

    </a>
  {% endfor %}
</div>