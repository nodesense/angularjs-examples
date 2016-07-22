angular.module("myApp.brand", []) 
.service("brandService", function(){
    var brands = [
                  {name:'Apple', id:0}, 
                  {name:'Google', id:1}, 
                  {name:'Motorola', id:2},
                  {name:'LG', id:3} 
                  ]; 

    this.getBrands = function() {
        return brands;
    }
})
.controller("BrandController", function($scope, brandService){ 
    $scope.brands = brandService.getBrands();
})