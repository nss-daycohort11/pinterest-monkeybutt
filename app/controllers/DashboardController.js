angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController ($firebaseArray, $firebaseAuth) {
	var vm = this;
	vm.ref = new Firebase("https://monkeybutt.firebaseio.com");
 	vm.authData = $firebaseAuth(vm.ref);
	vm.uid = vm.ref.getAuth().uid;
	vm.poopsRef = new Firebase("https://monkeybutt.firebaseio.com/poops");
	vm.poopsArray = $firebaseArray(vm.poopsRef);

	vm.searchText = "";
	console.log("searchText", vm.searchText);

	// clears search input on click
	vm.mooMethod = function(keyEvent) { 
    	vm.searchText = "";
	};

	vm.newPoop = {
		createdBy: vm.uid,
		poopyPic: "",
		contentURL: "",
		keywords: "",
	};

	vm.addPoop = function() {
		console.log("smearing poop ALL OVER YOUR WALL!!");
		var poopRef = vm.poopsRef.push(vm.newPoop);

		// reset modal form inputs
		vm.newPoop.poopyPic = "";
		vm.newPoop.contentURL = "";
		vm.newPoop.keywords = "";
	};

	vm.getUserMadePoops = function() {
		var userMadePoopsRef = vm.ref.child("poops");
    var query = userMadePoopsRef.orderByChild("createdBy").equalTo(vm.uid);
    vm.poopsArray = $firebaseArray(query);
	};

	vm.getUserPoops = function() {
	};

 	vm.logOut = function () {	
 		console.log("I'm LOGGING OUT!!!");
 		vm.authData.$unauth();
 	};
}
