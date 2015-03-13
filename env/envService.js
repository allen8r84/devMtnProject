var app = angular.module('estateLMS');

app.service('envService', function($window) {
      this.getEnv = function () {
        return $window.env;
      }
  });