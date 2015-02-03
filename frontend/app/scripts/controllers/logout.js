'use strict';

angular.module('angAuthApp').controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('main');
  });
