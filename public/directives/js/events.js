angular.module('myApp', [])

//share scope with parent
.directive('myProduct', function() {
  return {
    template: '<span>Name: {{product.name}}</span> <span>Brand: {{product.brand}}</span>'
  };
})

.directive("doubleClick", function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind("click", function(){
         //scope.message = "Clicked " + attrs.doubleClick;
         scope.message = "Clicked " + element.attr('double-click');
         scope.$apply(function(){
            scope.message = "Clicked " + element.attr('double-click');
         });
      });
    }
  }
})
 
.directive('replybox', function($timeout) {
    var linkFn = function(scope, element, attrs) {       
        scope.showInput = false;
        
        var button = element.find('button');        
        var input = element.find('input');
        
        button.bind("click", function() {
            scope.showInput = true;
            scope.$apply();
            
            input[0].focus();            
            input.css({"width":"300px","transition":"1s"});            
        });
        
        input.bind('blur', function() {
            scope.showInput = false;            
            $timeout(function() { scope.$apply(); }, 1000);
            
            input.css({'width':'0px', 'transition':'1s'});            
        });
    };
    return {
        link: linkFn,
        restrict: 'E',
        scope: {
            label: '@'
        },
        template: '<form><button ng-hide="showInput">{{label}}</button><input type="text" ng-show="showInput"></input></form>',
        transclude: true
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

  $scope.message = "you haven't clicked yet";
}])