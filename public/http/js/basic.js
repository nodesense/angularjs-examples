angular.module("myApp", [])
//BEWARE, using $http directly in controller is discouraged, advised to use service behind
//EXCEPTION for easy learning
.controller("ProductController", function($scope, $http){
       $scope.getAllProducts = function(){
           $scope.reset();
         $http({
            method: 'GET',
            url: '/api/products'
            }).then(function successCallback(response) {
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                
                console.log("Status Code ", response.status);
                console.log("Status Text ", response.statusText);
                console.log("Content-Length", response.headers("Content-Length"));
                console.log("Content-Type", response.headers("Content-Type"));

                $scope.products = response.data;
            }, function errorCallback(response) {
            }); 
       }

       $scope.reset = function() {
            $scope.statusCode = '';
            $scope.statusText = '';
            $scope.contentLength = '';
            $scope.contentType = '';
       }

       $scope.getProduct = function(id){
           $scope.reset();
         $http({
            method: 'GET',
            url: '/api/products/' + id
            }).then(function successCallback(response) {
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                 
                $scope.product = response.data;
            }, function errorCallback(response) {
            }); 
       }

       $scope.deleteProduct = function(id){
           $scope.reset();
         $http({
            method: 'DELETE',
            url: '/api/products/' + id
            }).then(function successCallback(response) {
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                 
                $scope.product = response.data;
            }, function errorCallback(response) {
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
            }); 
       }

        $scope.get404NotFound = function(){
            $scope.reset();
            //404 errors
         $http({
            method: 'GET',
            url: '/api/not-there/',
            }).then(function successCallback(response) {
                //this won't be called
                console.log("Not found");
            }, function errorCallback(response) {

                console.log("Error");
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                 

                 $scope.products = [];
                 $scope.product = {};
            }); 
       }


       //Hardcoded for making learning easy
       $scope.newProduct = function(){
            $scope.reset();

            var data = {
                name: 'MotoG',
                brand: 'Motorola'
            };
          
         $http({
            method: 'POST',
            data: data,
            url: '/api/products/',
            }).then(function successCallback(response) {
                //this won't be called
                 $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                $scope.product = response.data;
            }, function errorCallback(response) {

                console.log("Error");
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
 
            }); 
       }

       //Hardcoded for making learning easy
       $scope.updateProduct = function(){
           var id = $scope.product.id;
            var data = {
                name: $scope.product.name,
                brand: $scope.product.brand,
                id: $scope.product.id
            };

            $scope.reset();

         $http({
            method: 'PUT',
            data: data,
            url: '/api/products/' + id,
            }).then(function successCallback(response) {
                //this won't be called
                 $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                $scope.product = response.data;
            }, function errorCallback(response) {

                console.log("Error");
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
 
            }); 
       }

       $scope.specialAPI = function() {
           $http({
            method: 'GET',
            url: '/special-api',
            }).then(function successCallback(response) {
                //this won't be called
                 $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");
                 
                console.log("Special Result", response.data.result);

                console.log("Special Result Message through interceptor", response.data.message);
            }, function errorCallback(response) {

                console.log("Error");
                $scope.statusCode = response.status;
                $scope.statusText = response.statusText;
                $scope.contentLength = response.headers("Content-Length");
                $scope.contentType = response.headers("Content-Type");


                console.log("Special Result", response.data.result);

                console.log("Special Result Message through interceptor", response.data.message);
 
            }); 
       }

})

.config(function($httpProvider){

//Example only, don't hardcode appkey into your javascript code
$httpProvider.defaults.headers.common.AppKey = '12345';
  // register the interceptor as a service
    function interceptor($q) {
    return {
        'request': function(config) {
            // do something on success
            console.log("Intercepter, request ", config.url);
            var url = config.url.toString();
            console.log(url);

            if (url.indexOf("special-api") > -1) {
                    console.log("injecting special header");
                    
                    config.headers["X-Special-Token"] = "SPECIAL-1234";
            }


            return config;
        },

        // optional method
    'requestError': function(rejection) {
        // do something on error
        console.log("Intercepter, request requestError ");
        return $q.reject(rejection);
        },

        // optional method
        'response': function(response) {
        // do something on success
             console.log("Intercepter, response ", response.status);
             if (response.config.url.indexOf("special-api") > -1) {
                      response.data.message = 'Special Processing Done';
             }
           
             return response;
        },

        // optional method
    'responseError': function(rejection) {
        // do something on error

        //Samples only, examples at Authentication and Authorization
        if (rejection.status === 403) {
                    console.log("Invalid request, not authorized");
                    rejection.data.message = 'special processing failed';
                    $q.reject(rejection);
                    //$location.url('/user/signin');
        }
 
        
        console.log("Intercepter, responseError ");
        return $q.reject(rejection);
        }
    };
    }


    $httpProvider.interceptors.push(interceptor);
})