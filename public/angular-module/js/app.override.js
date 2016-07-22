angular.module("myApp", []) //using angular.module("myApp", []), [] would override the existing module, beware
.service("productService", function(){
    var products = [
                  {name:'iPhone', brand:'Apple', id:0}, 
                  {name:'iPad', brand:'Apple', id:1}, 
                  {name:'Nexus 5', brand:'Google', id:2}, 
                   {name:'Nexus 6', brand:'Google', id:3}
                  ]; 

    this.getProducts = function() {
        return products;
    }
})
.controller("ProductController", function($scope, productService){ 
    $scope.products = productService.getProducts();
})