var app = angular.module('estateLMS');

app.service('coursesService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray, registeredService){
    
    
    
    var firebaseUrl = envService.getEnv().firebase; 
    
    this.getUser = function(userId){
            registeredService.register($firebaseObject(new Firebase(firebaseUrl + '/users/' + userId)));
            return $firebaseObject(new Firebase(firebaseUrl + '/users/' + userId));
    };
    
    this.getCourses = function(){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut')));
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut'));
    }
    
    this.getACourse = function(course){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut/' + course)));
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut/' + course));
    }
    
    this.userCourses = function(userId){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/users/' + userId + '/courses')));
        return $firebaseArray(new Firebase(firebaseUrl + '/users/' + userId + '/courses'));
    }

});


