
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var candyRouter = require('./candyRouter.js');

// Middleware
app.use(bodyParser.json()); // bodyParser middleware - parses body to create req.body that can be accessed by controllers
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Something is not working correctly... :(');
});


app.use('/candies', candyRouter);

app.listen(3000);