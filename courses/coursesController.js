var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject){
    var firebaseUrl = envService.getEnv().firebase; 
    
    var user = user;
    user.$bindTo($scope, 'user')
    
    $scope.courses = courses;
    $scope.aCourse = aCourse;
    
    var courseArray = [];
    
    $scope.aCourse.$loaded().then(function(){
        $scope.numSlides = aCourse.length;
        for(var i = 0; i < $scope.numSlides; i++){
            courseArray.push(aCourse[i]);
        }
        $scope.currentCourse = courseArray;
        console.log($scope.currentCourse)
    });
    
    $scope.i = 0;
    
    $scope.nextSlide = function(curSlide){
        if($scope.i < ($scope.numSlides - 1)){
            $scope.i++;
            console.log($scope.i);
        }else{
            $scope.i = 0;
        }
        

    }
    
    

    
});