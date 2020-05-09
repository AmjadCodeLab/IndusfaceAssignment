var apptrana = require('./apptrana.po.js');
var TestData = require('./apptrana.json');
// describe define the Test Suite/ flow / functionlty
describe('To Validate the IP Address Functionality', function() {

    // it define the test case inside the suite
    it('Validate User can access and store IP address',function(){
        apptrana.myIPAddress(TestData.ipurl);
        
    });

    it('Validate User can access Apptrana client URL and Validate the functonality',function(){
        apptrana.ValidateURL(TestData.apptranaurl); 

    });
    it('Retrival store and check',function(){
        apptrana.ParseRetrival();
    })

    });