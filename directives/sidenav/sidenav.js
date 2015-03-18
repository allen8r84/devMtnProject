var app = angular.module('estateLMS');

app.directive('sidenav', function($location){
   function link($scope, element, attr){

   }
   
   
   return {
       restrict: 'E',
       templateUrl: './directives/sidenav/sidenav.html',
       link: link
   };
});