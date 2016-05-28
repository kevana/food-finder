self.addEventListener('push', function(event) {
  console.log('received push event:', event);
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: 'Alea iacta est'
    })
  );
});
