var firebaseapp = angular.module('firebaseapp', ['ui.router', 'firebase']);

firebaseapp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must be a registered user.'
      $location.path('/register');
    }
  })
}]);


firebaseapp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider.
  state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'LoginController'
        }).
  state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).
  state('chat', {
            url: '/chat',
            templateUrl: 'views/chat.html',
            controller: 'LoginController'
        }).
  state('success', {
            url: '/success',
            templateUrl: 'views/init.html',
            controller: 'InitController',
            resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireSignIn();
            }]
          }
        }).
  state('reset', {
            url: '/reset',
            templateUrl: 'views/reset.html',
            controller: 'LoginController'
        }).
  state('account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: 'LoginController'
        })

});


firebaseapp.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);