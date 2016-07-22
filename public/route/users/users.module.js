angular.module('users.module', [])
.config(function($routeProvider){
      $routeProvider.
      when('/users', {
          templateUrl: '/route/users/users.html',
          controller : 'UsersController',
      })
})