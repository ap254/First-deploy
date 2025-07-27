const CACHE_NAME = "medi-suggest-cache-v1";

// ✅ List all important files to cache
const FILES_TO_CACHE = [
  "/",
  "/mrkz123_updated_final_alt_fix.html",
  "/pwa.js",
  "/sw.js",
  "/manifest.json",
  "/data.json",
  "/terms4.html",
  "/privacy5.html",
  "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js",
  "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Sans+Devanagari:wght@400;700&display=swap"
];

// ✅ Install: Pre-cache all static files
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// ✅ Fetch: Serve from cache first, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
