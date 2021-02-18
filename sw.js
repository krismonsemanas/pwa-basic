// install
self.addEventListener('install', e => {
    console.log('sw di install')
})

// aktivasi
self.addEventListener('activate', e => {
    console.log('sw di aktifkan')
})

// fetch data
self.addEventListener('fetch' , e => {
    console.log('event fetch', e)
})