const CACHE_NAME = 'cinemora-v7.1';
const urlsToCache = [
  './',
  './index.html?v=7.1',
  './manifest.json?v=7.1',
  './ad.html?v=7.1',
  './my-videos.html?v=7.1',
  './settings.html?v=7.1',
  './payment.html?v=7.1',
  './login.html?v=7.1',
  './about.html?v=7.1',
  './contact.html?v=7.1',
  './privacy.html?v=7.1',
  './terms.html?v=7.1',
  './icon-192.png?v=7.1',
  './icon-512.png?v=7.1'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
