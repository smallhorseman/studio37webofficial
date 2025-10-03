// Minimal service worker that doesn't intercept requests
// This prevents the service worker errors

const CACHE_NAME = 'studio37-v2';

// Install event - just activate immediately
self.addEventListener('install', function(event) {
  console.log('Service Worker: Install event');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Don't intercept fetch requests to avoid errors
// Just let the browser handle all requests normally
self.addEventListener('fetch', function(event) {
  // Do nothing - let requests go through normally
  return;
});
