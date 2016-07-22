angular.module("brand.module", [])
.config(function ($locationProvider, $routeProvider) {
    $routeProvider.
      when('/brands', {
          templateUrl: '/route/brand/brands.html',
          controller : 'BrandsController',
      }).
      when('/brands/:id', {
          templateUrl: '/route/brand/view.html',
          controller : 'BrandViewController',
      }).
         when('/brands/edit/:id', {
             templateUrl: '/route/brand/edit.html',
             controller : 'BrandEditController'
         }).
      otherwise('/');
});