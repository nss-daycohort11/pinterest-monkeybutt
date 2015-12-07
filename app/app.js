angular
  .module('MonkeyButt', ['ngRoute', 'firebase'] )
  .config( function routeConfig($routeProvider) {
 

  $routeProvider
    .when('/login', {
      templateUrl: './partials/splash-login.html',
      controller: 'LoginCtrl'
    })
    .when('/dashboard', {
      templateUrl: './partials/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl',
    })
    .otherwise({
      redirectTo: '/login'
    });

});