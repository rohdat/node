// quote-view.js
var app = app || {};

(function ($) {
	'use strict';
	
	app.QuoteView = Backbone.View.extend({
		tagName: 'div',
		// el: '#quote-view',
		template: _.template($('#quote-template').html()),
		events: {
			'click #upvote': 'upvote',
			'click #downvote': 'downvote',
			'click #delete-quote': 'delete',
			'click #quote-header' : 'edit',
			'keypress #editable': 'editOnEnter',
		},

		initialize: function () {
			this.recentView = $("#recents-list");
			this.listenTo(this.model, 'change', this.qualifyTopQuotes);

		},

		render: function () {
			this.$el.html('');
			_.extend(this.model.attributes, {parseDate: function(date) {
				this.newDate = new Date(date)
				return this.newDate.getDate() + "/" + eval(this.newDate.getMonth() + 1) + "/" + this.newDate.getFullYear();
			}})
	        this.$el.html(this.template( this.model.attributes ) );
			this.initialValue = $('#quote-header').html();
			console.log("quoteview.render: Initial value = "+this.initialValue);
			return this;
		},

		upvote: function () {
			//change the model
			console.log("upvoted! current likes: "+ this.model.likes);
			this.model.likes = this.model.get("likes") >= 0 ? this.model.get("likes") + 1: 1;
			console.log("upvoted! likes = ", this.model.likes);
			this.model.save({likes: this.model.likes});
			this.render();
		},

		downvote: function () {
			//change the model
			console.log("downvoted! current likes: "+ this.model.likes);
			this.model.likes = this.model.get('likes') > 0 ? this.model.get('likes') - 1: 0;
			console.log("downvoted! likes = ", this.model.likes);
			this.model.save({likes: this.model.likes});
			this.render();
		},
		qualifyTopQuotes: function() {
			if (this.model.likes > 4 ) {
				var q = "<p class="+this.model.get("_id")+">"+this.model.get("quote")+"</p>";
				console.log(q);
				$("."+this.model.get("_id")).remove();
				this.recentView.append(q);
			} else {
				console.log("qualifyTopQuotes: will remove");
				$("."+this.model.get("_id")).remove();
			}
		},
		edit: function () {
			console.log("edit: model editable");
			this.toggleEditor();
			
		},
		delete: function () {
			this.model.destroy();
			this.remove();
		},
		editOnEnter: function(e) {
			var self = this;
			if (e.which === ENTER_KEY) {
				this.toggleEditor();
				var edited = $('#editable-input').val();
				// console.log("editOnEnter: Edited: "+edited+" Old: "+$('#quote-header').html());
				//if no change to quote, don't put to server
				if ($('#quote-header').html() != edited) {
					this.model.quote = edited;
					console.log("The edited value = "+this.model.quote);
					this.model.save({quote: edited});
					this.render();
				}
			}
		},
		toggleEditor: function () {
				$("#editable").toggleClass('hide');
				$("#quote-header").toggleClass('hide');
		}

	})
})(jQuery);
