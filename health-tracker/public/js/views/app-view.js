// app-view.js
var app = app || {};
(function ($) {
	this._getDate = function () { console.log((new Date).toLocaleTimeString()); };

	'use strict';
	console.log("App View is alive");
	app.AppView = Backbone.View.extend( {
		el: '#foodapp',
		totalsTemplate: _.template($("#calories-view").html()),
		optionsTemplate: _.template($("#options-view").html()),
		events: {
			'keypress #new-food': 'createOnEnter',
			// 'click #clear-completed': 'clearCompleted',
			// 'click #toggle-all': 'toggleAllComplete'
		},
		initialize: function () {
			this.$input = this.$('#new-food');
			this.$list = this.$('#food-table');
			this.$optionsTable = this.$('#options-table');
			this.$caloriesDisplay = this.$('#calories-display');
			this.listenTo(app.fooditems, 'add', this.addOne);

		},
		render: function () {

		},
		createOnEnter: function (e) {
			console.log("KEYPRESS registered");
			var self = this;
			var dummy = document.createElement("li");
			dummy.innerHTML = this.$input.val();
			if (e.which === ENTER_KEY && this.$input.val().trim()) {
				console.log("ENTER_KEY registered");
				$.getJSON('http://api.nal.usda.gov/ndb/search/?format=json&q='+this.$input.val().trim()+'&sort=n&max=25&offset=0&api_key='+app.USDA_API_KEY)
				.done(function(data) {
					if (data.errors) {
						console.log("Received error for request.. ");
					} else {
						console.log(data.list.item[0]);
						$.each(data.list.item, function (idx, val) {
							console.log(val);
							self.$optionsTable.append(self.optionsTemplate(val));
						});
					}
				})
				.fail(function() {
					console.log("Failed getJSON request");
				});

				this.newfood = new app.Food({name: this.$input.val().trim(), calories:this.updateCalories(1000)})
				app.fooditems.add(this.newfood);
				this.$input.val('');
			}
		},
		updateCalories: function (c) {
			this.totalCalories = isNaN(this.totalCalories) ? c: c + this.totalCalories;
			this.$caloriesDisplay.html(this.totalsTemplate({totalCalories:this.totalCalories}));
			return c;
		},
		addOne : function () {
			var view = new app.FoodView({model: this.newfood});
			// this.view = new app.FoodView({name: "Steak", calories:1000});
			// el is the html element while $el is the jquery object 
			// console.log("Adding one, view.render.el is "view.render().el);
			this.$list.append(view.render().el);
		},

	});
		
})(jQuery);
