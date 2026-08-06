const CACHE_NAME = 'cinemora-v7.2-final-2026';
const urlsToCache = [
  './index.html?v=7.2',
  './admin.html?v=7.2',
  './manifest.json?v=7.2'
];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        // DELETE ALL OLD CACHES v1, v6, v7.1 etc
        if (k !== CACHE_NAME) {
          console.log('DELETING OLD CACHE:', k);
          return caches.delete(k);
        }
      })
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // ALWAYS NETWORK FIRST for HTML - no more old versions!
  if (e.request.url.includes('.html')) {
    e.respondWith(
      fetch(e.request, {cache: 'no-store'}).then(res => {
        return res;
      }).catch(()=>caches.match(e.request))
    );
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
