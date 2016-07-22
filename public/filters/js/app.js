angular.module("myApp", [])

.filter("reverse", function() {
    return function(input, toUpper) {
        var o = [];
        for (var i = input.length - 1, j = 0; i >= 0; i--, j++)
            o[j] = input[i];

        return toUpper? o.join(''):o.join('').toUpperCase();
    }
})


.controller("ProductController", function($scope){
    var products = [
                  {name:'iPhone', brand:'Apple', price:400, id:0}, 
                  {name:'iPad', brand:'Apple', price:600, id:1}, 
                  {name:'Nexus 5', brand:'Google', price:300, id:2}, 
                   {name:'Nexus 6', brand:'Google', price:400, id:3}, 
                  {name:'MotoG', brand:'Motorola', price:150, id:4},
                  {name:'LG G2', brand:'LG', price:350, id:5},
                  {name:'LG G3', brand:'LG', price:450, id:6}
                  ];


 $scope.customComparator = function(input, actual) {
     console.log('input is ', input);
     console.log('actual is ', actual);
    return true;   
 };

    $scope.products = products;
    $scope.selectedProduct = products[0];
})


//function(actual, expected): The function will be given the object value and the predicate value to compare and should return true if both values should be considered equal.

//true: A shorthand for function(actual, expected) { return angular.equals(actual, expected)}. This is essentially strict comparison of expected and actual.

//false|undefined: A short hand for a function which will look for a substring match in case insensitive way.