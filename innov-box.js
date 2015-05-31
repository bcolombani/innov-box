var server = require('./index').create(1557, 'db.json') ;
var serverVideo = require('./live-image').create(1558, [ { path : 'image.jpg', name : 'box-view' } ]) ;

console.log("Starting innov-box...") ;
server.start() ;
serverVideo.start() ;
console.log("Started\n") ; 

process.on('SIGINT', function () {
  setTimeout(function() { console.log("Could not stop within ten seconds, terminating.") ; process.exit(-1) ; }, 10000 ) ;
  console.log("Stopping innov-box...") ;
  serverVideo.stop() ;
  server.stop(function () {
    console.log("Stopped. Bye !") ;
    process.exit(0);
  });
});
