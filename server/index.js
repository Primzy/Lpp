"use strict"

const port = 45454;
const Request = require("sync-request");
const Restify = require("restify");
let api = Restify.createServer();
const chalk = require("chalk");
const db = require("./database");
const socketio = require("./socket");
const io = socketio.listen(api.server);

api.name = "Trola";

let headers = {
	'Accept': 'application/json'
};

api.get('/station/:name', respond);
api.post('/favourites', saveFavourite);
api.get('/favourites/:user', getFavourites)

function saveFavourite(request, response, next) {

	// Ustvarimo novo instanco favourite
	let favourite = new db.Favourite({
		name:request.params.name.toLowerCase(),
		number:request.params.number,
		user:request.params.user
	});

	// Shranimo favouirte
	favourite.save(function (err, favourite) {
	  if (err) return console.error(err);
	  console.log("Saved favourite for: " + favourite.user);

	  // Na FE pošljemo favourite
	  response.send(favourite);

	  // Zaključimo zahtevo
	  next();
	});
}

function getFavourites(request, response, next) {

	// Poiščemo uporabnikove favourites
	Favourite.find({ user: request.param.user }, function(err, favourites){
		if(err) return console.error(err);

		// Pošljemo podatke na FE
		response.send(favourites);

		// Zaključimo zahtevo
		next();
	});
}

function respond(request, response, next){

	// Zahteva podatkov na trola.si
	var data = Request('GET', 'http://www.trola.si/' + request.params.name, { 'headers': headers });

	// Priprava podatkov
	let json = JSON.parse(data.getBody());

	// Podatke pošljemo na FE
	response.send(json);

	// Zaključimo zahtevo
	next();
}

api.listen(port, function() {
	console.log('%s listening at %s', api.name, api.url);
});