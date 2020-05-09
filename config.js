var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var jasmineReporters = require('jasmine-reporters');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var strDest = 'AppTrana - Test Execution Result ';

// Reporting part in form of HTML
var reporter = new HtmlScreenshotReporter({
	dest: strDest,
	filename: 'Apptrana - Test Execution Result.html',   
	reportTitle: 'Apptrana - Test Execution Result',
	reportOnlyFailedSpecs: false,
	captureOnlyFailedSpecs: false,
	showQuickLinks: true
});
// REorting part in form of XML 
var reporterJUnit = new jasmineReporters.JUnitXmlReporter({
	savePath: strDest,
	modifyReportFileName: function(generatedFileName, suite) {
		return 'Apptrana - Test Execution Result.xml';
	},
	consolidateAll: true
});

var specReport = new SpecReporter({
	spec: {
		displayStacktrace: true
	}
});

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
   onPrepare:function(){
    jasmine.getEnv().addReporter(reporter);
    jasmine.getEnv().addReporter(reporterJUnit);
    jasmine.getEnv().addReporter(specReport);
    browser.ignoreSynchronization = true;  // Added as non Angular Application for Syncronization handle
   },

   // Close the report after all tests finish
	afterLaunch: function(exitCode) {
		return new Promise(function(resolve){
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},
	
	useAllAngular2AppRoots: true,
    framework: 'jasmine',
    
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      browserName: 'chrome',
      marionette : true,
    acceptInsecureCerts : true  // to handle private security option
    },

    specs: ['apptrana.spec.js'],
  
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true, // Use colors in the command line report.
      includeStackTrace: true,
      defaultTimeoutInterval: 1440000  // By Default implict time out for the execution
    }
  };