var cacheID = "v1";

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheID).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        if(response){
            console.log(event.request, ' is in cache');
            return response;
        }
        else{
            console.log(event.request, ' is not in cache, fetching');
            return fetch(event.request).then(function(response){
              const clonedResponse = response.clone();
              caches.open(cacheID).then(function(cache){
                cache.put(event.request, clonedResponse);
              })
              return response;
            }).catch(function(err){
              console.error(err);
            });
      }
    })
  );
});
