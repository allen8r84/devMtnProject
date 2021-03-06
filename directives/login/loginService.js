var app = angular.module('estateLMS');

app.service('loginService', function(envService, $firebaseObject, $timeout, $rootScope, $location){
    var firebaseUrl = envService.getEnv().firebase; 
    
    
    this.registerUser = function(email, authData, fName, lName, sLineOne, sLineTwo, city, state, zip, tel, lNumber){
        	var userEmail = email;
			var	uid = authData.uid;
			var	user = $firebaseObject(new Firebase(firebaseUrl + "/users/" + uid));

			$timeout(function() {
				user.email = userEmail;
				user.uid = uid.replace('simplelogin:', moment().format('YYYYMMDs'));
				user.created = moment().format();
				user.fName = fName;
				user.lName = lName;
				user.role = 'uUser';
				user.logInCount = 1;
				user.lastLogon = moment().format();
				user.sLineOne = sLineOne;
				user.sLineTwo = sLineTwo;
				user.city = city;
				user.state = state;
				user.zip = zip;
				user.tel = tel;
				user.lNumber = lNumber;
				user.$save().then(function(success) {
					/*console.log('success', success);*/
				}, function(error) {
					console.log('error', error);
				});		
			});
    }
    
});