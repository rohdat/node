// food-items.js
var app = app || {};

(function () {
	'use strict';

	var FoodItems = Backbone.Collection.extend({
		model : app.Food,
		url: '/#',
	})
	app.fooditems = new FoodItems;
})();