'use strict';

angular.module('angAuthApp')
  .controller('HeaderCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
