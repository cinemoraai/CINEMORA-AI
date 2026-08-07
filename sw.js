const CACHE_NAME='cinemora-v7.5-final-2026';

self.addEventListener('install',e=>{
  console.log('CINEMORA v7.5 installing - clearing old CINEMORA-AI cache');
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.map(k=>{
        console.log('Deleting old cache:',k);
        return caches.delete(k);
      })
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  // Skip chrome extensions
  if(e.request.url.startsWith('chrome-')) return;
  
  // For HTML pages - NETWORK FIRST (always fresh, fixes 404)
  if(e.request.mode==='navigate' || e.request.destination==='document' || e.request.url.endsWith('.html')){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(res=>{
          // Cache successful responses
          if(res.ok){
            return caches.open(CACHE_NAME).then(cache=>{
              cache.put(e.request,res.clone());
              return res;
            });
          }
          return res;
        })
        .catch(()=>{
          // Offline - try cache, else show index
          return caches.match(e.request).then(cached=>{
            return cached || caches.match('/index.html?v=7.5') || caches.match('/index.html');
          });
        })
    );
    return;
  }
  
  // For assets - cache first
  e.respondWith(
    caches.match(e.request).then(cached=>cached || fetch(e.request).catch(()=>{}))
  );
});
