var app = angular.module('estateLMS');

app.directive('navbar', function($location){
   function link($scope, element, attr){

   }
   
   
   return {
       restrict: 'E',
       templateUrl: './directives/navbar/navbar.html',
       link: link
   };
});