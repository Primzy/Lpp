"use strict"
const mongoose = require('mongoose');

var mongoUri = "mongodb://127.0.0.1:27017/trola";
mongoose.connect(mongoUri);

var conn = mongoose.connection;
let FavouriteSchema = mongoose.Schema({
	name: String,
	number: String,
	user: String

});
mongoose.Favourite = mongoose.model("Favourite", FavouriteSchema);
module.exports = mongoose



// let favourite = {
//     name:"",
//     number:"",
//     user: ""
// }