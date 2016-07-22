/*
TODO: Define Angular module "myApp"

implement controller "RestaurantController"
*/

angular.module("myApp", [])
.controller("RestaurantController", function($scope){
    var restaurants = [
        {
            name:'KFC',
            address:'MG Road'
        },
        {
            name:'Domino',
            address:'Outter Ring Road'
        },
        {
            name:'Nandini',
            address:'Domlur'
        }
    ];

    //TODO:pick a favorite restaurant by random number from above array
    //$scope.favoraite = 

})
 
//TODO: Implement a directive MyRestaurant, that display restaurant details + has button "Order", implement a click event