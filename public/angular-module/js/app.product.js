angular.module("myApp.product", [])
.service("productService", function(){
    var products = [
                  {name:'iPhone', brand:'Apple', id:0}, 
                  {name:'iPad', brand:'Apple', id:1}, 
                  {name:'Nexus 5', brand:'Google', id:2}, 
                   {name:'Nexus 6', brand:'Google', id:3}, 
                  {name:'MotoG', brand:'Motorola', id:4},
                  {name:'LG G2', brand:'LG', id:5},
                  {name:'LG G3', brand:'LG', id:6}
                  ]; 

    this.getProducts = function() {
        return products;
    }
})
/*
.service("brandService", function(){
    var brands = [
        'Apple',
        'Microsoft'
    ];

    this.getBrands = function() {
        return brands;
    }
})*/
.controller("ProductController", function($scope, productService){ 
     $scope.products = productService.getProducts();
})


/*
.controller("ProductController", ["$scope", "productService", 
        function(s, productService){ 
     s.products = productService.getProducts();
}])*/