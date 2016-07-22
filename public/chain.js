angular.module("myApp", [])
//BEWARE, using $http directly in controller is discouraged, advised to use service behind
//EXCEPTION for easy learning
.controller("ProductController", function($scope, $http, $q){
     console.log("requesting /delayed-api/products ", new Date());

     var productsReq = $http({
            method: 'GET',
            url: '/delayed-api/products'
            });

    console.log("requesting /delayed-api/brands ", new Date());
    
    

    productsReq.then(function(response){
            $scope.products = response.data;
             var brandsReq = $http({
                method: 'GET',
                url: '/delayed-api/brands'
                }).then(function(brandResponse){
                      $scope.brands = brandResponse.data;          
                });

                return brandsReq;
    });        
 
                    
})
