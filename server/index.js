"use strict";

const port = 45454;
const Request = require("sync-request");
const Restify = require("restify");
const db = require("./database");
const socketio = require("./socket");

let server = Restify.createServer();
server.name = "Trola";

server.use(Restify.bodyParser());
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});

const io = socketio.listen(server.server);

server.get("/api/station/:name", getStation);
server.post("/api/favourites", saveFavourite);
server.get("/api/favourites/:user", getFavourites)

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
		name:   req.params.name,
		number: req.params.number,
		user:   req.params.user,
	});

	// Shranimo priljubljeno postajo.
	Favourite.save(function(err, favourite) {
		// Na FE vrnemo podatek.
		res.send(favourite);

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
		// Pošljemo podatke na FE.
		res.send(favourites);

		// Zaključimo zahtevo.
		return next();
	});
}

server.listen(port, function() {
	console.log(server.name + " listening at " + server.url);
});
