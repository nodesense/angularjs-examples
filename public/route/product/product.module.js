angular.module("product.module", [])
.config(function ($locationProvider, $routeProvider) {
    $routeProvider.
      when('/products', {
          templateUrl: '/route/product/products.html',
          controller : 'ProductsController',
      }).
      when('/products/:id', {
          templateUrl: '/route/product/view.html',
          controller : 'ProductViewController',
      }).
         when('/products/edit/:id', {
             templateUrl: '/route/product/edit.html',
             controller : 'ProductEditController'
         }).
      otherwise('/');
});