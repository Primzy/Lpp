"use strict"
const mongoose = require('mongoose');

var mongoUri = "mongodb://127.0.0.1:27017/trola";
mongoose.connect(mongoUri);

var conn = mongoose.connection;


module.exports = mongoose



// let favourite = {
//     name:"",
//     number:"",
//     user: ""
// }