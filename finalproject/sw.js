// sw.js - basic install & fetch caching skeleton
const CACHE_NAME = 'peakfinder-v1';
const FILES_TO_CACHE = [
  '/finalproject/index.html',
  '/finalproject/trails.html',
  '/finalproject/about.html',
  '/finalproject/assets/css/main.css',
  '/finalproject/assets/js/main.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  // stale-while-revalidate
  evt.respondWith(
    caches.match(evt.request).then(cached => {
      const network = fetch(evt.request).then(resp => {
        if (resp && resp.ok) caches.open(CACHE_NAME).then(c => c.put(evt.request, resp.clone()));
        return resp;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
