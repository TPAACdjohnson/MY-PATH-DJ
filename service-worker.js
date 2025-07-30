self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('legacy-store').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/game.js',
                '/manifest.json'
            ]);
const CACHE_NAME = 'my-path-v2'; // Change this on every new deployment!
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/story_hub.js',
  '/chapter_one_game.js',
  '/chapter_two_game.js',
  '/chapter_three_game.js',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching all files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event: Clear old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Else fetch from network
        return fetch(event.request).then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, res.clone());
