angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController ($firebaseArray, $firebaseAuth) {
	var vm = this;
	vm.ref = new Firebase("https://monkeybutt.firebaseio.com");
 	vm.authData = $firebaseAuth(vm.ref);
	vm.uid = vm.ref.getAuth().uid;
	vm.likesRef = new Firebase("https://monkeybutt.firebaseio.com/likes");
	vm.poopsRef = new Firebase("https://monkeybutt.firebaseio.com/poops");
	vm.canvasRef = new Firebase("https://monkeybutt.firebaseio.com/canvases");
	vm.newCanvasName = "";
	vm.selectedCanvas = "";
	vm.userPoops=[];

	vm.canvasQuery = vm.ref.child("canvases").orderByChild("user").equalTo(vm.uid);
	vm.userCanvases = $firebaseArray(vm.canvasQuery);


	vm.THISPOOP = {};
	vm.poops = $firebaseArray(vm.poopsRef);

	vm.searchText = "";

	// clears search input on click
	vm.mooMethod = function(keyEvent) { 
    	vm.searchText = "";
	};

	vm.newPoop = {
		createdBy: vm.uid,
		poopyPic: "",
		contentURL: "",
		keywords: "",
		canvas: "",
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

	// pin poop to users board
	vm.pinPoop = function() {
		vm.ref.child("likes").push({
			poopID: vm.THISPOOP.$id,
			userID: vm.uid,
			canvas: vm.selectedCanvas.name,
		});
		console.log("you just pinned that poop");
	};

	vm.addCanvas = function() {
		console.log("calling addCanvas");
		vm.ref.child("canvases").push({ "name": vm.newCanvasName, "user":vm.uid });
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
		vm.userPoops = $firebaseArray(userQuery);
		vm.poops = vm.userPoops;
	};

	vm.getCanvasPoops = function(canvasName) {
		console.log("calling getCanvasPoops");
		vm.getUserPoops();
		console.log("userPoops", vm.userPoops);
		console.log("canvasName",canvasName);

		for (var poop in vm.userPoops) {
			console.log("poop",poop);
		}

		var canvasFilteredPoops = vm.userPoops.filter(function(poop) {
			console.log("poop",poop);
			if (poop.canvas === canvasName) {
				return true;
			}
			else {
				return false;
			}
		});
	};

 	vm.logOut = function () {	
 		console.log("I'm LOGGING OUT!!!");
 		vm.authData.$unauth();
 	};
}
