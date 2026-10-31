---
layout: home
title: Home
---


<div class="home-grid">
  {% for item in site.data.home_tiles %}
    <a class="home-tile{% if item.dimmed %} dimmed{% endif %}{% if item.up %} up{% endif %}"
       href="{{ item.url | relative_url }}"
       title="{{ item.title }}">

      {% if item.image %}
        <img src="{{ item.image | relative_url }}" alt="{{ item.title }}">
      {% else %}
        {{ item.title }}
      {% endif %}

    </a>
  {% endfor %}
</div>