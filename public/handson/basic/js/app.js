
/*
implement controller "ParkingController"
*/

angular.module("myApp", [])
.controller("ParkingController", function($scope){
    //working days
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    //TODO:
    //create button click event "parkMyCar()" in scope, that generate random number between 1-30
    //to generate random number ==> Math.floor((Math.random() * 30) + 1); 
    //TODO: Generate random number between 0-4, pick a days from days array, pass to view for ng-switch

});
