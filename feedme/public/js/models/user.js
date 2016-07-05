// user.js

var app = app || {};

(function ($) {
	app.User = Backbone.Model.extend({
		defaults: {
			username: "__defaultUser__",
			password: "__password__"
		},
		idAttribute: "_id",
	})
})(jQuery);