// server.js
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

mongoose.connect( 'mongodb://localhost/food_db' );

var FoodItem = new mongoose.Schema( {
	name: String,
	calories: Number
});

var FoodModel = mongoose.model('FoodItem', FoodItem);

//Where to serve static content
app.use( express.static( path.join( application_root,'../', 'public') ) );
app.use(bodyParser());

//Start server
var port = 8888;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.get('/api', function(request, response) {
	response.send("API is running..");
})

app.get('/api/foods', function (request, response) {
	return FoodModel.find (function (err, foods) {
		if (!err) {
			return response.send(foods);
		} else {
			console.log(err);
		}
	})
})

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    // app.use( express.static( path.join( application_root, '../', 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});