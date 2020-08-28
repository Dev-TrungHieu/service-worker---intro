const cacheName = "v1";

const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js",
];

self.addEventListener("install", (e) => {
  // console.log("Service is installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        // console.log(`Service worker: Caching Files`);
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("avtivate", (e) => {
  console.log("Service is avtivated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            // console.log("Server worker is clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // console.log("Server worker: Fetching ");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
