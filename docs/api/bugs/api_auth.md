# API-AUTH
## Bug-001
**Title:** Authorization returns 200 OK with `false` for empty username
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** High  
**Found during:** API smoke, regression testing  
**Related test cases:**
- API-AUTH-SMOKE-005
- API-AUTH-REGRESSION-002
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
- Username does not contain whitespace characters
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": " ",
     "password": "Qwerty123!"
   }
2. Observe response: 200 OK, body: false  
**Actual result:**
- Status code: 200 OK
- Response body: false
**Expected result:**
- Status code: 400 Bad Request
- Validation error for missing username
**Notes:**
- This inconsistency may allow partial credential validation and user enumeration
- Issue seems specific to cases where correct username does not contain whitespaces character (for usernames containing spaces, e.g. "Name Name"- authorization behaves correctly)
- Other whitespace scenarios (leading spaces, internal spaces in username) are handled correctly

## Bug-002
**Title:** Authorization ignores trailing spaces in credentials
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** Medium 
**Found during:** API regression testing  
**Related test cases:**
- API-AUTH-REGRESSION-004
- API-AUTH-REGRESSION-005
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": "Name ",
     "password": "Qwerty123! "
   }
2. Observe response: 200 OK, body: true  
**Actual result:**
- Status code: 200 OK
- Response body: true
**Expected result:**
- Status code: 404 Not Found or 404 Not Found
- Authorization should fail for credentials containing trailing whitespaces
**Notes:**
- This behavior may allow unintended credential matching
- The issue affects multiple credential fields and appears to be caused by missing input normalization
- Other whitespace scenarios (leading spaces, internal spaces in username) are handled correctly

## Bug-003
**Title:** API endpoint accessible over HTTP
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** High 
**Found during:** API security testing  
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `http://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": "Name",
     "password": "Qwerty123!"
   }
2. Observe response: 200 OK
**Actual result:**
- Status code: 200 OK
- Response body:
```<!doctype html> <html> <head> <meta name="viewport" content="width=device-width,initial-scale=1"> <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script> <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script> <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> <script async> async function detectAdBlock(){let e=!1;try{await fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")).catch(t=>e=!0)}catch(t){e=!1}finally{!0===e&&dataLayer.push({event:"Ad Blocker"}),console.log("AdBlock Enabled: "+e)}}detectAdBlock() </script> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5889298451609146" crossorigin="anonymous"></script> <title>DEMOQA</title> <div id="fixedban" style="width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:0;z-index:9999999"> <div style="text-align:center;display:block;max-width:970px;height:auto;overflow:hidden;margin:auto"> <script async="async" src="https://www.googletagservices.com/tag/js/gpt.js"></script> <script> var gptadslots=[],googletag=googletag||{cmd:[]} </script> <script> googletag.cmd.push((function(){var e=googletag.sizeMapping().addSize([0,0],[[320,50],[300,75],[300,50]]).addSize([730,200],[[728,90],[468,60]]).addSize([975,200],[[970,90],[728,90],[960,90],[750,100],[950,90],[468,60]]).build();gptadslots.push(googletag.defineSlot("/21849154601,22343295815/Ad.Plus-Anchor",[[320,100]],"adplus-anchor").setTargeting("site",["demoqa.com"]).defineSizeMapping(e).addService(googletag.pubads())),googletag.enableServices()})) </script> <div><a id="close-fixedban" onclick='document.getElementById("fixedban&apos").style.display="none&apos"' style="cursor:pointer"><img src="https://ad.plus/adplus-advertising.svg" alt="adplus-dvertising" title="Ad.Plus Advertising" style="vertical-align:middle"/></a> </div> <div id="adplus-anchor"> <script> googletag.cmd.push((function(){googletag.display("adplus-anchor")})) </script> </div> </div> </div> <script> !function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-MX8DD4S",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer") </script> <link rel="shortcut icon" href="/favicon.png"> <link href="/main.css" rel="stylesheet"> </head> <body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX8DD4S" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <div id="app"></div> <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer="defer"> </script> <script src="/bundle.js"></script> </body> </html> ```
**Expected result:**
- Status code: 301/302, redirect on HTTPS or 403/400 with error 
**Notes:**
- This behavior indicates that API is not protected at the transport layer
- API endpoint over HTTP responds with HTML content instead of API error or redirect

