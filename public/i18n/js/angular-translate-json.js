
//reference and credit: http://www.ng-newsletter.com/posts/angular-translate.html

angular.module("myApp", ['ngSanitize', 'pascalprecht.translate'])

.config(function($translateProvider) {
    // Our translations will go in here
  $translateProvider.useStaticFilesLoader({
    prefix: '/i18n/languages/',
    suffix: '.json'
 });


    //default strict, no escaping html
   // $translateProvider.useSanitizeValueStrategy(null);


   //escape html, show escape chars
    //$translateProvider.useSanitizeValueStrategy('escape');

    //sanitize html using ngSanitize, must include 
    //$translateProvider.useSanitizeValueStrategy('sanitize');
 

  //this shall cache the langugae json in local storage
  //save bandwidth!! or save loading time
  //$translateProvider.useLocalStorage();

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

//trust HTML, high risk, sort of crime :-) if you do this without knowing
.filter("htmlSafe", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    };
}])

.controller("HeaderController", function($scope, $translate){
     
    //pick default one, just assignment
     
    $scope.switchLanguage = function (lang) {
         // $translate.use() Returns the currently used language key
        if (lang !== $translate.use()) {
            $translate.use(lang);
            //store to localStorage

            //just for demonstration, you either store in local or session
            sessionStorage.setItem("lang", lang);
            localStorage.setItem("lang",lang);
        }
    }
})

.controller("ProductController", function($scope){
    
})