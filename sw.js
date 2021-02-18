const staticCache = 'static-cache'
const assets = [
    '/',
    '/index.html',
    '/asset/js/app.js',
    '/asset/materialize/js/materialize.min.js',
    '/asset/materialize/css/materialize.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
]
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
    console.log('event fetch', e)
})