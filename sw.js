const C='mou-v5';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./icon-192.png','./icon-512.png','./favicon.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// network-first para el app-shell: así la PWA se actualiza sola al publicar cambios
self.addEventListener('fetch',e=>{
  if(!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(
    fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r})
    .catch(()=>caches.match(e.request))
  );
});
