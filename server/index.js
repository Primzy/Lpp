"use strict"

const port = 45454;
const Request = require("sync-request");
const Restify = require("restify");
const chalk = require("chalk");
const db = require("./database");

let api = Restify.createServer();
api.name = "Trola";

let headers = {
	'Accept': 'application/json'
};

api.get('/station/:name', respond);
api.post('/favourites', saveFavourite);
api.get('/favourites/:user', getFavourites)

function saveFavourite(req, res, next) {
	// Ustvarimo novo instanco favourite
	let favourite = new db.Favourite({
		name:req.params.name.toLowerCase(),
		number:req.params.number,
		user:req.params.user
	});
	// Shranimo favouirte
	favourite.save(function (err, favourite) {
	  if (err) return console.error(err);
	  console.log("Saved favourite for: " + favourite.user);

	  // Zaključimo zahtevo
	  next();
	});
}
function getFavourites(req, res, next) {
	// Poiščemo uporabnikove favourites
	Favourite.find({ user: req.param.user }, function(err, favourites){
		if(err) return console.error(err);

		// Pošljemo podatke na FE
		res.send(favourites);

		// Zaključimo zahtevo
		next();
	});
}

function respond(req, res, next){

	// Zahteva podatkov na trola.si
	var data = Request('GET', 'http://www.trola.si/' + req.params.name, { 'headers': headers });

	// Priprava podatkov
	let json = JSON.parse(data.getBody());

	// Podatke pošljemo na FE
	res.send(json);

	// Zaključimo zahtevo
	next();
}
api.listen(port, function() {
	console.log('%s listening at %s', api.name, api.url);
});