document.getElementById('report-food').addEventListener('click', function(e) {
  console.log('received click', e);
  function success(pos){
    console.log('received position', pos);
    $.post('/reportFood', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy
    })
  }
  function error() {
    alert('Unable to get current position');
  }
  navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true})
});
