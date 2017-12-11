var CACHE_NAME = 'canary-cache-v1';
var urlsToCache = [
  '/css/styles.css',
  '/graphics/icons/canary_icon-192.png',
  '/graphics/icons/canary_icon-256.png',
  '/graphics/icons/canary_icon-384.png',
  '/graphics/icons/canary_icon-512.svg',
  '/graphics/icons/canary_icon-1024.svg'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          if(cacheName == CACHE_NAME){
            return false;
          }
          return true;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

