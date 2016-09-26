"use strict";

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/trola");

let FavouriteSchema = mongoose.Schema({
	name: String,
	number: String,
	user: String,
});

mongoose.Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = mongoose;
