const CACHE_NAME = 'cinemora-v7.1-admin-final';
const urlsToCache = [
  './',
  './index.html?v=7.1',
  './index.html',
  './ad.html?v=7.1',
  './ad.html',
  './my-videos.html?v=7.1',
  './my-videos.html',
  './settings.html?v=7.1',
  './settings.html',
  './payment.html?v=7.1',
  './payment.html',
  './login.html?v=7.1',
  './login.html',
  './about.html?v=7.1',
  './about.html',
  './contact.html?v=7.1',
  './contact.html',
  './privacy.html?v=7.1',
  './privacy.html',
  './terms.html?v=7.1',
  './terms.html',
  './admin.html?v=7.1',
  './admin.html',
  './manifest.json?v=7.1',
  './manifest.json'
];

self.addEventListener('install', event => {
  console.log('CINEMORA v7.1 FINAL - Admin Included');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.map(n => { if(n!==CACHE_NAME) return caches.delete(n); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request).catch(()=>caches.match('./index.html?v=7.1')))
  );
});
