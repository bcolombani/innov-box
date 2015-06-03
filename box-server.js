var logger = require('morgan') ;
var fs = require('fs') ;
var enableDestroy = require('server-destroy') ;
var express = require('express') ;

var BoxServer = function(port, filePath, publicParams) {
  this.port = port ;
  this.newIdeaCallback = function(idea) {} ;

  var jsonServer = require('json-server') ;
  this.server = jsonServer.create() ;
  var router = jsonServer.router(filePath) ;

  // Adds a service for the front to fetch parameters whatever they are
  this.server.get('/params', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(publicParams));
  }) ;

  // Adds a middleware that only authorizes /api for everyone
  var thisServer = this ;
  this.server.use('/api', function(req, res, next) { 
    if(req.method === 'POST' && req.originalUrl === '/api/ideas') {
      thisServer.newIdeaCallback("TODO") ;
      next() ;
    } else {
      res.send('{°_°}') ;
    }
  }) ;

  // Adds json-server router, a simple logger and the static resource for the front end
  this.server.use('/api', router) ;
  this.server.use(logger('combined', {stream : fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})})) ;
  this.server.use(express.static(__dirname + '/public')) ;
} ;

BoxServer.prototype = {
  start : function() {
    this.connection = this.server.listen(this.port) ; 
    enableDestroy(this.connection) ;
  },

  stop : function(handler) {
    this.connection.destroy() ; 
    this.connection.close(handler) ;
  }, 

  onNewIdea : function(handle) {
    this.newIdeaCallback = handle ;
  }
} ;

exports.create = function(port, file, publicParams) {
  return new BoxServer(port, file, publicParams) ;
}

