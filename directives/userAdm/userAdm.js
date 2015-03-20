var app = angular.module('estateLMS');

app.directive('userAdm', function($location){
   function link($scope, element, attr){

   }
   
   
   return {
       restrict: 'E',
       templateUrl: '/directives/userAdm/userAdm.html',
       link: link
   };
});