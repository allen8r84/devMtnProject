var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject, $rootScope, $log, $modal){
//pre-defined and pre-loaded variables    
    var firebaseUrl = envService.getEnv().firebase; 
    var time = 2; //set slide timer for questions
    var quizFreq = 2; //set after how many slides a quiz should be fired
    
    $scope.i = 0;
    $scope.pb = $scope.i;
    $scope.courseTitle = $location.path().split('/').slice(3).join('');
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
        $scope.mytimeout = $timeout($rootScope.onTimeout,1000);//start slide timer at content load

    });

//end of pre-defined and pre-loaded variables    
    
    
//Next button functionality - move forward automatically after a given time
    $scope.setNext = function(){
        $scope.next = false
    };
    $scope.setNext();
    
    $scope.nextSlide = function(){
        
        if($scope.i < ($scope.numSlides - 1)){
            //pb = 2 & i = 0
            //if statement to check if next click goes to an uncompleted slide
            if($scope.pb === ($scope.i + 1)){
                $scope.mytimeout = $timeout($rootScope.onTimeout,1000); //restart timer if slide hasn't been completed yet
                $rootScope.counter = time;
                $scope.setNext();
                $scope.i++;
                
            }else if($scope.pb > ($scope.i + 1)) {
                if($scope.pb === $scope.max && $scope.i === ($scope.pb - 2)){
                    $rootScope.counter = "Finished!"
                }
                
                $scope.i++;
                
            }
        }
    }
    
//end of Next button functionality    


//Previous Button - needs:
//Be available to click & go back to previous slide
    $scope.backSlide = function(){
            $scope.i--;
            /*$rootScope.counter = time;*/
            $scope.next = true;
            $timeout.cancel($scope.mytimeout);
            $rootScope.counter = null;    
    };
//End of Previous Button


//timer for next button - has a countdown displayed until next slide.    
    $rootScope.counter = time;
    $scope.ngifQuiz = true;
    $rootScope.onTimeout = function(){

        $rootScope.counter--;
        if ($rootScope.counter > 0) {
            $scope.mytimeout = $timeout($rootScope.onTimeout,1000);
        }
        else if($scope.i < ($scope.numSlides - 1)) {
            if($scope.pb <= $scope.i){
                $scope.pb++
            }
            $scope.i++;
            $rootScope.counter = time + 1;
            $rootScope.onTimeout();
            //add in quiz modal
            if($scope.i % quizFreq === 0) {
                $scope.open();
            }
        }
        else {
            if($scope.pb <= $scope.i){
                $scope.pb++
            }
            $rootScope.counter = "Finished!"
            $scope.next = true;
            $scope.open();
            
        }
    }
//end of timer for next button

    
//Course Finished alert    
    $scope.coursesPage = function(){
        alert("Congratulations!\nYou finished this course.\nPress OK to go back to your dashboard and view otheavailable courses.")
        var path = $location.path('/dashboard/' + $scope.uid);
    };
    
    
 //modal controller
   $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {
    $timeout.cancel($scope.mytimeout);
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      backdrop: 'static',
      keyboard: false,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});