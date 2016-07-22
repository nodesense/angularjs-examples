// conf.js
/**
This configuration tells Protractor where your test files (specs) are, 
and where to talk to your Selenium Server (seleniumAddress).
It specifies that we will be using Jasmine for the test framework. 
It will use the defaults for all other configuration. 
Chrome is the default browser. 
**/
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['tests/*.spec.js']
}


/*move these lines inside, to run on firefox*/
/*
  capabilities: {
  'browserName': 'firefox'
	}
*/

//'chrome' for google chrome

/*
//to run on multiple browsers
multiCapabilities: [{
  'browserName': 'firefox'
}, {
  'browserName': 'chrome'
}]

*/

