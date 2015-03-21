var app = angular.module('estateLMS');

//Authentication service directive.
//determine between "login/register" or "logout" and their obvious actions
app.directive('loginService', function($location){
    function link($scope, element, attr) {
        
    }
    return {
        restrict: 'EA',
        templateUrl: './directives/login/loginTemplate.html',
        controller: 'loginController',
        link: link
    }
});