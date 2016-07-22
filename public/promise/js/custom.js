angular.module("myApp", [])
//BEWARE, using $http directly in controller is discouraged, advised to use service behind
//EXCEPTION for easy learning
.service("productService", function($http, $q){
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

.controller("ProductController", function($scope, $q, productService){
     console.log("requesting /delayed-api/products ", new Date());

     
    console.log("requesting /delayed-api/brands ", new Date());
    
     $q.all([productService.getProducts(), productService.getBrands()])
     .then(function(results){
           $scope.products = results[0];//has products
           $scope.brands = results[1]; //has brands
     })
                    
})
