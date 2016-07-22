angular.module('myApp', [])

//share scope with parent
.directive('myProductInfo', function() {
  return {
    restrict: 'AE',
    replace:true,
    template: '<div><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span></div>'
    };
})

//get new scope drived from parent
.directive('myProductInfoExtended', function() {
  return {
    restrict: 'AE',
    replace:true,
    scope:true,
    controller: function($scope) { 
                $scope.product = {name: 'Nexus', brand:'Google'};
            },
    template: '<div><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span><br />' +
            '<span>Access parent property direct {{product2.name}}, Brand {{product2.brand}} <br />'+
           '<span>From Parent => Name: {{$parent.product.name}}</span> <span>Brand: {{$parent.product.brand}}</span></div>'
  };
})

//get isolated scope, assign scope to {}
.directive('myProductInfoIsolated', function() {
  return {
    restrict: 'AE',
    replace:true,
    scope:{},
    controller: function($scope) { 
                $scope.product = {name: 'Nexus', brand:'Google'};
            },
    template: '<div><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span><br />' +
              '<span>Access parent property direct {{product2.name}}, Brand {{product2.brand}} <br />'+
              '<span>From Parent => Name: {{$parent.product.name}}</span> <span>Brand: {{$parent.product.brand}}</span></div>'
  };
})


//get isolated scope, assign scope to {}
//get info accessible to parent scope element
.directive('myProductInfoIsolatedExternal', function() {
  return {
    restrict: 'AE',
    replace:true,
    scope:{
      product2: "=info"
    },
    controller: function($scope) { 
                $scope.product = {name: 'Nexus', brand:'Google'};
            },
    template: '<div><span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span><br />' +
              '<span>Access locally copied scope property {{product2.name}}, Brand {{product2.brand}} <br />'+
              '<span>From Parent => Name: {{$parent.product.name}}</span> <span>Brand: {{$parent.product.brand}}</span></div>'
  };
})


//isolated directives with =, @ and &

//Refer StackOverFlow @14050195

//= binding is for two-way model binding. The model in parent scope is linked 
//to the model in the directive's isolated scope. Changes to one model affects the other, and vice versa.

//@ binding is for passing strings. These strings support {{}} expressions for interpolated values. 
//For example: . The interpolated expression is evaluated against directive's parent scope.


//& binding is for passing a method into your directive's scope so that it can be called within your directive. 
//The method is pre-bound to the directive's parent scope, and supports arguments. 
//For example if the method is hello(name) in parent scope, then in order to execute the method from 
//inside your directive, you must call $scope.hello({name:'world'})

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