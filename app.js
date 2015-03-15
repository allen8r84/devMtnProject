var app = angular.module('estateLMS',['firebase', 'ngRoute']);

app.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }
    });
});

app.config(function($routeProvider){
  //router here
  $routeProvider
  .when('/',{
    templateUrl: 'landing/landing.html',
    controller: 'landController'
  })
  .when('/dashboard',{
      templateUrl: 'authUser/authUser.html',
      controller: 'userController'/*,
      resolve: {
          "currentauth": function(authUrl){
              return authUrl.$requireAuth();
          }
      }*/
  })
  .otherwise({
    redirectTo: '/'
  });
  
});