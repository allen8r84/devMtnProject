var app = angular.module('estateLMS');

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $timeout, $rootScope) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $rootScope.ok = function () {
    $modalInstance.close($scope.selected.item);
    if($rootScope.counter !== 'Finished!'){
        $rootScope.onTimeout();
    }
  };
  $rootScope.okFinal = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});