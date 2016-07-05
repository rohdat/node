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
		el: '#quoteapp',
		events: {
			'click #get-new-quote': 'getNewQuote',
			'keypress #write-new-quote': 'postNewQuote',
		},
		initialize: function () {
			console.log("initialize AppView");
			this.newQuoteInput = $('#write-new-quote');
			this.quoteLocation = $('#quote-view');
			this.listenTo(app.quotes, 'remove', this.showAQuote);
			// this.listenTo(app.quotes, 'change', this.showRecentQuotes);
			this.recentView = $("#recents-list");
			this.render();
		},
		render: function () {
			if (app.quotes.length) {
				console.log("render: Quotes are present");
			} else {
				console.log("render: I am uninspired");
			}
			this.showAQuote();

			return this;
		},
		getNewQuote: function () {
			this.showAQuote();
		},
		postNewQuote: function (e) {
			var self = this;
			if (e.which == ENTER_KEY) {
				var newQuote = {quote: self.newQuoteInput.val().trim()};
				if (newQuote.quote == '') { newQuote.quotes="\n";}
				console.log(newQuote);
				console.log("postNewQuote: That's a nice quote!");
				// app.quotes.add(new app.Quote({quote: newQuote}));
				app.quotes.create(newQuote);
				self.newQuoteInput.val('');
				self.render();
			}
		},
		showRecentQuotes: function () {
			var self = this;
			var recents = app.quotes.getRecent(4);
			console.log("showRecentQuotes: filtered num : "+recents.length);
			_.each(recents, function (q) {
				self.recentView.append("<p>"+q.attributes.quote+"</p>");
			});
		},
		showAQuote: function() {
			var self = this;
			// console.log("showAQuote called");
			if (app.quotes.length) {
				var idx = Math.round(Math.random()*(app.quotes.length-1));
				// console.log("showAQuote: app.quotes.length "+app.quotes.length+"idx: "+idx);
				var aQuote = app.quotes.at(idx);
				// console.log("showAQuote: Will show one quote "+ aQuote);
				var showQuote = new app.QuoteView({
					'model': aQuote
				});
				self.quoteLocation.html(showQuote.render().el);
				// self.showRecentQuotes();

			} else {
				app.quotes.fetch({success: function () {
					if (app.quotes.length>0) {
						self.showAQuote();
					}
				}});
				
			}
		},
	});
})(jQuery);
