var http = require('http');
const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var assert = require('assert');
var app = express();
var nunjucksRender = require('gulp-nunjucks-render');
var nunjucks = require('nunjucks');
var mongohost = 'localhost:27017';
var mongodbname = 'apts';
var mongourl = 'mongodb://'+mongohost+'/'+mongodbname;
var inserted_dummy = 0;
var db
// Define port to run server on
// var port = process.env.PORT || 8888 ;
app.use(express.static('.'));
app.use(express.static('js'));

// Configure Nunjucks
var _templates =   'templates' ;
nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app
} ) ;

MongoClient.connect(mongourl, (err, database) => {
	// ... start the server
	assert.equal(err, null);
	db = database;
	app.listen('8888', function() {
		console.log("I AM ALIVE!!!");
		console.log("MongoURL: "+mongourl);
	})
	console.log(db !== null);
	// db.collection(mongodbname).drop();

	var cursor = db.collection(mongodbname).find().toArray((e,r) => {
		console.log(r.length);
		if (r.length == 0){
			db.collection(mongodbname).save(dummyApt, (err, result) => {
				assert.equal(err,null);
			})
			db.collection(mongodbname).save(dummyApt2, (err, result) => {
				assert.equal(err,null);
			})

		}
	});
})

var dummyApt = {
									id: '-1',
									addr: 'mordor',
									rent: 'soul for sauron',
									posted: 'third age',
									updated: 'battle for isengard'
								},

	dummyApt2 =	{
									id: '-2',
									addr: 'the shire',
									rent: 'firecrackers',
									posted: 'third age',
									updated: 'when gandalf returned'
				};



app.get('/', function(request,response) {
	db.collection(mongodbname).find().toArray((e,r) => {
		console.log(r[0].addr)
		r.forEach ((a) => {
			// console.log(a);
		})
		response.render(__dirname+"/templates/main.html",apts=r);
	})
	

})

// gulp.task('nunjucks', function() {
//   // Gets .html and .nunjucks files in pages
//   return gulp.src('app/templates/base.html')
//   // Renders template with nunjucks
//   .pipe(nunjucksRender({
//       path: ['app/templates']
//     }))
//   // output files in app folder
//   .pipe(gulp.dest('app'))
// });

