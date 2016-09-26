"use strict"

const port = 45454;
const Request = require("sync-request");
const Restify = require("restify");
const chalk = require("chalk");
const db = require("./database");
const socketio = require("./socket");
const io = socketio.listen(api.server);

let api = Restify.createServer();
api.name = "Trola";

api.get("/api/station/:name", getStation);
api.post("/api/favourites", saveFavourite);
api.get("/api/favourites/:user", getFavourites)

function getStation(req, res, next)
{
	// Zahteva podatkov na Trola.si
	let data = Request("GET", "http://www.trola.si/" + req.params.name, {
		// Povemo, kakšno obliko podatkov želimo.
		headers: {
			"Accept": "application/json"
		},
	});

	// Priprava podatkov.
	let json = JSON.parse(data.getBody());

	// Podatke pošljemo na FE.
	res.send(json);

	// Zaključimo zahtevo.
	return next();
}

function saveFavourite(req, res, next)
{
	// Ustvarimo novo instanco.
	let Favourite = new db.Favourite({
		name:   req.params.name.toLowerCase(),
		number: req.params.number,
		user:   req.params.user,
	});

	// Shranimo priljubljeno postajo.
	Favourite.save(function(err, favourite) {
		if(err) {
			console.error(err);
			return;
		}
		// Zaključimo zahtevo.
		return next();
	});
}

function getFavourites(req, res, next)
{
	// Poiščemo uporabnikove priljubljene postaje.
	db.Favourite.find({
		user: req.params.user
	}, function(err, favourites) {
		if(err) {
			console.error(err);
			return;
		}

		// Pošljemo podatke na FE.
		res.send(favourites);

		// Zaključimo zahtevo.
		return next();
	});
}

api.listen(port, function() {
	console.log(api.name + " listening at " + api.url);
});
