if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js')
  .then(reg => {
    console.log("service worker working that service " + reg.scope);
  })
  .catch(function(err){
    console.error(err);
  });
}
