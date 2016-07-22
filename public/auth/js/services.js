angular.module('app.services', [])
    .service("productService", function($http){
        this.getProducts = function(){
            return $http({url:'http://localhost:7070/api/products'}); //return promise
        }
    })
    .factory('authService', ['$http', function($http){
        var baseUrl = "http://localhost:7070";

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        //var currentUser = getUserFromToken();

        return {
            isLoggedIn:function() {
                console.log("token in ", localStorage.token);
                if  (localStorage.token == null || localStorage.token == undefined)
                 return false;

                return true;
            },

            login: function(data, success, error) {
                $http.post(baseUrl + '/api/authenticate', data).then(success, error)
            },
            
            logout: function(success) {
                //changeUser({});
                delete localStorage.token;
                success();
            }
        };
    }
]);