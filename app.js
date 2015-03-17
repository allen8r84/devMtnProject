var app = angular.module('estateLMS',['firebase', 'ngRoute']);

app.run(function($rootScope, $location, envService) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        alert('Please Login First');
        $location.path('/');
      }
    });
    $rootScope.brandTitle = envService.getEnv().brandTitle;
});

app.factory('Auth', function($firebaseAuth, envService) {
    var ref = new Firebase(envService.getEnv().firebase);
    return $firebaseAuth(ref);
  });

app.config(function($routeProvider){
  //router here
  $routeProvider
  .when('/',{
    templateUrl: 'landing/landing.html',
    controller: 'landController'
  })
  .when('/dashboard/:userId',{
      templateUrl: 'authUser/authUser.html',
      controller: 'userController',
      resolve: {
          "currentauth": function(Auth){
              return Auth.$requireAuth();
          }
      }
  })
  .otherwise({
    redirectTo: '/'
  });
  
});