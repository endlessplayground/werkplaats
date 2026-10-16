---
layout: home
title: Home
---

<div class="home-grid">
  {% for item in site.data.home_tiles %}
    <a class="home-tile" href="{{ item.url | relative_url }}">
      {{ item.title }}
    </a>
  {% endfor %}
</div>
