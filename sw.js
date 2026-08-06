// CINEMORA PRO v5 - Force update - deletes all old caches
const CACHE_NAME = 'cinemora-pro-v5-FORCE-UPDATE-' + Date.now();
const urlsToCache = [
  './index.html',
  './payment.html',
  './settings.html',
  './my-videos.html',
  './ad.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // DELETE ALL OLD CACHES
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network first, then cache - always get latest
  event.respondWith(
    fetch(event.request).then(response => {
      // Cache the new version
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => {
      // If offline, use cache
      return caches.match(event.request);
    })
  );
});
