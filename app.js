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
  .when('/dashboard',{
      templateUrl: 'authUser/authUser.html',
      controller: 'userController',
      resolve: {
          "currentauth": function(Auth){
              return Auth.$requireAuth();
          }
        }
  })
  .when('/dashboard/:userId',{
      templateUrl: 'authUser/authUser.html',
      controller: 'userController',
      resolve: {
          "user": function(authUserService, envService, $firebaseObject, Auth){
              var fbrul = envService.getEnv().firebase;
              var authData = Auth.$getAuth();
              var fbuserID = $firebaseObject(new Firebase(fbrul + '/users/' + authData.uid));
              var uid = fbuserID.$id;
              return authUserService.getUser(uid);
          },
          "currentauth": function(Auth){
              return Auth.$requireAuth();
          }
        }
  })
  .when('/dashboard/:userId/admin', {
        templateUrl: 'adminUser/adminUser.html',
        controller: 'adminController',
        resolve: {
          "user": function(authUserService, envService, $firebaseObject, Auth){
              var fbrul = envService.getEnv().firebase;
              var authData = Auth.$getAuth();
              var fbuserID = $firebaseObject(new Firebase(fbrul + '/users/' + authData.uid));
              var uid = fbuserID.$id;
              return authUserService.getUser(uid);   
          }  
        }
      
  })  
  .otherwise({
    redirectTo: '/'
  });
  
});