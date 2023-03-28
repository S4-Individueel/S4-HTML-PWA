//Setup cache on the install
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/offline.html'
            ]);
        })
    );
});

//Fetch cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(response) {
                    return response;
                }).catch(function() {
                    return caches.match('/offline.html');
                });
            }
        })
    );
});