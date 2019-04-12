/* globals self caches fetch */
const version = '2.0.0'
const cacheName = `mcdfree-${version}`
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/ankieta.html`,
        `/fonts/GoogleSans-Medium.ttf`,
        `/fonts/GoogleSans-Regular.ttf`,
        `/coupons/ankieta/hamburger.png`,
        `/coupons/ankieta/cheeseburger.png`,
        `/coupons/ankieta/big_ice_cream.png`,
        `/materialize.min.css`,
        `/pwacompat.min.js`
      ]).then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request)
      })
  )
})
