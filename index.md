---
layout: home
title: Home
---

<div class="home-grid">
  {% for item in site.data.home_tiles %}
    <a class="home-tile{% if item.dimmed %} dimmed{% endif %}"
       href="{{ item.url | relative_url }}">
      {{ item.title }}
    </a>
  {% endfor %}
</div>