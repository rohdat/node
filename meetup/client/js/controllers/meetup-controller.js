app.controller('meetupController', ['$scope', '$resource', ($scope, $resource) => {
	var Meetup = $resource('/api/meetups');
	$scope.meetups = [
		{ name : "Meetup one"},
		{ name : "Meetup TWO"}
	];
	$scope.createMeetup = function () {
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		$scope.meetupName = '';
	}
}])
