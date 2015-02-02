'use strict';

angular.module('angAuthApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function () {

      auth.register($scope.email, $scope.password)
        .success(function(res) {
          alert('success', 'Account Created!', ' Welcome, ' + res.user.email + '!');
        })
        .error(function(err) {
          alert('warning', 'Oops!', ' Email address is already registered!', err.message);
        });
    };
  });
