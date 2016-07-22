angular.module("brand.controllers", [])

.factory('Brand', function($resource) {
    var url = "/api/brands/:id";
    return $resource(url); // Note the full endpoint address
})

.controller("BrandsController", function ($scope, $http, Brand) {

    $scope.message = "brand controller";

    var brands = Brand.query(function () {
        angular.forEach(brands, function (brand) {
            console.log("brand", brand.name);
        })

        $scope.brands = brands;
    }); //query() returns all the entries
})

.controller("BrandViewController",
        function ($scope, $routeParams, Brand) {
            var brand = Brand.get({ id: $routeParams.id },
                function () {
                    $scope.brand = brand;
            });
        }
)

.controller("BrandEditController",
        function ($scope, $routeParams, Brand) {
            $scope.message = "Edit controller";

            var brand = Brand.get({ id: $routeParams.id },
                            function () {
                                $scope.brand = brand;
                            });

            $scope.saveBrand = function () {
                $scope.brand.$save();
            }
})