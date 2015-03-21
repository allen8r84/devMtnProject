var app = angular.module('estateLMS');

app.controller('userController', function($scope, user, groupMessage, $location, courses){
    $scope.groupMessage = groupMessage;
    
    $scope.postGMessage = function(gmTitle, gmessage){
        debugger
        if(confirm("Post Message to all users?")){
            $scope.groupMessage.$add({
                'author': 'Admin',
                'time': moment().format(),
                'title': gmTitle,
                'message': gmessage
            });
            

        }else{
            alert("Message Not Posted");
        }
        
    }
    $scope.resetGMessage = function(){
        $scope.gmessage = {};
        $scope.gmTitle = {};
    }
    
    $scope.courses = courses;
    
    
    var user = user;
    user.$bindTo($scope, 'user')
    
    $scope.goToCourses = function(path){
        $location.path('/dashboard/' + user.uid + '/' + path);
    }
});