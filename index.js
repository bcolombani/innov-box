module.exports = function(serverPort, socketPort, dbPath, cameraPath, printerName) {
  var boxServer = require('./box-server').create(serverPort, dbPath, { socketPort : socketPort }) ;
  var videoServer = require('./live-image').create(socketPort, [ { path : cameraPath, name : 'box-view' } ]) ;
  var ideaPrinter = require('./idea-printer').create("Zebra", printerName, "template.zpl") ;
  var camera = require('raspicam')({mode : "timelapse", timelapse : "50", w : 300, h : 200, e : 'jpg', output : cameraPath}) ;

  // manage printing when a new idea is received
  boxServer.onNewIdea(function(idea) {
    ideaPrinter.print(idea) ;
  }) ;

  // restart camera if timeout is reached (~11 days)
  var camera_process ;
  camera.on("exit", function() {
    camera_process = camera.start() ;
  }) ;

  // start express and socket io + time laps camera
  console.log("Starting innov-box...") ;
  boxServer.start() ;
  videoServer.start() ;
  camera_process = camera.start({}) ;
  console.log("Started\n") ;

  // Manager app closing
  process.on('SIGINT', function () {
    setTimeout(function() { console.log("Could not stop within ten seconds, terminating.") ; process.exit(-1) ; }, 10000 ) ;
    console.log("Stopping innov-box...") ;
    camera.stop(camera_process) ;
    videoServer.stop() ;
    boxServer.stop(function () {
      console.log("Stopped. Bye !") ;
      process.exit(0);
    });
  });
};
