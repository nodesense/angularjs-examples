angular.module('SimpleApp',[])
.filter('reverse',[function(){
    return function(string){
        return string.split('').reverse().join('');
    }
}])

//to control the highlighting of which tab has been navigated
angular.module('ControllerApp',[])
.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.sum = function(a, b) {
        return a + b;
    };
})
 
//http://tylerfrankenstein.com/code/angular-service-unit-test

angular.module('ServiceApp', []).
  service('foo', ['$http', foo]);

/**
 * The foo service for my-awesome-module.
 */
function foo($http) {
  this.bar = function() {
    return $http.get('http://example.com/rest/hello-world').then(function(result) {
        if (result.status == 200) {
          return result.data;
        }
    });
  };
}
