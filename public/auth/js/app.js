angular.module("app", ["ngRoute", "ngResource", "app.services"])
.config(function($routeProvider, $httpProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/auth/home.html',
            controller : 'HomeController',
        }).
        when('/products', {
            templateUrl: '/auth/products.html',
            controller : 'ProductController',
        }).

         when('/about', {
            templateUrl: '/auth/about.html',
            controller : 'HomeController',
        }).

        when('/login', {
            templateUrl: '/auth/login.html',
            controller : 'LoginController'
        }).
        otherwise('/');


    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');

                    }
                    return $q.reject(response);
                }
            };
        }]);
})

.run(function($rootScope, $location, authService){
    $rootScope.$on('$routeChangeStart', function(event, next, current) { 
        console.log("$routeChangeStart", next, current);

        if (!authService.isLoggedIn()) {

            console.log("Signin to continue ", next.templateUrl);
            if ( next.templateUrl === "/auth/login.html") {
            } else {
                 event.preventDefault();
                $location.path("/login");
                if (!$rootScope.$$phase) $rootScope.$apply();
            }
            
            
            
        }
    });

    $rootScope.$on('$routeChangeSuccess', function(event, currnet, previous) { 
        console.log("$routeChangeSuccess", currnet, previous);
    });

    $rootScope.$on('$routeChangeError', function(event, next, current) { 
        console.log("$routeChangeError", next, current);
    });
})

.controller("HeaderController", function($scope, $rootScope, authService){
    $scope.logout = function () {
         authService.logout(function() {
                window.location = "#/login";
                $rootScope.loggedIn = false;
            }, function() {
                alert("Failed to logout!");
            });
    }
})
  

.controller("ProductController", function($scope, productService){
    productService.getProducts().then(function(response){
        $scope.products = response.data;
    })
})
.controller("LoginController", function($scope, $rootScope, authService){
    $scope.signin = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password
            }
 
            authService.login(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)    
                } else {
                    localStorage.token = res.data.token;
                    $rootScope.loggedIn = true;
                    window.location = "#/products";    
                }
            }, function() {
                $rootScope.error = 'Failed to login';
            })
    };
 
        $scope.signup = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password
            }
 
            authService.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    localStorage.token = res.data.token;
                    window.location = "/"   
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
   
         
        //$scope.token = localStorage.token;
})

.controller("HomeController", function($http){

})
  