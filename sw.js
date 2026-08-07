const CACHE_NAME='cinemora-v7.4-final-prod-2026';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME) return caches.delete(k);}))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'||e.request.url.includes('.html')){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{return caches.open(CACHE_NAME).then(c=>{c.put(e.request,r.clone());return r;});}).catch(()=>caches.match(e.request)));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
