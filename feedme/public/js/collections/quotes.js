// quotes.js
/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Quotes = Backbone.collection.extend({
		model: app.Quote,
		
	})

	// Create our global collection of **Todos**.
	app.quotes = new Quotes();
})();
