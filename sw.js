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
	event.respondWith(
		caches.match(event.request).then(function(resp) {
		if(resp) {
			console.log("Fetched: " + response.url);
			return resp;
		}
		fetch(event.request).then(function(response) {
			return caches.open('v1').then(function(cache) {
				cache.put(event.request, response.clone());
				return response;
			});  
		});
	})
  );
});

self.addEventListener('message', function(event) {
	console.log(1);
});