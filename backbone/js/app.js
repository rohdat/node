$(function () {
	console.log("App is alive");




	var Service = Backbone.Model.extend({
		defaults: {
			title: 'MyService',
			price: '100',
			checked: false
		},

		toggleChecked: function () {
			// this.set('checked', !this.checked));
			this.checked = !this.checked;
		}
	});

	var ServiceList = Backbone.Collection.extend({
		model: Service,
		getChecked: function () {
			return this.where({checked:true});
		}
	});

	var services = new ServiceList([
		new Service({ title: 'web development', price: 200}),
		new Service({ title: 'web design', price: 250}),
		new Service({ title: 'photography', price: 100}),
		new Service({ title: 'coffee drinking', price: 10})
	]);

	// The list element for each service
	var ServiceView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click': 'toggleService'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render : function () {
			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
			this.$('.input').prop('checked', this.model.get('checked'));
			return this;
		},
		toggleService: function () {
			this.model.toggleChecked();
		}

	});

	var AppView = Backbone.View.extend({
		el : $('#main'),

		initialize: function () {
			this.total = $('#total span'),
			this.list = $('#services'),

			this.listenTo(services, 'change', this.render),
			services.each(function(service){

				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},
		render: function(){

			// Calculate the total order amount by agregating
			// the prices of only the checked elements

			var total = 0;

			_.each(services.getChecked(), function(elem){
				total += elem.get('price');
			});

			// Update the total price
			this.total.text('$'+total);

			return this;
		}


	});

new AppView();

});