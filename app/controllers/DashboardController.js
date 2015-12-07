angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);


	function DashboardController ($scope, $firebaseAuth) {
		var vm = this;
		var ref = new Firebase("https://monkeybutt.firebaseio.com");

		vm.greeting = 'Hola Terra!';
		console.log(vm.greeting);

		vm.newPoop = {
			createdBy: "",
			poopedBy: [],
			imageURL: "",
			contentURL: "",
		};

	

    	$scope.ref = $firebaseAuth(ref);

    	$scope.logOut = function () {
    		$scope.ref.$unauth();
    	};


		vm.addPoop = function() {
			console.log("smearing poop ALL OVER YOUR WALL!!");
		};
}