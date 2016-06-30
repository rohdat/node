// food-view.js
var app = app || {};

(function ($) {
	'use strict'
	app.FoodView = Backbone.View.extend( {
		tagName: 'tr',

		template: _.template($('#food-item-view').html()),

		events: {

		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	

})(jQuery);
