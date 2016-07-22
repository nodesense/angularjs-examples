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
    
     var brandsReq = $http({
            method: 'GET',
            url: '/delayed-api/brands'
            });

     $q.all([productsReq, brandsReq])
     .then(function successCallback(results) {
            $scope.products = results[0].data;
            $scope.brands = results[1].data;
            console.log("got response /delayed-api/products ", new Date());
            }, function errorCallback(response) {
     }); 
                    
})
