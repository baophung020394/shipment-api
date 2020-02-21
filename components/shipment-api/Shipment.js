class Shipment {
    constructor() {}
    getText() {
        console.log('Text')
    }
    // getInfomationTrack() {
    //     // (async () => {
    //         try {
    //         const browser = await puppeteer.launch({
    //             // args: ["--auto-open-devtools-for-tabs"],
    //             headless: false,
    //         });
    //         var nums = 'RR480312677VN'
    //         const page = await browser.newPage();
    
    //         page.on('error', err=> {
    //             console.log('error happen at the page: ', err);
    //         });
            
    //         var resp = await page.goto(`https://t.17track.net/en#nums=${nums}`); 
    //         // console.log(resp)
        
    //         const contentHTML = await page.content();
    
    //         await page.setRequestInterception(true);
    //         page.on('response', async function (response) {
    
    //                 if(response.url().toString().indexOf('https://t.17track.net/restapi/track') >= 0) 
    //                 {
    //                     console.log("text")
    //                     const text = await response.text();
    //                     let datas = JSON.parse(text).dat[0].track;
    //                     console.log(typeof datas);
    //                     if(datas === null) {
    //                         res.json({
    //                             errors: [{
    //                                 status: 400,
    //                                 message: "Data null"
    //                             }]
    //                         })
                            
    //                     } else {
    //                         let trucks = JSON.parse(text).dat[0].track.z1;
    //                         for (let i of trucks) {
    //                             return res.json ({
    //                                 status: 200,
    //                                 message: "Success",
    //                                 track: [{
    //                                     date: i['a'],
    //                                     code: i['c'],
    //                                     note: i['z']
    //                                 }]
    //                             });
    //                         }
    //                     } 
    //                 } 
    //               })   
    
    //             page.on('request', function(request) {
    //                 request.continue();
    //             })
    //         }  catch (error) {
    //             // console.log(error);
    //         }
    //         // await browser.close();
            
    //     // })();
    // }
}

module.exports = Shipment;