angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController ($firebaseArray, $firebaseAuth) {
	var vm = this;
	vm.ref = new Firebase("https://monkeybutt.firebaseio.com");
 	vm.authData = $firebaseAuth(vm.ref);
	vm.poopsRef = new Firebase("https://monkeybutt.firebaseio.com/poops");
	vm.poops = $firebaseArray(vm.poopsRef);
	console.log("poops",vm.poops);
	vm.uid = vm.ref.getAuth().uid;
	vm.likesRef = new Firebase("https://monkeybutt.firebaseio.com/likes");
	vm.newPoop = {
		createdBy: vm.uid,
		poopedBy: [vm.uid],
		poopyPic: "",
		contentURL: "",
	};

 	vm.logOut = function () {
 		vm.authData.$unauth();
 	};

	vm.addPoop = function() {
		console.log("smearing poop ALL OVER YOUR WALL!!");
		// add poop to firebase array
		vm.poops.$add(vm.newPoop);
		console.log("vm.poops",vm.poops);
	};
	// pin poop to users board
	vm.pinPoop = function(poop) {
		vm.likesRef.push({poopID: poop.$id, userID: vm.uid});
		console.log("poop:", poop.$id);
		console.log("you just pinned that poop");
	};
}