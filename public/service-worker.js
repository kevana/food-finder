self.addEventListener('push', function(event) {
  console.log('received push event:', event);
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    self.registration.showNotification(data.description, {
      body: 'Reported at: ' + new Date(data.createdAt).toLocaleTimeString(),
      timestamp: new Date(data.createdAt).getTime(),
      actions: [

      ]
    })
  );
});
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked', event)
});
self.addEventListener('click', function(event) {
  console.log('Notification clicked click event', event)
});
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag ', event.notification.tag);
  event.notification.close();
  var url = 'https://youtu.be/gYMkEMCHtJ4';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then(function(windowClients) {
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});