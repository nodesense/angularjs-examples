angular.module("myApp", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("home", {
            url: '/home',

            //below doesn't work if we overwrite the views, we need to map empty view name as default
            //templateUrl: 'templates/home.html',
            //controller: 'HomeController',

            "views": {
                "": {
                     templateUrl: 'templates/home.html',
                     controller: 'HomeController',
                },
                "footer@home":{
                    templateUrl:'templates/footer.html'
                }
            }
        })

        .state('home.sub', {
            url:'/sub',
            templateUrl: 'templates/home.sub.html',
            controller: function($scope){
                    $scope.$on("$destroy", function(){
                        console.log("destroy subcontroller");
                    })
                }
        })

        .state('home.sub2', {
            url: '/sub2',
            
            views: {
                "": {
             
                 templateUrl: 'templates/home.sub2.html',
                    controller: function($scope){
                            $scope.$on("$destroy", function(){
                                console.log("destroy subcontroller2");
                            })
                        }
                },

                
                "footer@home":{
                    template :'<h5>sub 2 footer</h5>'
                }
            }
        })

    $urlRouterProvider.otherwise('/home');
})

.controller("HomeController", function($scope, $state){

    var products = [
        {
            name: 'iPhone',
            year: 2010
        },
        {
            name: 'iPhone 4',
            year: 2012
        },
        {
            name: 'Nexus 2',
            year: 2012
        }
    ]
 

    $scope.showSubPage = function(){
        $state.go("home.sub");
    }

    $scope.showSubPage2 = function(){
        $state.go("home.sub2");
    }
})



