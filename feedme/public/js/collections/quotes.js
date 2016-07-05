// quotes.js
/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Quotes = Backbone.Collection.extend({
		model: app.Quote,
		url: '/api/quotes',
		getRecent: function(num) {
			console.log("getRecent quotes "+ this.models.length);
			var filter = this.filter(function (q) {
				return q.get('likes') > 3;
			});
			console.log("getRecent list length: "+filter.length)
			return filter;
			// return new Quotes(filter);
		},
	})

	// Create our global collection of **Todos**.
	app.quotes = new Quotes();
})();
