// spec.js
//https://angular.github.io/protractor/#/tutorial
/**
The 'describe' and 'it' syntax is from the Jasmine framework. 
'browser' is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get 
**/

/**
This uses the globals element and by, which are also created by Protractor. 
The element function is used for finding HTML elements on your webpage.
It returns an ElementFinder object, which can be used to interact with the element or get information from it. 
In this test, we use sendKeys to type into <input>s, click to click a button, and getText to return the content of an element. 
**/

/**
element takes one parameter, a Locator, which describes how to find the element. 
The by object creates Locators. Here, we're using three types of Locators:

by.model('first') to find the element with ng-model="first".
If you inspect the Calculator page source, you will see this is <input type=text ng-model="first">.
by.id('gobutton') to find the element with the given id. This finds <button id="gobutton">.
by.binding('latest') to find the element bound to the variable latest. This finds the span containing {{latest}} 
**/
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
  
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('3');
  });

  it('should add 10 and 20', function() {
    console.log("this be seen on server");
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(10);
    element(by.model('second')).sendKeys(20);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('30'); //just for failing
  });
});