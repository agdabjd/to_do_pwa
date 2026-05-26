const CACHE_NAME = "todo-pwa-v1";

const arquivosCache = [
    "index.html",
    "css/style.css",
    "js/app.js",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return Promise.all(
                    arquivosCache.map((arquivo) => {
                        return cache.add(arquivo);
                    })
                );
            })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});