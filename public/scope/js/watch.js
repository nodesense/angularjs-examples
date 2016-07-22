angular.module("myApp", [])
 
.controller("WatchController", function($scope){
     $scope.$watch("name", function(newValue, oldValue){
         console.log("name changed from ", oldValue, " to ", newValue);
     })

     $scope.$watchCollection('products', function(newProducts, oldProducts) {
        console.log("Old product counts ", oldProducts.length);
        console.log("New product counts ", newProducts.length);
     });

     //{{a + b}}
     $scope.$watch("a + b", function(newValue, oldValue){
         console.log("result changed from ", oldValue, " to ", newValue);
     })
     
     $scope.name = "iPhone";
     $scope.products = ['iPhone', 'Nexus', 'MotoG'];

     $scope.a = 10;
     $scope.b = 20;

     $scope.addProduct = function() {
         $scope.products.push("Blackberry");
     }

     setInterval(function(){
         $scope.a = Math.floor(Math.random() * 10);
         $scope.b = Math.floor(Math.random() * 10);
         console.log("interval ", $scope.a, $scope.b);

         //Use this to run digest loop, $apply at the end, calls $digest
         $scope.$apply();
         
         //calling $digest is bad practices, it may throw error
         //$scope.$digest();
     }, 5000);

     //no purpose function, ng-click internally uses $apply
     $scope.justClick = function() {

     }
})
