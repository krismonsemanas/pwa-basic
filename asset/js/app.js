if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('sw di daftarkan',reg))
        .catch(err => console.log('sw gagal di daftarkan', err))
}
