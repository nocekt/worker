if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
	// Registration was successful
	console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
	// registration failed :(
	console.log('ServiceWorker registration failed: ', err);
  });
}

var update = location.search.split('update=')[1];
if(update == true) {
	console.log("Update needed.");
}
else {
	console.log("Up to date.");
}