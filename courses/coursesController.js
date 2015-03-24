var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject, $rootScope, $log){
//pre-defined and pre-loaded variables    
    var firebaseUrl = envService.getEnv().firebase; 
    var time = 5; //set slide timer for questions
    
    $scope.i = 0;
    
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
        $scope.totalItems = aCourse.length * 10; //pagination
        
    });
//end of pre-defined and pre-loaded variables    
    
    
//Next button functionality - move forward automatically after a given time
    $scope.setNext = function(){
        $scope.next = false
    };
    $scope.setNext();
    
    $scope.nextSlide = function(){
        if($scope.i < ($scope.numSlides - 2)){
            $scope.i++;
            $scope.counter = null;
            $scope.currentPage = $scope.i + 1;
        }else{
           $scope.i++;
           $scope.currentPage = $scope.i + 1;
           $scope.counter = "Finished!"
            
        }
    }
    
//end of Next button functionality    


//Previous Button - needs:
//Be available to click & go back to previous slide
    $scope.backSlide = function(){
        if($scope.i <= 0){
            $scope.i = 0;
            $scope.currentPage = $scope.i + 1;
            if($scope.counter === null){
                $scope.counter = null;
            }else {
                $scope.counter = time;
            }
        }else if($scope.i > 0){
            $scope.i--;
            $scope.counter = time;
            $scope.currentPage = $scope.i + 1;
        } 
        
    };
//End of Previous Button


//timer for next button - has a countdown displayed until next slide.    
    $scope.counter = time;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else if($scope.i < ($scope.numSlides - 1)) {
            $scope.i++;
            $scope.counter = time + 1;
            $scope.onTimeout();
            $scope.currentPage = $scope.i + 1;
        }
        else {
            $scope.counter = "Finished!"
            $scope.next = true;
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
//end of timer for next button

    
//Course Finished alert    
    $scope.coursesPage = function(){
        alert("Congratulations!\nYou finished this course.\nPress OK to go back to your dashboard and view otheavailable courses.")
        var path = $location.path('/dashboard/' + $scope.uid);
    };
});