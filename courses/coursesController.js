var app = angular.module('estateLMS');

app.controller('coursesController', function($scope, user, courses, $timeout, $location, aCourse, envService, $firebaseObject){
    var firebaseUrl = envService.getEnv().firebase; 
    
    var user = user;
    user.$bindTo($scope, 'user')
    
/*    $scope.courses = courses;
    $scope.aCourse = aCourse;
    console.log(aCourse);*/
    
    
    
    var aCourse = aCourse;
    aCourse.$bindTo($scope, 'aCourse');
    
    
    
    var i = 1;
    var j = 2;
    aCourse.$loaded().then(function(){
        var j = aCourse.nextSlide;
        console.log(j, i)

    });
    
    
    
    
    $scope.nextSlide = function(curSlide){
        var courseTitle = $location.path().split('/').slice(3).join('');    
        if(j){
            if(j > i){
                
                aCourse = null;
                var aCourse = $firebaseObject(new Firebase(firebaseUrl + '/courses/state/ut/' + courseTitle + '/' + j));
                aCourse.$bindTo($scope, 'aCourse')
                i++;
                delete j;
                aCourse.$loaded().then(function(){
                var j = aCourse.nextSlide;
                console.log(j, i)

    });
            } 
            
        }else {
            aCourse = null;
            var aCourse = $firebaseObject(new Firebase(firebaseUrl + '/courses/state/ut/' + courseTitle + '/1'));
            aCourse.$bindTo($scope, 'aCourse')
            i = 1;
            delete j;
        }
        
    }
    
    

    
});