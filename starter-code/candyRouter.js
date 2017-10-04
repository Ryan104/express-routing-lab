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

// INDEX
router.get('/', (req,res) => {
	console.log("Hit INDEX route - returning all candies");
	res.json(candies);
});


// SHOW
router.get('/:id', (req, res) => {
	console.log("Hit SHOW route - returning a candy");
	// the id requested can be found in the req.params
	let candyId = req.params.id;

	let candy = candies.filter((el) => {
		return el.id == candyId; // find the candy with the requested id and return it
	});

	res.json(candy[0]); // send the user the requested candy
});


// UPDATE
router.put('/:id', (req, res) => {
	console.log("Hit UPDATE route - updating a candy");
	let candyId = req.params.id;
	console.log(req.body);

	candies = candies.map((el) => {
		if (el.id == candyId){
			let updatedCandy = req.body;
			updatedCandy.id = el.id;
			return updatedCandy;
		} else {
			return el;
		}
	});

	res.send('Candy updtated');

});

// CREATE

// DESTROY

module.exports = router;