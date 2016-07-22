angular.module("myApp", ["tmh.dynamicLocale"])

.config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/libs/i18n/angular-locale_{{locale}}.js');
  })

.controller("HeaderController", function($scope, tmhDynamicLocale){
    //pick default one, just assignment
      
    $scope.switchLanguage = function (lang) {
        tmhDynamicLocale.set(lang);
    }
})


.controller("ProductController", function($scope){
    $scope.product = {
        name: 'iPhone',
        brand: 'Apple',
        price: 400,
        rating: 80.85,
        stock: 100
    }
    $scope.timeNow = new Date();
})