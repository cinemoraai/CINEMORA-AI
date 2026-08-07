const CACHE_NAME='cinemora-v8.0-perfect-2026';
self.addEventListener('install',e=>{console.log('CINEMORA v8.0 Perfect installing');self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME){console.log('Deleting old cache:',k);return caches.delete(k);} })).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 if(e.request.url.startsWith('chrome-')) return;
 if(e.request.mode==='navigate' || e.request.destination==='document' || e.request.url.endsWith('.html')){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));}return r;}).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./index.html?v=8.0')||caches.match('./index.html')||fetch('./index.html'))));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>{})));
});
