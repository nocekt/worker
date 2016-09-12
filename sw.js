var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/worker',
  '/worker/styles/main.css',
  '/worker/scripts/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});