var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject, $rootScope){
    var firebaseUrl = envService.getEnv().firebase; 
    var time = 5; //set slide timer for questions
    
    
    var user = user;
    user.$bindTo($scope, 'user')
    
    user.$loaded().then(function(){
        $scope.uid = user.uid;
    });
    
    $scope.courses = courses;
    $scope.aCourse = aCourse;
    
    var courseArray = [];
    
    $scope.aCourse.$loaded().then(function(){
        $scope.numSlides = aCourse.length;
        for(var i = 0; i < $scope.numSlides; i++){
            courseArray.push(aCourse[i]);
        }
        $scope.currentCourse = courseArray;
    });
    
    $scope.i = 0;
    
    
    $scope.setNext = function(){
        $scope.next = false
    };
    $scope.nextTrue = function(){$timeout(function(){
        $scope.next = true;
    },time * 1000);
    }
    $scope.setNext();
    $scope.nextTrue();
    
    
    
    
    $scope.nextSlide = function(curSlide){
        if($scope.i < ($scope.numSlides - 1)){
            $scope.i++;
            $scope.setNext();
            $scope.nextTrue();
            $scope.counter = time + 1;
            $scope.onTimeout();
        }else{
            $scope.i = 0;
            
        }
    } 
    
    $scope.counter = time;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else if($scope.i < ($scope.numSlides - 1)) {
            $scope.counter = "Next >";
        }
        else {
            $scope.counter = "Finished!"
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.coursesPage = function(){
        var path = $location.path('/dashboard/' + $scope.uid);
    };

    
});