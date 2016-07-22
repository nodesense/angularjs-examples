angular.module("myApp", [])
//BEWARE, using $http directly in controller is discouraged, advised to use service behind
//EXCEPTION for easy learning
.controller("ProductController", function($scope, $http){
     console.log("requesting /delayed-api/products ", new Date());

     $http({
            method: 'GET',
            url: '/delayed-api/products'
            }).then(function successCallback(response) {
                $scope.products = response.data;
            console.log("got response /delayed-api/products ", new Date());
            }, function errorCallback(response) {
            }); 

    console.log("requesting /delayed-api/brands ", new Date());
    
     $http({
            method: 'GET',
            url: '/delayed-api/brands'
            }).then(function successCallback(response) {
                $scope.brands = response.data;
            console.log("got response /delayed-api/brands ", new Date());
            }, function errorCallback(response) {
            });         
})