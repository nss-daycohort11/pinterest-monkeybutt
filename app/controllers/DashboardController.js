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

	vm.searchText = "";
	console.log("searchText", vm.searchText);

	// clears search input on click
	vm.mooMethod = function(keyEvent) { 
    	vm.searchText = "";
	};

	vm.newPoop = {
		createdBy: vm.uid,
		poopedBy: [vm.uid],
		poopyPic: "",
		contentURL: "",
		keywords: "",
	};

 	vm.logOut = function () {	
 		console.log("I'm LOGGING OUT!!!");
 		vm.authData.$unauth();
 	};

	vm.addPoop = function() {
		console.log("smearing poop ALL OVER YOUR WALL!!");
		// add poop to firebase array
		vm.poops.$add(vm.newPoop);
		console.log("vm.poops",vm.poops);
		
		// reset modal form inputs
		vm.newPoop.poopyPic = "";
		vm.newPoop.contentURL = "";
		vm.newPoop.keywords = "";
	};
}