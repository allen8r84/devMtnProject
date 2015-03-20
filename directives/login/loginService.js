var app = angular.module('estateLMS');

app.service('loginService', function(envService, $firebaseObject, $timeout, $rootScope, $location){
    var firebaseUrl = envService.getEnv().firebase; 
    
    
    this.registerUser = function(email, authData, fName, lName){
        	console.log(fName)
        	debugger
        	var userEmail = email;
			var	uid = authData.uid;
			var	user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + uid));
               console.log(user); 
                $rootScope.loggedInUser = user;    
        console.log($rootScope.loggedInUser);
            debugger
			$timeout(function() {
				user.email = userEmail;
				user.uid = uid.replace('simplelogin:', moment().format('YYYYMMDs'));
				user.created = moment().format();
				user.fName = fName;
				user.lName = lName;
				user.role = 'uUser';
				user.logInCount = 1;
				user.lastLogon = moment().format();
				user.$save().then(function(success) {
					/*console.log('success', success);*/
				}, function(error) {
					console.log('error', error);
				});		
			});
    }
    
});