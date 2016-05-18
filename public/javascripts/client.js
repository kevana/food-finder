document.getElementById('report-food').addEventListener('click', function(e) {
  console.log('received click', e);
  function success(pos){
    console.log('received position', pos);
    $.post('/reportFood', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      description: document.getElementById("description").value,
      accuracy: pos.coords.accuracy
    })
  }
  function error() {
    alert('Unable to get current position');
  }
  navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true})
});

var socket = io('/food');
socket.on('food-report', function (data) {
  console.log('Received food report', data);
  Push.create(data.description || 'New food report!', {
    body: 'Reported at: ' + new Date(data.createdAt).toLocaleTimeString()
  });
});
