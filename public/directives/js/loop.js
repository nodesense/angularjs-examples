angular.module('myApp', [])

.directive('forEach', function(){
  return {
    transclude: 'element',
    priority: 1000,
    compile: compileFun
  };

  function compileFun(element, attrs, linker) {
      //gets "product in products""
      var expressionStr = attrs.forEach;
      var expressionTokens = attrs.forEach.split(' in ');
      
      var expression = {
         child : expressionTokens[0],
         property : expressionTokens[1]
      };

      return {
        post: repeat
      };

      function repeat(scope, iele, iattrs /*, attr*/) {
        var template = element[0].outerHTML;
        console.log("Element outer HTML", template);
        //Gets 'products' in statement to retrive products array from scope
        var data = scope.$eval(expression.property);
        addElements(data, scope, iele);

        return;

        //NOTE: best practice is not place anything after return, 
        //we defined functions after return, NOT Statements, 
        //this sample is given 
        //for each understanding, don't use this for production
        
        function makeNewScope (index, expression, value, scope, collection) {
          var childScope = scope.$new();
          childScope[expression] = value;
          childScope.$index = index;
          childScope.$first = (index === 0);
          childScope.$last = (index === (collection.length - 1));
          childScope.$middle = !(childScope.$first || childScope.$last);

          childScope.$odd = index % 2 == 1;
          childScope.$even = index % 2 == 0;

          /**
          *
          * uncomment this if you want your children to keep listening for changes
          *
          **/

          //childScope.$watch(function updateChildScopeItem(){
            //childScope[expression] = value;
          //});
          return childScope;
        }

        function addElements (collection, scope, insPoint) {
          var frag = document.createDocumentFragment();
          var newElements = [], element, idx, childScope;

          angular.forEach(data, function(v,i){
            childScope = makeNewScope(i, expression.child, v, scope, collection);
            element = linker(childScope, angular.noop);
            newElements.push(element);
            frag.appendChild(element[0]);
          });

          insPoint.after(frag);
          return newElements;
        }
      }
  }

}) 

.controller('ProductController', ['$scope', function($scope) {
  
  $scope.products = [
      {name: 'iPhone 5S', brand:'Apple', year:2013},
      {name: 'iPhone 6', brand:'Apple', year:2014},
      {name: 'iPhone 6S', brand:'Apple', year:2015}
  ];

   
}])