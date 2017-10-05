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

let idCount = 4;

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
	const candyId = req.params.id;

	const keys = Object.keys(req.body);

	if (keys.indexOf('name') >= 0 && keys.indexOf('color') >= 0){
		candies = candies.map((el) => {
			if (el.id == candyId){
				let updatedCandy = el;

				// Update the candy with whatever keys were given
				keys.forEach((key) => {
					updatedCandy[key] = req.body[key];
				});
				// dont let id be overriden
				updatedCandy.id = Number(candyId);

				// replace the candy with the updated candy
				return updatedCandy;
			} else {
				return el;
			}
		});

		res.send('Candy updated');
	} else {
		res.status(422).send('Please include both name and color');
	}

	
});

// CREATE
router.post('/', (req, res) => {
	console.log("Hit CREATE route - posting new candy");
	let newCandy =  req.body;
	const keys = Object.keys(req.body);

	if (keys.indexOf('name') >= 0 && keys.indexOf('color') >= 0){
		// give the new candy a unique ID
		newCandy.id = ++idCount;

		candies.push(newCandy);

		res.send(JSON.stringify(newCandy));
	} else {
		res.status(422).send('Please include both name and color');
	}
});

// DESTROY
router.delete('/:id', (req, res) => {
	const candyId = req.params.id;
	candies = candies.filter((candy) => {
		return candy.id != candyId;
	});

	res.send(JSON.stringify({message: "deleted"}));
});

module.exports = router;
