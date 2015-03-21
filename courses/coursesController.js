var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse){
    var user = user;
    user.$bindTo($scope, 'user')
    
    $scope.courses = courses;
    
    $scope.aCourse = aCourse;

    
});