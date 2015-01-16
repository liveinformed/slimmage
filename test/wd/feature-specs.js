/* global describe,before,it*/

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var verbose = true;
var test	= require('./test_functions.js');

// this.browser and this.wd are injected by the grunt-wd-mocha plugin.

describe('slimmage', function() {
    var tests_to_call;

    before(function(done) {
      // enables chai assertion chaining
      chaiAsPromised.transferPromiseness = this.wd.transferPromiseness;
      // Add logging if verbose
      if(verbose){
        // optional logging
        this.browser.on('status', function(info) {
          console.log(info.cyan);
        });
        this.browser.on('command', function(meth, path, data) {
          console.log(' > ' + meth.yellow, path.grey, data || '');
        });
      }


      this.browser
      .sessionCapabilities()
      .then(function(caps) {

        if (/iphone|ipad|android/i.test(caps.deviceName) ) {

          console.log('This is a mobile device - ' + caps.deviceName);
          tests_to_call = test.mobile;

        } else if (/internet explorer/i.test(caps.browserName) && parseFloat(caps.version) <= 8.0) {

          console.log('This is Internet Explorer ' + caps.version);
          tests_to_call = test.desktop_ie;

        } else if (/opera/i.test(caps.browserName) || (/chrome/i.test(caps.browserN) && parseFloat(caps.version) <= 30) ) {
          console.log('This browser may not support window resizing ' + caps.browserName + "  " + bro + caps.version);
          tests_to_call = test.deskop_fixed;
        } else {

          console.log('Run default tests...desktop');
          tests_to_call = test.desktop;

        }
      })
      .nodeify(done);

    });

    //--------------------------------------------------------------------------
    //---  Run the tests, this is the entry point as defined in 'before'     ---
    //--------------------------------------------------------------------------

    it('tests',function() {
      tests_to_call.call(this);
    });

  }); // describe slimmage
