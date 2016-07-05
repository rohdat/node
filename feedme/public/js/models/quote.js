// quote.js

var app = app || {};

(function ($) {
	app.Quote = Backbone.Model.extend({
		defaults: {
			quote: "Dummy String",
			likes: 0,
			date: Date.now(),
		},
		idAttribute: "_id",
		parseDate: function() {
			return this.date;
		}

	})
})(jQuery);