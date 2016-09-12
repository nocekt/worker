var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/worker/',
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

self.addEventListener('fetch', function(event) {
  console.log('Fetch: ' + event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
	      console.log("Fetched: " + response.url)
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});