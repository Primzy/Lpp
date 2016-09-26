"use strict"
const socketio = require('socket.io');
let headers = {
	'Accept': 'application/json'
};
let intervals = [];

module.exports.listen = function(app){
	let io = socketio.listen(app);

    io.sockets.on('connection', function (socket) {
		console.log("new connection: " + socket.id);

		socket.on('disconnect', function () {
			console.log("device disconnected");

		});

		socket.on('track_station', function (data, fn) {
			console.log(data);
			if (io.sockets.connected[socket.id]) {
				intervals[socket.id] = setInterval(respond(data, io.sockets.connected[socket.id]), 30000);
			}
		});
		socket.on('untrack_station', function (data, fn) {
			console.log(data);
			clearInteval(intervals[socket.id]);
		});
    });

    return io
}

function respond(name, socket){

	// Zahteva podatkov na trola.si
	let data = Request('GET', 'http://www.trola.si/' + name, { 'headers': headers });

	// Priprava podatkov
	let json = JSON.parse(data.getBody());

	// Podatke pošljemo na FE
	socket.emmit("data_update", {data: json});

}