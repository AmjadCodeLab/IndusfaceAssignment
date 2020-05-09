var Apptrana = function(){  
    var fs = require('fs');
    var properties = require ("properties");
    
     // Element Locator Declaration
     this.txtWebDescription = element(by.xpath("//body[contains(text(),'This website is secured against online attacks. Yo')]"));
     this.IPAddress = element(by.xpath("//pre"));

     // Variable Declaration
     var outputFilename = 'test.txt';
     var ResultFilename = 'result.properties'
     var output;
     var myip;
     var obj;
     
     //Function for getting IP Address from Third Party WebPortal
     this.myIPAddress = function(ipurl){
          browser.get(ipurl);
          browser.sleep(4000);
          this.IPAddress.getText().then(function(ip){
              myip = ip;             
             console.log(myip);
          }) 
          browser.sleep(10000);    // 10 Sec time to wait for the next url to hit on browser 
         
     };
     //Function for Validation
     this.ValidateURL = function(apptranaurl){
         browser.get(apptranaurl);
         expect(browser.getCurrentUrl()).toContain(apptranaurl);
         browser.sleep(1000);
            this.txtWebDescription.getText().then(function(txt){
                output = txt;
            console.log(output);
            expect(output).toContain(myip);
            // Store value in  text file.
            fs.writeFile(outputFilename, output, function(err) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Result saved to " + outputFilename);
                }
            });    
         })
         
     };   

     this.ParseRetrival = function(){
        
        properties.parse ("test.txt", { path: true }, function (error, obj){
            if (error) return console.error (error);
            
            console.log (obj);
            
          });

          fs.writeFile(ResultFilename, obj, function(err) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Result saved to " + ResultFilename);
            }
        });
     }
     
     

 };
                 
 module.exports = new Apptrana();