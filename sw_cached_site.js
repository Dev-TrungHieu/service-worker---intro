const cacheName = "v2";

self.addEventListener("install", (e) => {
  console.log("Service is installed");
});

self.addEventListener("avtivate", (e) => {
  console.log("Service is avtivated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            console.log("Server worker is clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Server worker: Fetching ");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
