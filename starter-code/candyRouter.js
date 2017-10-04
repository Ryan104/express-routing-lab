'use strict'

const express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let candies = [
	{"id":1,"name":"Chewing Gum","color":"Red"},
	{"id":2,"name":"Pez","color":"Green"},
	{"id":3,"name":"Marshmallow","color":"Pink"},
	{"id":4,"name":"Candy Stick","color":"Blue"}
];

//What would need to go into candies
//in order to pass our first test?

router.get('/', function(req,res) {
	console.log("Hit / with GET : INDEX-returning all candis")
	res.json(candies);
});

// Fill out the rest of the routes here

module.exports = router;