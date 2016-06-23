window.onload = function () {
	var model = {
	  cats : [
	        {name: 'Abby', url:'https://placekitten.com/g/220/300', cnt: 0},
	        {name: 'Betty', url:'https://placekitten.com/g/210/301', cnt: 0},
	        {name: 'Cathy', url: 'https://placekitten.com/g/240/302', cnt: 0},
	        {name: 'Donna', url: 'https://placekitten.com/g/260/303', cnt: 0},
	        {name: 'Eliza', url: 'https://placekitten.com/g/250/304', cnt:0},
	        ],
	  currentCat: null

	};
	var Cat = function(cat) {
		if (cat) {
			this.name = ko.observable(cat.name);
			this.clickCount = ko.observable(cat.cnt);
			this.imgSrc = ko.observable(cat.url);
		} else {
			this.name = ko.observable("Fiona");
			this.clickCount = ko.observable(0);
			this.imgSrc = ko.observable("https://placekitten.com/g/250/320");
		}
		this.levelStore = {
			getLevel: function (num) {
				if (num <=10) 					return "infant";
				else if (num >10 && num <= 20) 	return "toddler";
				else							return "undefined";
			}
		},
		this.level = ko.computed( function () {
			return this.levelStore.getLevel(this.clickCount());
		}, this);

	};
	var ViewModel = function () {
		var self = this; // Store the value to bypass binding context

		this.cats = ko.observableArray(model.cats.map(c => {return new Cat(c)}));
		this.currentCat = ko.observable(this.cats()[0]);
		this.incrementCounter = function () {
			self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		};
		this.setCurrentCat = function() {
			console.log("setCurrentCat: "+this.name()+" "+this.clickCount());
			self.currentCat(this);
		}
	}
	console.log("KO is alive.");
	ko.applyBindings(new ViewModel());
}