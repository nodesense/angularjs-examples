angular.module("mathApp", [])

/*
    <div ng-controller="MathController">
    <input ng-model="a" />
    <input ng-model="b" />
    <button ng-click="sum()">Sum</button>

    result is {{result}}
    </div>
*/
.controller("MathController", function($scope){
    $scope.a = 0;
    $scope.b = 0;

    $scope.sum = function() {
        $scope.result = $scope.a + $scope.b;
    }
})