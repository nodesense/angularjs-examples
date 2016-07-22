angular.module("home.module", [])
.config(function ($locationProvider, $routeProvider) {
    $routeProvider.
      when('/', {
          templateUrl: '/route/home/home.html',
          controller: 'HomeController',

          resolve: {
              brands: function(dataService) {
                  return dataService.getBrands();
              },

              products: function(dataService) {
                  return dataService.getProducts();
              }
          }
      }). 
      otherwise('/'); //global default route, redirect to home page
});