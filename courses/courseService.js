var app = angular.module('estateLMS');

app.service('coursesService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray, registeredService){
    
    
    
    var firebaseUrl = envService.getEnv().firebase; 
    
    //pull individual user info from firebase
    this.getUser = function(userId){
            registeredService.register($firebaseObject(new Firebase(firebaseUrl + '/users/' + userId)));
            return $firebaseObject(new Firebase(firebaseUrl + '/users/' + userId));
    };
    
    //pull list of all courses from firebase
    this.getCourses = function(){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut')));
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut'));
    }
    
    //pull the course from the general firebase courses
    this.getACourse = function(course){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut/' + course)));
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut/' + course));
    }
    
    //location of courses to be stored against individual users
    this.userCourses = function(userId){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/users/' + userId + '/courses')));
        return $firebaseArray(new Firebase(firebaseUrl + '/users/' + userId + '/courses'));
    }


    
});


