var app = angular.module('estateLMS');

app.controller('loginController', function ($scope, $location, $window, $firebaseAuth, envService, loginService, $rootScope, $firebaseObject, $timeout, registeredService) {
    var firebaseUrl = envService.getEnv().firebase;
    var authObject = $firebaseAuth(new Firebase(firebaseUrl));
    var moment = $window.moment;
    $scope.reg2 = true;
    
    $scope.states = [
        {label: 'Utah', value: 'ut'},
        {label: 'California', value: 'ca'},
        {label: 'Idaho', value: 'id'},
        {label: 'Arizona', value: 'az'}
    
    ];
    $scope.stateInitial = $scope.states[0];
    
    
    $scope.logIn = function(email, password) {
		authObject.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
			var user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
            user.$loaded().then(function(user){
                var uid = user.uid;
                user.lastLogon = moment().format();
                user.logInCount = user.logInCount + 1;
                user.$save().then(function(success) {
					/*console.log('success', success);*/
				}, function(error) {
					console.log('error', error);
				});
                $location.path('/dashboard/' + uid)
            })
			
		}, function(error) {
			console.log('error', error);
		});
		$scope.email = null;
		$scope.password = null;
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
            var sLineTwo = $scope.sLineTwo;
            var tel = $scope.tel;
            var lNumber = $scope.lNumber;
            if(!$scope.sLineTwo){
                sLineTwo = "";
            }
            if(!$scope.tel){
                tel = "";
            }
            if(!$scope.lNumber){
                lNumber = "";
            }
            
            loginService.registerUser(email, authData, $rootScope.fName, $rootScope.lName, $scope.sLineOne, sLineTwo, $scope.city, $scope.stateInitial.value, $scope.zip, tel, lNumber);
            var user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + authData.uid));
            user.$loaded().then(function(user){
                var uid = user.uid;
                $location.path('/dashboard/' + uid)
            })
		}, function(error) {
			
			/*console.log('error', error);*/
		});	
	};
	
	$scope.logOut = function() {
	    authObject.$unauth()
        /*registeredService.unRegister();*/
        $location.path('/');
	};
	
	$scope.dashboard = function(){
	    var path = '/dashboard/' + $rootScope.loggedInUser.uid;
	    if($location.path() === path){
	        $scope.reg2 = true;
	    }else{
	       $location.path('/dashboard/' + $rootScope.loggedInUser.uid);
	       $scope.reg2 = true;
	    }
	}
	
	$scope.isadmin = function(){
        if($location.path() !== '/dashboard/' + $rootScope.loggedInUser.uid){
            $location.path('/dashboard/' + $rootScope.loggedInUser.uid);
        }
        $scope.reg2 = false;
    }
	
	
    
    
    $scope.showReg = function(){
        $scope.reg = !$scope.reg;
    };

});