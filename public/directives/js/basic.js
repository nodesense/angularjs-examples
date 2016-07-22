angular.module('myApp', [])

//share scope with parent
.directive('myProduct', function() {
  return {
    template: '<div class="directiveDiv"><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span></div>'
  };
})

//replace the DOM content with template contents
.directive('myProductReplace', function() {
  return {
    replace:true,
    template: '<div class="directiveDiv"><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span></div>'
  };
})


//transclude,shift the content inside template
.directive('myProductTransclude', function() {
  return {
    transclude:true,
    template: '<div class="directiveDiv" ng-transclude><h1>Not Shown</h1></div>'
  };
})

.controller('ProductController', ['$scope', function($scope) {
  $scope.product = {
    name: 'iPhone 6',
    brand: 'Apple'
  };

  $scope.product2 = {
      name: 'MotoG',
      brand: 'Motorola'
  }
}])