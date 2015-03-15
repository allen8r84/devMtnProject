var app = angular.module('estateLMS');

app.controller('loginConroller', function ($scope, $location, envService, $window, $firebaseArray, $firebaseObject, $firebaseAuth, $timeout) {
    var firebaseUrl = envService.getEnv().firebase;
    var authObject = $firebaseAuth(new Firebase(firebaseUrl));
    var moment = $window.moment;
    
    $scope.logIn = function(email, password) {
		authObject.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
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
			var userEmail = email,
				uid = authData.uid,
				user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + uid));
			
			console.log('authData', authData);

			$timeout(function() {
				user.email = userEmail;
				user.uid = uid;
				user.created = moment().format();
				user.fName = $scope.fName;
				user.lName = $scope.lName;
				user.lastLogon = moment().format();
				user.$save().then(function(success) {
					console.log('success', success);
				}, function(error) {
					console.log('error', error);
				});		
			});

		}, function(error) {
			console.log('error', error);
		});	
	};
    
    
    $scope.showReg = function(){
        $scope.reg = !$scope.reg;
    };

});