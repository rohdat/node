app.controller('meetupController', ['$scope', '$resource', function($scope, $resource){
	var Meetup = $resource ('/api/meetups');

	Meetup.query(function(results) {
		$scope.meetups = results;
	})
	// $scope.meetups = [
	// 	{ name : "Meetup one"},
	// 	{ name : "Meetup TWO"}
	// ];
	$scope.createMeetup = function () {
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		meetup.$save(function (result) {
			$scope.meetups.push(result);
		});
		// $scope.meetups.push({name: $scope.meetupName});
		$scope.meetupName = '';
	}
}])
