// CINEMORA v1.0 Official Launch - Mountain Top Edition - First Public Release
const CACHE_NAME='cinemora-v1.0-official-launch';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>{if(x!==CACHE_NAME)return caches.delete(x);}))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'||e.request.destination==='document'||e.request.url.endsWith('.html')){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));}return r;}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html?v=1.0'))));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
