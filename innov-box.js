var server = require('./index').create(1557, 'db.json') ;

console.log("Starting innox-box...") ;
server.start() ;
console.log("Started\n") ; 

process.on('SIGINT', function () {
  console.log("Stopping innov-box...") ;
  server.stop(function () {
    console.log("Stopped. Bye !") ;
    process.exit(0);
  });
  setTimeout(function() { console.log("Could not stop, terminating.") ; process.exit(-1) ; }, 10000 ) ;
});
