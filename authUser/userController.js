var app = angular.module('estateLMS');

app.controller('userController', function($scope, user, groupMessage, $location, courses){
    $scope.groupMessage = groupMessage;
    
    $scope.postGMessage = function(gmTitle, gmessage){
        if(confirm("Post Message to all users?")){
            var date = Date.now();
            $scope.groupMessage.$add({
                'author': 'Admin',
                'time': date,
                'title': gmTitle,
                'message': gmessage
            }).then(function(success){
                console.log('success: ', success);
                $scope.resetGMessage();
            }, function(error){
                console.log('error: ', error);
            });
            

        }else{
            alert("Message Not Posted");
        }
        
    }
    $scope.resetGMessage = function(){
        debugger
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