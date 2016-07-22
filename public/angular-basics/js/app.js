angular.module("myApp", [])
.controller("ProductController", function($scope, $sce){
$scope.productNames = ['iPhone', 'Nexus', 'MotoG', 'LG G2'];

$scope.products = [
                  {name:'iPhone', brand:'Apple', id:0}, 
                  {name:'iPad', brand:'Apple', id:1}, 
                  {name:'Nexus 5', brand:'Google', id:2}, 
                   {name:'Nexus 6', brand:'Google', id:3}, 
                  {name:'MotoG', brand:'Motorola', id:4},
                  {name:'LG G2', brand:'LG', id:5},
                  {name:'LG G3', brand:'LG', id:6}
                  ];

$scope.specs  = {'RAM':'2GB', 'Storage': '16GB', 'Talk Time':'12hrs'};


$scope.description = "Apple <h2>iPhone</h2> smartphone. Announced 2007, January. Features 3.5″ TFT capacitive touchscreen, 2 MP camera, Wi-Fi, Bluetooth";

//Strict Contextual Escaping (SCE)
//$sanitize
$scope.trustedHtmlDescription = $sce.trustAsHtml($scope.description);



$scope.onSelectChange = function() {
    console.log("Selection changed", $scope.selectedProductName);
};

$scope.onTextChange = function() {
    console.log("Text Changed", $scope.text);
}       

$scope.buttonClicked = function() {
    console.log("Button Clicked");
}      

})