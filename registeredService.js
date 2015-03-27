var app = angular.module('estateLMS');    
    
app.service('registeredService', function(envService, $firebaseObject, $timeout, $rootScope, $location, $firebaseArray){
    var registered = [];
    this.register = function(obj){
      registered.push(obj);
      return obj;
    };
    
    this.unRegister = function(){
      for(var i = 0; i < registered.length; i++){
          registered[i].$destroy();
      }
    };
    
}); 