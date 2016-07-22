angular.module("myApp", [])
 
.controller("ProductController", function(){
      this.product = {name: 'iPhone', brand:'Apple'};
      this.title = "Product Page";
})

.controller("BrandController", function($scope){
      this.name = 'Apple';
      this.email = 'support@apple.com';
      this.title = "Brand Page";

      if ($scope.brand === this) {
            console.log("controller as alias stored in scope");
            //equal to this.message
            $scope.brand.message = "$scope.brand === this";
      }
})
