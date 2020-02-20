const express = require('express');
const puppeteer = require('puppeteer');
const cherio = require('cherio');
let app = express();


app.get('/testdata', function(req, res) {
    (async () => {
        const browser = await puppeteer.launch({
            args: ["--auto-open-devtools-for-tabs"],
            headless: false,
        });
        
        const page = await browser.newPage();
    
        var resp = await page.goto('https://track.aftership.com/vnpost/RR480312677VN'); 
        // console.log(resp)
    
        const contentHTML = await page.content();

        await page.setRequestInterception(true);
        page.on('response', async function (response) {
            
    
            // console.log(response.url())       
            if(response.url().toString().indexOf('https://track.aftership.com/api/shipment/RR480312677VN?trackingNumber=RR480312677VN&courier=vnpost') >= 0) 
            {
                console.log("text")
                const text = await response.text()
                //console.log(text.tracking)
                 console.log(JSON.parse(text))
                 console.log(JSON.parse(text).tracking);
                // const $ = cherio.load(text)
                // console.log("$",$);
                // console.log($('.item.box-style').length);
                res.json ([
                    JSON.parse(text).tracking
                ]);
            }
        });
        
        // await page.waitForSelector('[name="q"]').then(function(){
        //     (async () => {
        //         await page.type('[name="q"]', "laptop");
    
        //         await page.evaluate(() => {
        //             document.querySelector('.btn-search').click();
        //         });
    
        //     })();
        // })
    
        page.on('request', function(request) {
            request.continue();
        })
        
        // console.log(contentHTML)
    
        // await browser.close();
        
    })();
})

app.listen("8080", function() {
    console.log("listen 8080")
})
// Request URL: https://firebaseinstallations.googleapis.com/v1/projects/tinhte-apps/installations/f3CD5DE6bdq6C8CNN-ov2y/authTokens:generate
// Request Method: POST
// Status Code: 200 
// Remote Address: [2404:6800:4003:c02::5f]:443
// Referrer Policy: no-referrer-when-downgrade


// https://track.aftership.com/api/shipment/RR480312677VN?trackingNumber=RR480312677VN&courier=vnpost&gc_token=03AERD8XpzMhz1F_j5XRTYUMtlG8uGFFXCPNVmbA1l8bc37CM7w8GioPeKn3Y4CJFRMswApq7o-RqOb5x9kWIWtXLYGVi9NK6XMcEvghCPTXiREsRynZJu4crF-Dw9rCoKUJBBmsSVK1yOOcm4myjejYTlMhVDX3pMcSdplZLAqBMn5Tr4oeonARmVN9iTa_TsMCxO78Eo_WEeDR9_VbW5inoQ8h6zAg15K8IX9kPMOYsrmsTb-dFjX_JTu8isjJvCZMHAa1MWQ0-4U5djWvKa-jBYmFzc7yI4X_C5c4mIhpGdR2i0WATy16Kvbe-A3l-e5uMX5sPqnHMDNSjUjDdOExb38El9N1MXVgCNTOEIlH8C5Ajx0BLxlQJok6dy19YtwjZq-cgdNuxKuRVHMU3bAez8UeZrj1fjMFwACEQ5gHt2qCswOJVW6Y6KqJheQ8f4NXWEX1XvsmkhGPg60SueSsPuByJIp1UJIA