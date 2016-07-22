 angular.module("catalogApp", [])
.service("paymentService", function(){
    this.transfer = function(cardInfo, sum) {
        //complex code flow that rely on web server
        return true; //return true, if all are successful
    }
})
.service("productService", function($http){
    this.getProducts = function() {
        //note, we return promise of then function, not the result here
        
        return $http.get('http://example.com/api/products').then(function(result) {
            if (result.status == 200) {
                return result.data;
            }
        });
   }

   this.getProduct = function(id) {
        //note, we return promise of then function, not the result here
        
        return $http.get('http://example.com/api/products/' + id).then(function(result) {
            if (result.status == 200) {
                return result.data;
            }
        });
   }
})
.controller("ProductController", function($scope, productService){
    productService.getProducts().then(function(products){
        $scope.products = products;
    });
})

.controller("OrderController", function($scope, paymentService){
    //button click
    $scope.orderNow = function() {
        $scope.orderSuccess = paymentService.transfer({}, 100);
    }
})
