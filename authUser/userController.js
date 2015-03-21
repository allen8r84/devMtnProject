var app = angular.module('estateLMS');

app.controller('userController', function($scope, user, groupMessage, $location, courses){
    $scope.groupMessage = groupMessage;
    
    $scope.postGMessage = function(title, message){
        if(confirm("Post Message to all users?")){
            $scope.groupMessage.$add({
                'author': 'Admin',
                'time': moment().format(),
                'title': title,
                'message': message
            });
        }else{
            alert("Message Not Posted");
        }
    }
    
    $scope.courses = courses;
    
    
    var user = user;
    user.$bindTo($scope, 'user')
    
    $scope.goToCourses = function(path){
        $location.path('/dashboard/' + user.uid + '/' + path);
    }
});