var app = angular.module('estateLMS',['firebase', 'ngRoute', 'ui.bootstrap']);

app.run(function($rootScope, $location, envService, Auth, loginService, $firebaseObject, registeredService, $timeout) {
    //stop Quiz Timer when leaving the course training url
    $rootScope.$on('$routeChangeStart', function(event, next, previous, error){
        $timeout.cancel($rootScope.mytimeout);
    });
    
    //auth verification
    var firebaseUrl = envService.getEnv().firebase;
    Auth.$onAuth(function(authData) {
        if (authData) {
            $rootScope.loggedInUser = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
            console.log("Logged in as:", authData.uid);
        }else {
        console.log("Logged out");
            registeredService.unRegister();
            $location.path('/');
            $rootScope.loggedInUser = null;
  }
});
    $rootScope.brandTitle = envService.getEnv().brandTitle;
    
});

app.service('Auth', function($firebaseAuth, envService) {
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
          aCourse: function(coursesService, $route, envService) {
              return coursesService.getACourse($route.current.params.courseName);
          }
        }
    })
  .otherwise({
    redirectTo: '/'
  });
  
});