var app = angular.module('estateLMS');

app.directive('navbar', function(){
   return {
       restrict: 'E',
       templateUrl: './directives/navbar/navbar.html'
   };
});