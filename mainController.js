var app = angular.module('estateLMS');

app.controller('MainController', function($scope){
    $scope.hello = "hello there!";
    $scope.timeFormat = 'MMM-d h:mm:ss a';
});