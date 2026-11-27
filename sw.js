---
---

const CACHE_NAME = 'werkplaats-v1';

const URLS_TO_CACHE = [
  '{{ "/" | relative_url }}',
  '{{ "/manifest.json" | relative_url }}'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );

  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {

  const request = event.request;

  if (request.method !== 'GET') return;

  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    (async () => {

      try {
        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);

          try {
            await cache.put(request, response.clone());
          } catch (error) {
            console.warn('Caching failed:', error);
          }
        }

        return response;

      } catch (error) {

        const cached = await caches.match(request);

        if (cached) return cached;

        if (request.mode === 'navigate') {
          return caches.match('{{ "/" | relative_url }}');
        }

        return Response.error();
      }

    })()
  );

});