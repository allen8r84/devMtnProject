var app = angular.module('estateLMS');

app.controller('loginConroller', function ($scope, $location, $window, $firebaseAuth, envService, loginService, $rootScope, $firebaseObject) {
    var firebaseUrl = envService.getEnv().firebase;
    var authObject = $firebaseAuth(new Firebase(firebaseUrl));
    var moment = $window.moment;
    $rootScope.loggedInUser = null;
    
    $scope.logIn = function(email, password) {
		authObject.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
			console.log('authData', authData);
			$rootScope.loggedInUser = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
			$location.path('/dashboard/' + $rootScope.loggedInUser.uid);
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
    
    
    $scope.showReg = function(){
        $scope.reg = !$scope.reg;
    };

});