describe('SimpleFilters', function(){ //describe your object type
    beforeEach(module('SimpleApp')); //load module

    describe('TestReverse',function(){ //describe your app name

        var reverse;
        beforeEach(inject(function($filter){ //initialize your filter
            reverse = $filter('reverse',{});
        }));

        it('Should reverse a string-success', function(){  //write tests
            expect(reverse('rahil')).toBe('lihar'); //pass
            expect(reverse('don')).toBe('nod'); //pass
            //expect(reverse('jam')).toBe('oops'); // this test should fail
        });

        it('Should reverse a string- fail', function(){  //write tests
            //expect(reverse('rahil')).toBe('lihar'); //pass
            //expect(reverse('don')).toBe('nod'); //pass
            expect(reverse('jam')).toBe('maj'); // this test should fail
        });

    });

});

describe('TestNavCtrl', function() {

   beforeEach(module('ControllerApp'));

   var scope, $location, createController;

   beforeEach(inject(function ($rootScope, $controller, _$location_) {
       $location = _$location_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('NavCtrl', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        $location.path('/about');
         
        expect(scope.isActive('/about')).toBe(true);
        expect(scope.isActive('/contact')).toBe(false);
        	

        //just to fail the test for demo
        expect(scope.isActive('/contact')).toBe(false);
        console.log("report to server");
    });

});

describe('foo test services', function () {
    console.log("running http backend mock");
    var foo, $httpBackend;

   beforeEach(module('ServiceApp'));


    beforeEach(inject(function (_$httpBackend_, _foo_) {
      $httpBackend = _$httpBackend_;
      foo = _foo_;
    }));

    it('foo.bar() - test', function () {
        // assume that a GET call to our RESTful API URL of http://example.com/rest/hello-world just returns a plain text string:Hi!
        $httpBackend.expectGET('http://example.com/rest/hello-world')
        .respond('Hi!');


        foo.bar().then(function(data) {
            expect(data).toEqual('Hi!');
        });

        $httpBackend.flush();
        
    });

    it('foo.bar() - test', function () {
        // assume that a GET call to our RESTful API URL of http://example.com/rest/hello-world just returns a plain text string:Hi!
        $httpBackend.expectGET('http://example.com/rest/hello-world')
        .respond('Hello!');
        foo.bar().then(function(data) {
            expect(data).toEqual('Hello!');
        });
        $httpBackend.flush();
    });

});

