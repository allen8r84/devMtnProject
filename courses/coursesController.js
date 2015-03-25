var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject, $rootScope, $log){
//pre-defined and pre-loaded variables    
    var firebaseUrl = envService.getEnv().firebase; 
    var time = 5; //set slide timer for questions
    
    $scope.i = 0;
    $scope.pb = $scope.i;
    
    var user = user;
    user.$bindTo($scope, 'user')
    
    user.$loaded().then(function(){
        $scope.uid = user.uid;
    });
    
    $scope.courses = courses;
    $scope.aCourse = aCourse;
    
    $scope.courseArray = [];
    
    $scope.aCourse.$loaded().then(function(){
        $scope.numSlides = aCourse.length;
        for(var i = 0; i < $scope.numSlides; i++){
            $scope.courseArray.push(aCourse[i]);
        }
        $scope.currentCourse = $scope.courseArray;
        $scope.max = aCourse.length; //max value for progress bar
        $scope.percent = 100 / $scope.max; //setting progress bar slide value
        $scope.mytimeout = $timeout($scope.onTimeout,1000);//start slide timer at content load

    });


//end of pre-defined and pre-loaded variables    
    
    
//Next button functionality - move forward automatically after a given time
    $scope.setNext = function(){
        $scope.next = false
    };
    $scope.setNext();
    
    $scope.nextSlide = function(){
        if($scope.i < ($scope.numSlides - 2)){
            //pb = 2 & i = 0
            //if statement to check if next click goes to an uncompleted slide
            if($scope.pb === ($scope.i + 1)){
                $scope.mytimeout = $timeout($scope.onTimeout,1000); //restart timer if slide hasn't been completed yet
                $scope.counter = time;
                $scope.setNext();
                $scope.i++;
            }else if($scope.pb > ($scope.i + 1)) {
                $scope.i++;
            }
            
            
            /*if($scope.pb <= $scope.i){
                $scope.pb++
            }
            $scope.i++;
            $scope.counter = null;
        }else{
           if($scope.pb <= $scope.i){
                $scope.pb++
            }
           $scope.i++;
           $scope.counter = "Finished!"
            
        }*/
    }
    }
    
//end of Next button functionality    


//Previous Button - needs:
//Be available to click & go back to previous slide
    $scope.backSlide = function(){
            $scope.i--;
            /*$scope.counter = time;*/
            $scope.next = true;
            $timeout.cancel($scope.mytimeout);
            $scope.counter = null;    
    };
//End of Previous Button


//timer for next button - has a countdown displayed until next slide.    
    $scope.counter = time;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            $scope.mytimeout = $timeout($scope.onTimeout,1000);
        }
        else if($scope.i < ($scope.numSlides - 1)) {
            if($scope.pb <= $scope.i){
                $scope.pb++
            }
            $scope.i++;
            $scope.counter = time + 1;
            $scope.onTimeout();
        }
        else {
            if($scope.pb <= $scope.i){
                $scope.pb++
            }
            $scope.counter = "Finished!"
            $scope.next = true;
        }
    }
//end of timer for next button

    
//Course Finished alert    
    $scope.coursesPage = function(){
        alert("Congratulations!\nYou finished this course.\nPress OK to go back to your dashboard and view otheavailable courses.")
        var path = $location.path('/dashboard/' + $scope.uid);
    };
});