angular.module("home.controllers", [])

.service("dataService", function($http, $q){
      this.getProducts = function() {
            var deferred = $q.defer();

            $http({
                   method: 'GET',
                   url: '/delayed-api/products'
            }).then(function (resp) {
                  deferred.resolve(resp.data);
                  },
                  function(errorResponse) {
                        deferred.reject(errorResponse.data);
                  }
            );

            return deferred.promise; 
      }

      this.getBrands = function() {
            var deferred = $q.defer();

            $http({
                   method: 'GET',
                   url: '/delayed-api/brands'
            }).then(function (resp) {
                  deferred.resolve(resp.data);
                  },
                  function(errorResponse) {
                        deferred.reject(errorResponse.data);
                  }
            );

            return deferred.promise; 
      }
})

.controller("HomeController", 
 //function ($scope, dataService, $http, $q) { 
   function($scope, dataService, brands, products){
    

  $scope.title = 'Home Page';

/*
  dataService.getProducts().then(function(products){
      $scope.products = products;
  })

  dataService.getBrands().then(function(brands){
      $scope.brands = brands;
  })*/
/*
  $q.all([dataService.getProducts(), dataService.getBrands()])
  .then(function(results){
        $scope.products = results[0];
        $scope.brands = results[1];
  })
 */

 $scope.brands = brands;
 $scope.products = products;
 
})