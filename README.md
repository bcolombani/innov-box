# Innov'Box
> Work in progress !

## Purpose
The innov'box is a connected suggestion box : suggestions are posted (by anybody, anonymously) on a web front end and printed inside the box. A video feedback allows the poster to see the printed ticket falling inside the box.

The innov'box is made of a raspberry pie with a camera and a Zebra KR403 kiosk printer.

## How it works
The node application is running on the raspberry pi. The camera and the printer are connected to the raspberry. 
* Printing is made in ZPL using cups in raw mode.
* The video is made using raspicam in time-lapse mode. The resulting jpg is watched (with fs.watch) and for each new image, the whole file is sent through a socket.io connection with the front end.

The back-end is made with nodejs, and exposes :
* A json-server router to print the suggestion to a json file
* A paremeter service to forward any configuration variable to the front end
* Static resources for the front end

The front end is made with Polymer 1.0 web components.

## Install
Install cups and configure the Zebra printer in Raw queue.

```sh
npm install -g innov-box
```
On some distribution, the libcups2-dev package may be required for node-printer.
```sh
sudo apt-get install libcups2-dev
```
## Usage

```sh
innov-box <web-port> <socket-port> <json-database-path> <time-lapse-image-path> <printer-cups-name> <log-file-path>
```
* web-port : local port on which the services and static resources are served
* socket-port : local port of the socket.io server
* json-database-path : path to the json file used as a database with lowdb
* time-lapse-image-path : path where the time lapse image is written
* printer-cups-name : name of the Zebra printer in CUPS configuration
* log-file-path : path to the log file of the http server (combined logs)

## License

MIT © [bcolombani]()

