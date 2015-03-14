var app = angular.module('estateLMS');

//time directive set to insert a clock anywhere with an element tag.
// format of the time is adjusted in line 7 ont the $scope.format variable (https://docs.angularjs.org/api/ng/filter/date).
app.directive('theTime', function($interval){
    function link($scope, element, attr) {
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
            template: '<div>{{time | date:format}}</div>',
            link: link
        }
});