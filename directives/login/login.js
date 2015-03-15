var app = angular.module('estateLMS');

//Authentication service directive.
//determine between "login/register" or "logout" and their obvious actions
app.directive('loginService', function($location){
    function link($scope, element, attr) {
        
    }
    return {
        restrict: 'EA',
        templateUrl: './directives/login/loginTemplate.html',
        controller: 'loginConroller',
        link: link
    }



/*    function link($scope, element, attr) {
            $scope.format = "MMM-d h:mm:ss"; //add " a" at the end to add AM/PM
            
            function updateTime(){
                $scope.time = Date.now();
            }
            
            $interval(function() {
                updateTime();
            }, 1000);   
        }
        return {
            restrict: 'E',
            template: '<div>{{time | date:format}}<div>',
            link: link
        }*/
});