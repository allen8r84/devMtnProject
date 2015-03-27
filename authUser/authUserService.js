var app = angular.module('estateLMS');

app.service('authUserService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray, registeredService){
    var firebaseUrl = envService.getEnv().firebase; 
    
    this.getUser = function(userId){
            registeredService.register($firebaseObject(new Firebase(firebaseUrl + '/users/' + userId)));
            return $firebaseObject(new Firebase(firebaseUrl + '/users/' + userId));
    };
    
    this.groupMessages = function(){
        registeredService.register($firebaseArray(new Firebase(firebaseUrl + '/groupMessages')));
        return $firebaseArray(new Firebase(firebaseUrl + '/groupMessages'));
    };
    
});


