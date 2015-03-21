var app = angular.module('estateLMS');

app.service('authUserService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray){
    var firebaseUrl = envService.getEnv().firebase; 
    
    this.getUser = function(userId){
            return $firebaseObject(new Firebase(firebaseUrl + '/users/' + userId));
    };
    
    this.groupMessages = function(){
        return $firebaseArray(new Firebase(firebaseUrl + '/groupMessages'));
    };
    
});


