var CACHE_NAME = 'getItDoneMainCache';

var urlsToCache = [
  '/worker/',
  '/worker/styles/main.css',
  '/worker/scripts/main.js'
];

self.addEventListener('install', function(event) {
	console.log("Service worker install event: started");
  	event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
		console.log("Service worker install event: success");
		return cache.addAll(urlsToCache);
	}));
});

self.addEventListener('activate', event => {
  	console.log('Service worker activate event: activated');
});

self.addEventListener('fetch', function(event) {
	var file = event.request;
	event.respondWith(caches.match(file).then(function(resp) {
		if(resp) {
			console.log("Service worker fetch event: served from cache - " + resp.url);
			return resp;
		}
		fetch(file).then(function(response) {
			return caches.open(CACHE_NAME).then(function(cache) {
				return cache.put(event.request, response.clone()).then(function() {
					console.log("Service worker fetch event: downloaded -" + file);
				});
			});  
		})
	}).catch(function(e) {
		console.log("Service worker fetch event: failed to download -  " + file);	
	}));
});