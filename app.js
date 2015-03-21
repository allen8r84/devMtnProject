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
          currentauth: function(Auth){
              return Auth.$requireAuth();
          },
          user: function(authUserService, envService, $firebaseObject, Auth){
              var fbrul = envService.getEnv().firebase;
              var authData = Auth.$getAuth();
              var fbuserID = $firebaseObject(new Firebase(fbrul + '/users/' + authData.uid));
              var uid = fbuserID.$id;
              return authUserService.getUser(uid);
          },
          groupMessage: function(authUserService) {
              return authUserService.groupMessages();
          },
          courses: function(coursesService){
              return coursesService.getCourses();
          }
        }
  })
    .when('/dashboard/:userId/:courseName',{
      templateUrl: '/courses/courses.html',
      controller: 'coursesController',
      resolve: {
          currentauth: function(Auth){
              return Auth.$requireAuth();
          },
          user: function(coursesService, envService, $firebaseObject, Auth){
              var fbrul = envService.getEnv().firebase;
              var authData = Auth.$getAuth();
              var fbuserID = $firebaseObject(new Firebase(fbrul + '/users/' + authData.uid));
              var uid = fbuserID.$id;
              return coursesService.getUser(uid);
          },
          courses: function(coursesService){
              return coursesService.getCourses();
          },
          aCourse: function(coursesService, $route) {
              return coursesService.getACourse($route.current.params.courseName);
          }
        }
    })
  .otherwise({
    redirectTo: '/'
  });
  
});