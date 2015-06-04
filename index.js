module.exports = function(serverPort, socketPort, dbPath, cameraPath, printerName) {
  var boxServer = require('./box-server').create(serverPort, 'db.json', { socketPort : socketPort }) ;
  var videoServer = require('./live-image').create(socketPort, [ { path : cameraPath, name : 'box-view' } ]) ;
  var printer = require('printer') ;
  var fs = require('fs') ;

  boxServer.onNewIdea(function(idea) {
    fs.readFile('template.zpl', function read(err, data) {
      if (!err) {
        printer.printDirect({
          data:new Buffer(data).toString().replace(/\{\{idea\}\}/, idea),
          printer:printerName,
          type: "RAW",
          success:function(){
            console.log("printed new idea : "+ idea);
          }, 
          error:function(err){console.log(err);}
        });
      }
    }) ;
  }) ;

  console.log("Starting innov-box...") ;
  boxServer.start() ;
  videoServer.start() ;
  console.log("Started\n") ; 

  process.on('SIGINT', function () {
    setTimeout(function() { console.log("Could not stop within ten seconds, terminating.") ; process.exit(-1) ; }, 10000 ) ;
    console.log("Stopping innov-box...") ;
    videoServer.stop() ;
    boxServer.stop(function () {
      console.log("Stopped. Bye !") ;
      process.exit(0);
    });
  });
};
