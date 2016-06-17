app.controller('meetupController', ['$scope', '$resource', ($scope, $resource) => {
	$scope.meetups = [
		{ name : "Meetup one"},
		{ name : "Meetup TWO"}
	];
	$scope.createMeetup = function () {
		$scope.meetups.push({name: $scope.meetupName});
		$scope.meetupName = '';
	}
}])
