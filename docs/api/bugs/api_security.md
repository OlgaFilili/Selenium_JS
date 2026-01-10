# API-SECURITY
## Bug-001
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
2. Observe response.
**Actual result:**
- Status code: 200 OK
- Response body:
```<!doctype html> <html> <head> <meta name="viewport" content="width=device-width,initial-scale=1"> <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script> <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script> <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> <script async> async function detectAdBlock(){let e=!1;try{await fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")).catch(t=>e=!0)}catch(t){e=!1}finally{!0===e&&dataLayer.push({event:"Ad Blocker"}),console.log("AdBlock Enabled: "+e)}}detectAdBlock() </script> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5889298451609146" crossorigin="anonymous"></script> <title>DEMOQA</title> <div id="fixedban" style="width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:0;z-index:9999999"> <div style="text-align:center;display:block;max-width:970px;height:auto;overflow:hidden;margin:auto"> <script async="async" src="https://www.googletagservices.com/tag/js/gpt.js"></script> <script> var gptadslots=[],googletag=googletag||{cmd:[]} </script> <script> googletag.cmd.push((function(){var e=googletag.sizeMapping().addSize([0,0],[[320,50],[300,75],[300,50]]).addSize([730,200],[[728,90],[468,60]]).addSize([975,200],[[970,90],[728,90],[960,90],[750,100],[950,90],[468,60]]).build();gptadslots.push(googletag.defineSlot("/21849154601,22343295815/Ad.Plus-Anchor",[[320,100]],"adplus-anchor").setTargeting("site",["demoqa.com"]).defineSizeMapping(e).addService(googletag.pubads())),googletag.enableServices()})) </script> <div><a id="close-fixedban" onclick='document.getElementById("fixedban&apos").style.display="none&apos"' style="cursor:pointer"><img src="https://ad.plus/adplus-advertising.svg" alt="adplus-dvertising" title="Ad.Plus Advertising" style="vertical-align:middle"/></a> </div> <div id="adplus-anchor"> <script> googletag.cmd.push((function(){googletag.display("adplus-anchor")})) </script> </div> </div> </div> <script> !function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=GTM-MX8DD4S",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer") </script> <link rel="shortcut icon" href="/favicon.png"> <link href="/main.css" rel="stylesheet"> </head> <body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX8DD4S" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <div id="app"></div> <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer="defer"> </script> <script src="/bundle.js"></script> </body> </html> ```
**Expected result:**
- Status code: 301/302, redirect on HTTPS or 403/400 with error 
**Notes:**
- This behavior indicates that API is not protected at the transport layer
- API endpoint over HTTP responds with HTML content instead of API error or redirect

## Bug-007
**Title:** API exposes internal stack trace when unsupported charset in Authorized endpoint is provided
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** Low / Medium 
**Found during:** API security testing, error handling issue
**Related test cases:**
- API-AUTH-REGRESSION-020
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `http://demoqa.com/Account/v1/Authorized` with:
- Header "Content-Type": "application/json; charset=UTF-16"
- Body:
   {
     "userName": "Name",
     "password": "Qwerty123!"
   }
2. Observe response.
**Actual result:**
- Status code: 400 Bad Request
- Response body:
``` <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>SyntaxError: Unexpected token ൻ in JSON at position 0<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at createStrictSyntaxError (/usr/projects/demosite/node_modules/body-parser/lib/types/json.js:169:10)<br> &nbsp; &nbsp;at parse (/usr/projects/demosite/node_modules/body-parser/lib/types/json.js:86:15)<br> &nbsp; &nbsp;at /usr/projects/demosite/node_modules/body-parser/lib/read.js:128:18<br> &nbsp; &nbsp;at AsyncResource.runInAsyncScope (node:async_hooks:203:9)<br> &nbsp; &nbsp;at invokeCallback (/usr/projects/demosite/node_modules/raw-body/index.js:238:16)<br> &nbsp; &nbsp;at done (/usr/projects/demosite/node_modules/raw-body/index.js:227:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/usr/projects/demosite/node_modules/raw-body/index.js:287:7)<br> &nbsp; &nbsp;at IncomingMessage.emit (node:events:517:28)<br> &nbsp; &nbsp;at endReadableNT (node:internal/streams/readable:1400:12)</pre> </body> </html> ```
**Expected result:**
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed
- No stack trace or HTML error page returned
**Notes:**
- Similar issue observed in endpoint /Account/v1/GenerateToken (Bug-011)
- Header validation should be perfomed before request body processing
- API exposes internal implementation details and stack trace when an invalid charset is provided in the Content-Type request header
- This behavior may lead to information disclosure and should be handled with a generic error response

## Bug-011
**Title:** API exposes internal stack trace when unsupported charset in generate token endpoint is provided
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/GenerateToken 
**Severity:** Low / Medium
**Found during:** API security testing, error handling issue
**Related test cases:**
- API-GENERATE-REGRESSION-020
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `http://demoqa.com/Account/v1/GenerateToken` with:
- Header "Content-Type": "application/json; charset=UTF-16"
- Body:
   {
     "userName": "Name",
     "password": "Qwerty123!"
   }
2. Observe response.
**Actual result:**
- Status code: 400 Bad Request
- Response body:
``` <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>SyntaxError: Unexpected token ൻ in JSON at position 0<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at createStrictSyntaxError (/usr/projects/demosite/node_modules/body-parser/lib/types/json.js:169:10)<br> &nbsp; &nbsp;at parse (/usr/projects/demosite/node_modules/body-parser/lib/types/json.js:86:15)<br> &nbsp; &nbsp;at /usr/projects/demosite/node_modules/body-parser/lib/read.js:128:18<br> &nbsp; &nbsp;at AsyncResource.runInAsyncScope (node:async_hooks:203:9)<br> &nbsp; &nbsp;at invokeCallback (/usr/projects/demosite/node_modules/raw-body/index.js:238:16)<br> &nbsp; &nbsp;at done (/usr/projects/demosite/node_modules/raw-body/index.js:227:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/usr/projects/demosite/node_modules/raw-body/index.js:287:7)<br> &nbsp; &nbsp;at IncomingMessage.emit (node:events:517:28)<br> &nbsp; &nbsp;at endReadableNT (node:internal/streams/readable:1400:12)</pre> </body> </html> ```
**Expected result:**
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed
- No stack trace or HTML error page returned
**Notes:**
- Similar issue observed in endpoint /Account/v1/Authorized (Bug-007)
- Header validation should be perfomed before request body processing
- API exposes internal implementation details and stack trace when an invalid charset is provided in the Content-Type request header
- This behavior may lead to information disclosure and should be handled with a generic error response