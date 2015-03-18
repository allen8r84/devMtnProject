var app = angular.module('estateLMS');

app.controller('loginConroller', function ($scope, $location, $window, $firebaseAuth, envService, loginService, $rootScope, $firebaseObject, $timeout) {
    var firebaseUrl = envService.getEnv().firebase;
    var authObject = $firebaseAuth(new Firebase(firebaseUrl));
    var moment = $window.moment;
    
    authObject.$onAuth(function(authData) {
        if (authData) {
         $rootScope.loggedInUser = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
        } else {
          $rootScope.loggedInUser = null;
        }
      })
    
    $scope.logIn = function(email, password) {
		authObject.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
			var user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
           user.$loaded().then(function(user){
                $scope.uid = user.uid;
                $location.path('/dashboard/' + $scope.uid)
            })
			console.log('authData', authData);
			
		}, function(error) {
			console.log('error', error);
		});
	};
	
	$scope.register = function(email, password) {
		authObject.$createUser({
			email: email,
			password: password
		}).then(function(authData) {
			return authObject.$authWithPassword({
				email: email,
				password: password
			});
		}).then(function(authData) {
            loginService.registerUser(email, authData, $scope.fName, $scope.lName);
		}, function(error) {
			console.log('error', error);
		});	
	};
	
	$scope.logOut = function() {
	    authObject.$unauth();
	    delete $rootScope.loggedInUser;
	    $location.path('/');
	};
	
	$scope.dashboard = function(){
	    $location.path('/dashboard/' + $rootScope.loggedInUser.uid);
	}
    
    
    $scope.showReg = function(){
        $scope.reg = !$scope.reg;
    };

});