// quote-view.js
var app = app || {};

(function ($) {
	'use strict';
	
	app.QuoteView = Backbone.View.extend({
		el: '.quote-view',
		template: _.template($('#quote-template').html()),
		events: {
			'click .upvote': 'upvote',
			'click .downvote': 'downvote',
		},

		initialize: function () {

		},

		render: function () {

		},

		upvote: function () {
			//change the model
			alert("upvoted!");
		},

		downvote: function () {
			//change the model
			alert("downvoted!");
		},

	})
})(jQuery);
