#!/usr/bin/env node

if(process.argv.length === 8) {
	require("./index")(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]) ;	
} else {
	console.log("Syntax : node innov-box <server-port> <video-socket-port> <db-file> <live-image-file> <cups-printer-name> <log-file-path>") ;
}




