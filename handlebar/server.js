'use strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var fp = require('path');
var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: relative('views/index'),
	partialsDir : relative('../views/partials'),
	layoutsDir  : relative('../views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', relative('/views'));

app.get('/', function (req, res) {
    res.render('index', {name: "Here's Johnny!"});
});

app.get('/iwillcook', function (req, res) {
	res.render('layouts/cook');
});

app.get('/iwilleat', function (req, res) {
	res.render('eat');
});
app.listen(8888);

function relative(path) {
  return fp.join(__dirname, path);
}