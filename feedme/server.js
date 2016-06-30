'use strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var fp = require('path');
var app = express();
var port = process.env.PORT || 8888;

app.use(express.static(__dirname+'/public'));

app.get('/', function (req,res) {
	res.send("Hello from feedme");
})

app.listen(port, function () { console.log ("Listening on port "+port)});