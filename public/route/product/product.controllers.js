angular.module("product.controllers", [])

.factory('Product', function($resource) {
    var url = "/api/products/:id";
    return $resource(url); // Note the full endpoint address
})
.service("productService", function(){
    
})
.factory("productService", function(){
    
    var dummy = function()
    {

    }

    return new dummy();
})
.controller("ProductsController", function ($scope, $http, Product) {

    $scope.message = "product controller";

    
    var products = Product.query(function () {
        angular.forEach(products, function (product) {
            console.log("product", product.Name);
        })

        $scope.products = products;
    }); //query() returns all the entries
})

.controller("ProductViewController",
        function ($scope, $routeParams, Product) {
            var product = Product.get({ id: $routeParams.id },
                function () {
                    $scope.product = product;
            });
        }
)

.controller("ProductEditController",
        function ($scope, $routeParams, Product) {
            $scope.message = "product controller";

            var product = Product.get({ id: $routeParams.id },
                            function () {
                                $scope.product = product;
                            });

            $scope.saveProduct = function () {
                $scope.product.$save();
            }
})