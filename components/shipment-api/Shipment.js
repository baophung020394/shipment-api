const axios = require('axios');
const puppeteer = require('puppeteer');

class Shipment {
  constructor() { }

  async getInfomationTrack(nums) {

    return new Promise(async (res, req) => {
      try {
        const browser = await puppeteer.launch({
          // args: ["--auto-open-devtools-for-tabs"],
          headless: false,
        })
        const page = await browser.newPage();

        page.on('error', err => {
          console.log('error happen at the page: ', err);
        });

        var resp = await page.goto(`https://t.17track.net/en#nums=${nums}`);
        const contentHTML = await page.content();

        await page.setRequestInterception(true);
        page.on('response', async function (response) {

          if (response.url().toString().indexOf('https://t.17track.net/restapi/track') >= 0) {

            const json = await response.json();
            let datas = json.dat[0].track;
            if (datas === null) {
              let trucks = [{
                mes: 'Fail',
                err: 'Data not found'
              }]
              let result = trucks;
              return res(result);
            } else {
              let trucks = json.dat[0].track.z1;
              let result = trucks.map(item => {
                return {
                  date: item['a'],
                  code: item['c'],
                  note: item['z'],
                  mes: 'Success',
                }
              });
              res(result);
            }
          }
        })

        page.on('request', function (request) {
          request.continue();
        })

      } catch (error) {
        // console.log(error);
      }
      // await browser.close();
    }); // End Promise
  }
}

module.exports = Shipment;