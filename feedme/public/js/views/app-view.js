// app-view.js
/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';
	console.log("AppView is alive");
	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({
		el: '.quoteapp',
		events: {
			'click .get-new-quote': 'getNewQuote',
		},
		initialize: function () {
			console.log("initialize AppView");
			this.render();

		},
		render: function () {
			console.log("render AppView");
		},
		getNewQuote: function () {
			alert("new quote wanted!");
		}
	});
})(jQuery);
