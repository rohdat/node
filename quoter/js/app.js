var model = {
quoteStore : [

]
};

window.onload = function () {
	var Quote = function (q) {
		this.q = ko.observable(q.quote);
	}
	function AppViewModel() {
		var self = this;
		this.quoteArray = ko.observableArray(model.quoteStore.map(q => new Quote(q)));
		this.quoteInput = ko.observable("");
		this.newQuote = function() {
			self.quoteArray.push({
				quote : this.quoteInput()
			});
			console.log("Quote entered: "+this.quoteInput())
			self.quoteInput("")
		};
	}
	ko.applyBindings(new AppViewModel());

}