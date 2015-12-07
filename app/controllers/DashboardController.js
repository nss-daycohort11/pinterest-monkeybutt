angular
	.module("MonkeyButt")
	.controller('DashboardController', DashboardController);

function DashboardController () {
	var vm = this;

	vm.greeting = 'Hola Terra!';
	console.log(vm.greeting);

	vm.newPoop = {
		createdBy: "",
		poopedBy: [],
		imageURL: "",
		contentURL: "",
	};



	vm.addPoop = function() {
		console.log("smearing poop ALL OVER YOUR WALL!!");
		
	};
}