angular.module("myApp", [])
 
.controller("GrandParentController", function($scope){
    $scope.commonForAll = "Common For All";

    $scope.sendMessageToChildren = function(){
        $scope.$broadcast("Msg from Grant Parent", Math.floor(Math.random() * 100));
    }


    $scope.$on("Msg from Grant Parent", function(e, arg){
        $scope.message = "Msg from Grant Parent" + " Received At Grand Parent Controller " + arg
        console.log($scope.message);
    });

    //should not be called for broadcast
    $scope.$on("Msg from Child", function(e, arg){
        $scope.message = "Msg from Child " + " Received At Grand Parent Controller " + arg
        console.log($scope.message);
    });


    $scope.$on("Msg from Parent", function(e, arg){
        $scope.message = "Msg from Parent " + " Received At Grand Parent Controller " + arg
        console.log($scope.message);
    });
})
.controller("ParentController", function($scope){
    $scope.parentAndChildren = "Parent and Children";


    $scope.sendMessageToChildren = function(){
        $scope.$broadcast("Msg from Parent", Math.floor(Math.random() * 100));
    }


    $scope.sendMessageToParent = function(){
        $scope.$emit("Msg from Parent", Math.floor(Math.random() * 100));
    }

    //listen
    $scope.$on("Msg from Grant Parent", function(e, arg){
        $scope.message = "Msg from Grant Parent " + " Received At Parent Controller " + arg
        console.log($scope.message);
    });


    $scope.$on("Msg from Child", function(e, arg){
        $scope.message = "Msg from Child " + " Received At Parent Controller " + arg
        console.log($scope.message);
    });
})
.controller("ChildController", function($scope){
    $scope.childOnly = "Child Only";
 

    //listen
    $scope.$on("Msg from Grant Parent", function(e, arg){
        $scope.message = "Msg from Grant Parent " + " Received At Child Controller " + arg;
        console.log($scope.message);
    });


    $scope.$on("Msg from Parent", function(e, arg){
        $scope.message = "Msg from Parent " + " Received At Child Controller " + arg;
        console.log($scope.message);
    });

    $scope.sendMessageToParent = function(){
        $scope.$emit("Msg from Child", Math.floor(Math.random() * 100));
    }

    
})