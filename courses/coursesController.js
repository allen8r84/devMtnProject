var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject, $rootScope){
    
//pre-defined and pre-loaded variables    
    var firebaseUrl = envService.getEnv().firebase; 
    var time = 7; //set slide timer for questions
    
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
    });
//end of pre-defined and pre-loaded variables    
    
    
//Next button functionality - move forward automatically after a given time
    $scope.setNext = function(){
        $scope.next = false
    };
    $scope.nextTrue = function(){
        $timeout(function(){
            $scope.next = true;
        },time * 1000);
    }
    $scope.setNext();
    $scope.nextTrue();
    
    
    $scope.nextSlide = function(){
        if($scope.i < ($scope.numSlides - 1)){

        }else{
            $scope.i = 0;
            
        }
    }
    
//end of Next button functionality    


//Previous Button - needs:
//Be available to click & go back to previous slide
    $scope.backSlide = function(){
        
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
            $scope.setNext();
            $scope.nextTrue();
            $scope.counter = time + 1;
            $scope.onTimeout();
        }
        else {
            $scope.counter = "Finished!"
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