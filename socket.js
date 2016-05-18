var sock;

 function init(server) {
   var io = require('socket.io')(server).of('/food');
   io.on('connection', function(socket){
     sock = socket;
   });
 }

module.exports = {
  init,
  emit: (report) => sock.emit('food-report', report)
};
