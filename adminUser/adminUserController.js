var app = angular.module('estateLMS');

app.controller('adminController', function($scope, user){
    $scope.hello = "hello there loggedin User!";
    var user = user;
    user.$bindTo($scope, 'user')
});