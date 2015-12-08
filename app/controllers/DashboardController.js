angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController ($firebaseArray, $firebaseAuth) {
	var vm = this;
	vm.ref = new Firebase("https://monkeybutt.firebaseio.com");
 	vm.authData = $firebaseAuth(vm.ref);
	vm.uid = vm.ref.getAuth().uid;
	vm.poopsRef = new Firebase("https://monkeybutt.firebaseio.com/poops");
	vm.poops = $firebaseArray(vm.poopsRef);
	vm.likesRef = new Firebase("https://monkeybutt.firebaseio.com/")

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
		var poopRef = vm.poopsRef.push(vm.newPoop);
		var likesRef = vm.ref.child("likes");
		likesRef.push( {"poopID": poopRef.key(),"userID": vm.uid});

		// reset modal form inputs
		vm.newPoop.poopyPic = "";
		vm.newPoop.contentURL = "";
		vm.newPoop.keywords = "";
	};

	vm.getUserMadePoops = function() {
		console.log("calling getUserMadePoops");
		var userMadePoopsRef = vm.ref.child("poops");
    var query = userMadePoopsRef.orderByChild("createdBy").equalTo(vm.uid);
    vm.poops = $firebaseArray(query);
	};

	vm.getUserPoops = function() {
		console.log("calling getUserPoops");
		var userLikesRef = vm.ref.child("likes");
		var userQuery = userLikesRef.orderByChild("userID").equalTo(vm.uid);
		var userPoopIDs = $firebaseArray(userQuery);
		console.log("userPoopIDs",userPoopIDs);

	};

 	vm.logOut = function () {	
 		console.log("I'm LOGGING OUT!!!");
 		vm.authData.$unauth();
 	};
}
