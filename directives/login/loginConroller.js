var app = angular.module('estateLMS');

app.controller('loginConroller', function ($scope, $location, envService) {
    $scope.env = envService.getEnv();

    $scope.status = 'Register';
    $scope.showReg = function(){
     if($scope.status === 'Register'){
         $scope.status = 'Login';
     } else {
        $scope.status = 'Register';
     }
     
    $scope.reg = !$scope.reg;
  };

});