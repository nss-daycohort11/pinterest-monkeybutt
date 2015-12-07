angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController ($firebaseArray, $scope, $firebaseAuth) {
	var vm = this;
	var ref = new Firebase("https://monkeybutt.firebaseio.com");
 	$scope.ref = $firebaseAuth(ref);
	vm.ref = new Firebase("https://monkeybutt.firebaseio.com/poops");
	vm.uid = vm.ref.getAuth().uid;
	console.log("uid",vm.uid);

	vm.greeting = 'Hola Terra!';
	console.log(vm.greeting);

	vm.newPoop = {
		createdBy: vm.uid,
		poopedBy: [vm.uid],
		poopyPic: "",
		contentURL: "",
	};

 	$scope.logOut = function () {
 		$scope.ref.$unauth();
 	};

	vm.addPoop = function() {
		console.log("smearing poop ALL OVER YOUR WALL!!");
		// add poop to firebase array
		vm.poops = $firebaseArray(vm.ref);
		vm.poops.$add(vm.newPoop);
		console.log("vm.poops",vm.poops);
	};
}