const CACHE_NAME = "fishing-v4";

const ARCHIVOS = [
"./",
"./index.html",
"./styles.css",
"./manifest.json",
"./icon-192.png",
"./icon-512.png"
];

self.addEventListener("install", event => {
self.skipWaiting();

```
event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(ARCHIVOS);
    })
);
```

});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys.map(key => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
)
).then(() => self.clients.claim())
);
});

self.addEventListener("fetch", event => {
event.respondWith(
fetch(event.request)
.then(response => {
return response;
})
.catch(() => {
return caches.match(event.request);
})
);
});
