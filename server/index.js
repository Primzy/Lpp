"use strict"

const port = 767676;
const request = require("request");

let requestOptions = {
  url: ' http://www.trola.si/trznica_koseze/',
  headers: {
    'Accept': 'application/json'
  }
};
request(requestOptions, function (err, resp, body){
	console.log(body);
});