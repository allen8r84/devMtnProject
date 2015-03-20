var app = angular.module('estateLMS');

app.directive('userReg', function($location){
   function link($scope, element, attr){

   }
   
   
   return {
       restrict: 'E',
       templateUrl: '/directives/userReg/userReg.html',
       link: link
   };
});