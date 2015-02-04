'use strict';

angular.module('angAuthApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })

    .state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

    $authProvider.loginUrl = API_URL + 'login'; //auth/login for sails
    $authProvider.signupUrl = API_URL + 'register'; //auth/register

    $authProvider.facebook({
      clientId: '402860839886204',
      url: API_URL + 'auth/facebook'
    });

    $authProvider.google({
      clientId: '658156965831-1d1v8vkcg8v0jb6lrrjp5spjec0a0jml.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });

    $httpProvider.interceptors.push('authInterceptor');

})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
  var params = $window.location.search.substring(1);

  if(params && $window.opener && $window.opener.location.origin === $window.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);
  }
});
