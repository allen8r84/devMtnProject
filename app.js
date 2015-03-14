var app = angular.module('estateLMS',['firebase', 'ngRoute']);

app.config(function($routeProvider){
  //router here
  $routeProvider
  .when('/',{
    templateUrl: 'landing/landing.html',
    controller: 'landController',
  })
  .when('/dashboard',{
      templateUrl: 'authUser/authUser.html',
      controller: 'userController',
  })
  .otherwise({
    redirectTo: '/'
  });
  
});