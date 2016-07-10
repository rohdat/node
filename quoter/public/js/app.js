jQuery(function($) {
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	console.log("App is alive");
	var util = {
		// Every location is randomized so will not repeat ids
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		//uses localstorage, a key-value store, similar to sessionstorage.
		// if no data provided, acts as a get
		// else acts as a set
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};
	var App = {
		init: function() {
			//initialize templates
			//set bindings for buttons etc
			//set routes if any
			//initialize data
			this.quoteTemplate = Handlebars.compile($('#quote-view-template').html());
			this.quotes = util.store('quotes-store');
			this.bindEvents();
		},
		bindEvents: function () {
			console.log("BindEvents");
			$('#new-quote').on('keyup', this.create.bind(this));
			$('#quote-view').on('mouseover', this.showDel.bind(this));
			$('#quote-view').on('click','#delete-indicator', this.delete.bind(this));
			// $('#quote-view').on('mouseout', '.todaysquote', this.showDel.bind(this));
			$('#quote-view').on('click', '#upvote', this.vote.bind(this));
			$('#quote-view').on('click', '#downvote', this.vote.bind(this));
		},
		render: function () {
			console.log("Render");
			$('#quote-view').html(this.quoteTemplate(this.getAQuote()));
			util.store('quotes-store', this.quotes);
		},
		create: function (e) {
			// commit to memory
			// render on page
			var $input = $(e.target);
			var val = $input.val().trim();
			if (e.which !== ENTER_KEY || !val) {
				return;
			}
			console.log("Received input: "+val);
			var id = Math.ceil(Math.random()*1000);
			this.quotes.push({
				id: util.uuid(),
				quote: val,
				likes: 0
			});
			// localStorage.setItem(id, JSON.stringify(val));
			$input.val('');
			console.log("Create");
			this.render();
		},
		getAQuote: function() {
			return this.quotes[this.quotes.length-1];
		},
		indexFromEl: function (id) {
			var quotes = this.quotes;
			var i = quotes.length;

			while (i--) {
				if (quotes[i].id === id) {
					return i;
				}
			}
		},
		delete: function (el) {
			var $el = $(el.target).siblings();
		},
		destroy: function (id) {
			this.quotes.splice(this.indexFromEl(id), 1);
			this.render();
		},
		vote: function(el) {
			var myid = $(el.target).parent().attr('id');
			var updown = $(el.target).attr('id') === 'upvote' ? 1 : -1;
			var idx = this.indexFromEl(myid);
			if (!idx) { console.log("Element not found! id: "+myid);return;}
			var myquote = this.quotes[idx];
			myquote.likes += updown;
			this.quotes[idx] = myquote;
			this.render();
			console.log('Upvote: '+myid+" quote: "+myquote.quote);
		},
		showDel: function (el) {
			$(el.target).siblings('#delete-indicator').toggleClass('hide');
			console.log("el: "+$(el.target).attr('id'));
		}
	};

	App.init();

});