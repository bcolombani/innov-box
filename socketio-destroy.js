module.exports = function(socket) {
  this.socket = socket ;
  this.sockets = [] ;
  thisDestroy = this ;
  socket.on('connection', function(socket) {
    thisDestroy.sockets.push(socket) ;
    socket.on('close', function() {
      this.Destroy.sockets.splice(socketlist.indexOf(socket), 1);
    }) ;
  }) ;
  var initialClose = socket['close'] ;
  socket['close'] = function() {
    var sockets = thisDestroy.sockets.slice(0) ; // clone
    sockets.forEach(function(socket) {
      socket.disconnect();
    });
    return initialClose.apply(socket, arguments) ;
  }
}

