// spec.js

/**
The 'describe' and 'it' syntax is from the Jasmine framework. 
'browser' is a global created by Protractor,
 which is used for browser-level commands such as navigation
 with browser.get 
**/
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});