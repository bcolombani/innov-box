var io = require('socket.io') ;
var fs = require('fs') ;
var destroy = require('./socketio-destroy') ;

var LiveImage = function(port, images) {
  this.server = io() ; 
  this.images = images ;
  this.port = port ;
}

LiveImage.prototype = {
  start : function() {
    this.socket = this.server.listen(this.port) ;
    destroy(this.socket) ; // enable destroy
    var imageIndex;
    for(imageIndex in this.images) {
      var thisServer = this.server ;
      var path = this.images[imageIndex].path ;
      var name = this.images[imageIndex].name ;
      fs.watch(path, function(event, filename) {
        fs.readFile(path, function(err, data) {
          if(!err) {
            var encodedData = new Buffer(data).toString('base64') ;
            thisServer.emit(name, encodedData) ;
          }
        }) ;
      }) ;  
    }
  },
  stop : function() {
    this.socket.close() ; // close all connection with 'destroy'
    this.socket.server.close() ;
  }
} ;

exports.create = function(port, images) {
  return new LiveImage(port, images) ;
}
