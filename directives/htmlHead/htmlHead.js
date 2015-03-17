var app = angular.module('estateLMS');

app.directive('htmlHead', function($location){
   function link($scope, element, attr){

   }
   
   
   return {
       restrict: 'E',
       templateUrl: './directives/htmlHead/htmlHead.html',
       link: link
   };
});