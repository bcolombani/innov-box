var logger = require('morgan') ;
var fs = require('fs') ;
var enableDestroy = require('server-destroy') ;
var express = require('express') ;

var BoxServer = function(port, filePath) {
  this.port = port ;

  var jsonServer = require('json-server') ;
  this.server = jsonServer.create() ;
  var router = jsonServer.router(filePath) ;

  this.server.use('/api', function(req, res, next) { 
    if(req.method === 'POST' && req.originalUrl === '/api/ideas') {
      next() ;
    } else {
      res.send('{°_°}') ;
    }
  }) ;

  this.server.use('/api', router) ;
  this.server.use(logger('combined', {stream : fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})})) ;
  this.server.use(express.static(__dirname + '/public')) ;
}

BoxServer.prototype.start = function() {
  this.connection = this.server.listen(this.port) ; 
  enableDestroy(this.connection) ;
}

BoxServer.prototype.stop = function(handler) {
  this.connection.destroy() ; 
  this.connection.close(handler) ;
}

exports.create = function(port, file) {
  return new BoxServer(port, file) ;
}

