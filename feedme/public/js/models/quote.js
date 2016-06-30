// quote.js

var app = app || {};

(function ($) {
	app.Quote = Backbone.Model.extend({
		defaults: {
			quote: String,
			date: Date
		}
	})
})(jQuery);