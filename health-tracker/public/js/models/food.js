// food.js
var app = app || {};

(function () {
	'use strict';

	app.Food = Backbone.Model.extend({
		defaults: {
			name: "Water",
			calories: 0,
		},
	})

})();