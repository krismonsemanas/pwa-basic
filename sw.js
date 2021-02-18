const staticCache = 'static-cache'
const dynamicCache = 'dynamic-cache'
const assets = [
    '/',
    '/index.html',
    '/asset/js/app.js',
    '/asset/js/ui.js',
    '/asset/materialize/js/materialize.min.js',
    '/asset/materialize/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/pages/fallback.html'
]
// limit number cache
const limitNumCahce = (cacheName, num) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > num ) {
                cache.delete(keys[0]).then(limitNumCahce(cacheName, num))
            }
        })
    })
}
// install
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets)
        })
    )
})

// aktivasi
self.addEventListener('activate', e => {
    console.log('sw di aktifkan')
})

// fetch data
self.addEventListener('fetch' , e => {
    e.respondWith(
        caches.match(e.request).then(staticRes => {
            return staticRes || fetch(e.request).then(dynamicRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, dynamicRes.clone())
                    limitNumCahce(dynamicCache, 2)
                    return dynamicRes
                })
            })
        }).catch(() => caches.match('/pages/fallback.html'))
    )
})

