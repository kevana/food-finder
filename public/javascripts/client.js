document.getElementById('report-food').addEventListener('click', function (e) {
  console.log('received click', e);
  document.getElementById('report-food').disabled = true;
  var spinner = spinRight(document.getElementById('report-food'));
  function success(pos) {
    console.log('received position', pos);
    $.post('/reportFood', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      description: document.getElementById("description").value,
      accuracy: pos.coords.accuracy
    })
      .always(function () {
        document.getElementById('report-food').disabled = false;
        spinner.stop()
      })
  }
  function error() {
    alert('Unable to get current position');
    document.getElementById('report-food').disabled = false;
    spinner.stop()
  }
  navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true})
});

if (!'serviceWorker' in navigator) {
  var socket = io('/food');
  socket.on('food-report', function (data) {
    console.log('Received food report', data);
    Push.create(data.description || 'New food report!', {
      body: 'Reported at: ' + new Date(data.createdAt).toLocaleTimeString()
    });
  });
}
document.getElementById('sendPushNotification').onclick = function() {
  var delay = 1;
  var ttl =  10;
  fetch('./sendNotification?endpoint=' + endpoint + '&delay=' + delay +
    '&ttl=' + ttl,
    {
      method: 'post'
    }
  );
};

function spinRight(el) {
  var opts = {
    lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
  };
  console.log('spinning right');
  return new Spinner(opts).spin(el)
}