if(process.argv.length === 7) {
	require("./index")(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]) ;	
} else {
	console.log("Syntax : node innov-box <server-port> <video-socket-port> <db-file> <live-image-file> <cups-printer-name>") ;
}




