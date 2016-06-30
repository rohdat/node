'use strict';

var express = require('express');
var port 	= process.env.PORT || 8888;
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();
app.use(bodyParser());
app.use(express.static(__dirname+'/public/templates'));
app.use(express.static(__dirname+'/public'));
app.use(express.static('/public/js'));
// Configure Nunjucks
var _templates =   'templates' ;
nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app
} ) ;

var cats = [
{name: 'Abby', url:'https://placekitten.com/g/220/300'},
{name: 'Betty', url:'https://placekitten.com/g/210/301'},
{name: 'Cathy', url: 'https://placekitten.com/g/240/302'},
{name: 'Donna', url: 'https://placekitten.com/g/260/303'},
{name: 'Eliza', url: 'https://placekitten.com/g/250/304'},
];


app.get('/', function (req, res) {
    res.render(__dirname+'/public/templates/index.html', cats);
});

app.listen(8888, function () {
    console.log('Listening on port '+port+'...');
});

