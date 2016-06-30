// options-view.js
// var app = app || {};

(function ($) {
	'use strict'
	app.OptionsView = Backbone.View.extend( {
		//the function of el is only for binding events to it
		//without el, all would be well too, except that you would not be 
		// able to use the inbuilt events key
		// el: {},
		tagName: 'tr',

		template: _.template($('#options-view').html()),

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
