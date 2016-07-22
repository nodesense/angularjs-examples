
describe('Math Controller Test', function() {

   beforeEach(module('mathApp'));

   var scope, createController;

   beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        console.log("beforeEach");
        createController = function() {
            return $controller('MathController', {
                '$scope': scope
            });
        };
    }));

    it('A + B default test', function() {
        var controller = createController();
         scope.sum();
         expect(scope.result).toBe(0);
    });

    it('A + B two values test', function() {
        var controller = createController();
        scope.a  = 20;
        scope.b  = 10;
         scope.sum();
         expect(scope.result).toBe(30);
    });
});