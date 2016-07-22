describe('testing product service', function () {
    console.log("running http backend mock");
    var productService, $httpBackend;

   beforeEach(module('catalogApp'));

   
   //injection by mock framework, use _serviceName_ to receice referece
   //this is just to preserve module variable scope productService
    beforeEach(inject(function (_$httpBackend_, _productService_) {
      $httpBackend = _$httpBackend_;
      productService = _productService_;
    }));
   
    it('get products-test', function () {
         $httpBackend.expectGET('http://example.com/api/products').respond([
                {id: 1, name: 'iPhone', brand:'Apple'},
                {id: 2, name: 'Nexus', brand:'Google'},
            ]);
           
        productService.getProducts().then(function(products) {
            expect(products.length).toEqual(2);
        });

        $httpBackend.flush();
    });


     it('get products-test', function () {
         $httpBackend.expectGET('http://example.com/api/products/1').respond(
                {id: 1, name: 'iPhone', brand:'Apple'}
            );

        productService.getProduct(1).then(function(product) {
            expect(product.id).toEqual(1);
            expect(product.name).toEqual('iPhone');
            expect(product.brand).toEqual('Apple');
        });

        $httpBackend.flush();
    });


     it('get products-not-found', function () {
        //respond – {function([status,] data[, headers, statusText]) | function(function(method, url, data, headers)} –

        $httpBackend
            .expectGET('http://example.com/api/products/1000')
            .respond(function (method, url, data, headers) {
                return [404, {result:false}, {}, 'Not Found'];
            });
            
        productService.getProduct(1000).then(function(product) {
            expect(true).toEqual(false);
        },
        function (err) {
            console.log("rejected with error ");
             expect(true).toEqual(true);
        }
        );

        $httpBackend.flush();
    });

   
   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
});



describe('testing product service with backendData', function () {
    console.log("running http backend mock");
    var productService, $httpBackend;
    var productsRequestHandler;

   beforeEach(module('catalogApp'));
 
      
    beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     productService = $injector.get('productService');
     productsRequestHandler = $httpBackend.when('GET', 
                           'http://example.com/api/products')
                            .respond([
                                {id: 1, name: 'iPhone', brand:'Apple'},
                                {id: 2, name: 'Nexus', brand:'Google'},
                            ]);
    }));

    it('get products-test', function () {
         $httpBackend.expectGET('http://example.com/api/products');
           
        productService.getProducts().then(function(products) {
            expect(products.length).toEqual(2);
        });

        $httpBackend.flush();
    });

    it('get products-fail', function () {
        productsRequestHandler.respond(200, [
                                {id: 1, name: 'iPhone', brand:'Apple'}
                            ]);
         $httpBackend.expectGET('http://example.com/api/products');
           
        productService.getProducts().then(function(products) {
             //to fail test for learning
            //expect(products.length).toEqual(2);
            expect(products.length).toEqual(1);
        });

        $httpBackend.flush();
    });

  
    it('get products-server error', function () {
        productsRequestHandler.respond(500, [
                                {}
                            ]);
         $httpBackend.expectGET('http://example.com/api/products');
           
        productService.getProducts().then(function(products) {
            //this should not called, a promise fails
            expect(true).toEqual(false);
        }, function(err){
            expect(true).toBe(true);
        });

        $httpBackend.flush();
    });

     it('get products-test', function () {
         $httpBackend.expectGET('http://example.com/api/products/1').respond(
                {id: 1, name: 'iPhone', brand:'Apple'}
            );


        productService.getProduct(1).then(function(product) {
            expect(product.id).toEqual(1);
            expect(product.name).toEqual('iPhone');
            expect(product.brand).toEqual('Apple');
        });

        $httpBackend.flush();
    });


     it('get products-not-found', function () {
        //respond – {function([status,] data[, headers, statusText]) | function(function(method, url, data, headers)} –

        $httpBackend
            .expectGET('http://example.com/api/products/1000')
            .respond(function (method, url, data, headers) {
                return [404, {result:false}, {}, 'Not Found'];
            });
            
        productService.getProduct(1000).then(function(product) {
            expect(true).toEqual(false);
        },
        function (err) {
            console.log("rejected with error ");
             expect(true).toEqual(true);
        }
        );

        $httpBackend.flush();
    });

   
   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
});



describe('ProductController Test', function() {

   beforeEach(module('catalogApp'));

   var scope, $location, createController;
   var productsRequestHandler;
   var $httpBackend;

   beforeEach(inject(function ($injector, $rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();
        $httpBackend =  $injector.get('$httpBackend');
        createController = function() {
            return $controller('ProductController', {
                '$scope': scope
            });
        };

        
         productsRequestHandler = $httpBackend.when('GET', 'http://example.com/api/products')
                            .respond([
                                {id: 1, name: 'iPhone', brand:'Apple'},
                                {id: 2, name: 'Nexus', brand:'Google'},
                            ]);
    }));

    it('products must have two count', function() {
        var controller = createController();


        //set the current url, localhost:3000/app#/products
       
         
        $httpBackend.flush();

        expect(scope.products.length).toBe(2);
         

        console.log("report to server");
    });

});


//mock a service
describe('OrderController Test', function() {



    beforeEach(module('catalogApp', function ($provide) {
        $provide.value('paymentService', {
                transfer: function(cardInfo, sum){
                    return true;
                }
            });
    }));
 

   var scope, $location, createController;
   
   

   beforeEach(inject(function ($injector, $rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();
       
        createController = function() {
            return $controller('OrderController', {
                '$scope': scope
            });
        };
         
    }));

    it('products must be successful', function() {
        var controller = createController();

        scope.orderNow();
        expect(scope.orderSuccess).toBe(true);

        console.log("report to server");
    });

});