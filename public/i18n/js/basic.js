angular.module("myApp", [])
.controller("ProductController", function($scope){
    $scope.product = {
        name: 'iPhone',
        brand: 'Apple',
        price: 400,
        rating: 80.85,
        stock: 100
    }
    $scope.timeNow = new Date();
})