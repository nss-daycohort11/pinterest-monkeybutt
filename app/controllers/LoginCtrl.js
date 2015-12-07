angular.module("MonkeyButt").controller("LoginCtrl", ["$scope", "$firebaseAuth", "$location", function ($scope, $firebaseAuth, $location) {
	var ref = new Firebase("https://monkeybutt.firebaseio.com");

    $scope.authObj = $firebaseAuth(ref);
    $scope.userObj = {};
    
    $scope.registerUser = function () {

        console.log("$scope.userObj", $scope.userObj);

        $scope.authObj.$createUser($scope.userObj)
        .then(function(userData) {
          console.log("User " + userData.uid + " created successfully!");
          $scope.loginUser();
          $location.path('/dashboard');
    	}).catch(function(error) {
    		console.error("Error: ", error);
    	});
    };

    $scope.loginUser = function () {
    	$scope.authObj.$authWithPassword($scope.userObj)
    	.then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $location.path('/dashboard');
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    };

    $scope.authObj.$onAuth(function(authData) {
    	if (authData) {
    	console.log("Logged in as:", authData.uid);
    	$location.path('/dashboard');
    	} else {
    		console.log("Logged Out");
    	}
    });

}]);