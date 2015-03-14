var app = angular.module('estateLMS',['firebase', 'ngRoute']);

app.config(function($routeProvider){
  //router here
  $routeProvider
  .when('/',{
    templateUrl: 'landing/landing.html',
    controller: 'landController',
  })
  .when('/teams/:team',{
      templateUrl: 'js/teams/teamTmpl.html',
      controller: 'teamCtrl',
  })
  .otherwise({
    redirectTo: '/'
  });
});