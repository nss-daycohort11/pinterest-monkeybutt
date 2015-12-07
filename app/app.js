angular
  .module('MonkeyButt', ['ngRoute', 'firebase'] )
  .config( function routeConfig($routeProvider) {
  
  $routeProvider
    .when('/login', {
      templateUrl: './partials/splash-login.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });

});