var app = angular.module('estateLMS');

app.service('coursesService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray){
    var firebaseUrl = envService.getEnv().firebase; 
    
    this.getUser = function(userId){
            return $firebaseObject(new Firebase(firebaseUrl + '/users/' + userId));
    };
    
    this.getCourses = function(){
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut'));
    }
    
    this.getACourse = function(course){
        return $firebaseArray(new Firebase(firebaseUrl + '/courses/state/ut/' + course + '/1'));
    }

});


