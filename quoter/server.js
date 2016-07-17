'use strict'
var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8888,
	bodyParser = require('body-parser'),
	mongoose = require( 'mongoose' );

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var Quote = new mongoose.Schema({
    quote: String,
    date: Number,
    likes: Number,
    username: String
});

//Models
var QuoteModel = mongoose.model( 'Quote', Quote );

//perform route lookup based on url and HTTP method
// app.use( app.router );

//Show all errors in development
// app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

app.use(express.static(__dirname+'/public'));
app.use('/scripts', express.static(__dirname+'/node_modules'));
app.use('/fonts', express.static(__dirname+'/node_modules/bootsrap/dist/fonts'));
app.use(bodyParser());
app.get('/', function (req,res) {
	res.sendFile(__dirname+"/index.html");
});

app.get('/api/quotes', function (req, res){
	console.log("Hello from api");
	return QuoteModel.find((err, quotes) => {
		if (!err) {
			return res.send(quotes);
		} else {
			return console.log("Error while reading db: "+err);
		}
	})
	res.send("Hello from api");
});

app.post('/api/quotes', function (req, res){
	var quote = new QuoteModel({
		quote: req.body.quote,
		date: req.body.date,
		username: req.body.username,
		likes: req.body.likes,
	});
	return quote.save((err) => {
		if (!err) {
			console.log("POST")
			console.dir(req.body);
			return res.send(quote);
		} else {
			return console.log("Error while writing db: "+err);
		}
	})
	res.send("Hello from api");
});

app.put('/api/quotes/:id', function(req,res) {
	console.log("app.put id = "+req.params.id);
	return QuoteModel.findById( req.params.id, function (err, q) {
		var prevQuote = q.quote;
		q.quote = req.body.quote;
		q.likes = req.body.likes;
		if (!err) {
			// if (q) { console.log("Found by id: "+req.params.id+
				// " q= "+prevQuote+
				// " -> "+q.quote)}
			return q.save(function (err) {
				if (!err) {
					console.log("PUT")
					console.dir(req.body);
				} else {
					console.log("Quote failed to update");
				}
			return res.send(q);
			})
		} else {
			console.log("error accessing put request");
		}
		
	})
});

app.delete('/api/quotes/:id', function (req, res) {
	console.log( 'Deleting quote with id: ' + req.params._id );
	// return response.send('dummy delete');
    return QuoteModel.findById( req.params.id, function( err, q ) {
        return q.remove( function( err ) {
            if( !err ) {
                console.log( 'Quote removed' );
                return res.send( '' );
            } else {
                console.log( err );
            }
        });
    });
})

app.listen(port, function () { console.log ("Listening on port "+port)});