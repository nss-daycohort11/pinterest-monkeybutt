angular
  .module('MonkeyButt', ['ngRoute'] )
  .config( function routeConfig($routeProvider) {
  
  $routeProvider
    .when('/login', {
      templateUrl: './partials/splash-login.html',
      controller: '',
      controllerAs: '',
    })
    .when('/dashboard', {
      templateUrl: './partials/dashboard.html',
      controller: '',
      controllerAs: '',
    })
    .otherwise({
      redirectTo: '/login'
    });

});