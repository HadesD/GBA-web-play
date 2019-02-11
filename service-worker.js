var filesToCache = [
  '.',
  'index.html',
  './assets/css/index.css',
];

var staticCacheName = 'gba-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event) {});

