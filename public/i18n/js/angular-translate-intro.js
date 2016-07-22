
//reference and credit: http://www.ng-newsletter.com/posts/angular-translate.html

angular.module("myApp", ['pascalprecht.translate'])

.config(function($translateProvider) {
    // Our translations will go in here
  $translateProvider.translations('en', {
    HEADLINE: 'Hello there, This is my awesome app!',
    INTRO_TEXT: 'And it has i18n support!',
    BUTTON_TEXT_EN: 'english',
    BUTTON_TEXT_DE: 'german'
  })
  .translations('de', {
    HEADLINE: 'Hey, das ist meine großartige App!',
    INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!',
    BUTTON_TEXT_EN: 'englisch',
    BUTTON_TEXT_DE: 'deutsch'
  });

  //default language
  $translateProvider.preferredLanguage('en');

  //OR

  //if we have existing settings either through browser, over localStorage, use this
  $translateProvider.determinePreferredLanguage(function () {
    // define a function to determine the language
    // and return a language key

     //just for demonstration, you either store in local or session
    var lang = sessionStorage.getItem("lang");
    console.log("Language is ", lang);

    if (!lang) {
        lang = localStorage.getItem("lang");
        console.log("Language is ", lang);
    } 

    console.log("Language is ", lang);

    if (!lang) {
        lang = 'en';
    }

    if (lang !== 'en' && lang !== 'de'){
        lang = 'en';
    }

    console.log("Language is ", lang);
    return lang;
 });
  
})


.controller("HeaderController", function($scope, $translate){
     
    //pick default one, just assignment
     

    $scope.switchLanguage = function (lang) {
         // $translate.use() Returns the currently used language key
        if (lang !== $translate.use()) {
            $translate.use(lang);
            //store to localStorage

            //just for demonstration, you either store in local or session
            sessionStorage.setItem("lang", lang);
            //localStorage.setItem("lang",lang);
        }
    }
})

.controller("ProductController", function($scope){
    
})