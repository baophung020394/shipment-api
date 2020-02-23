const express = require('express');

let app = express();

const Shipment = require('./components/shipment-api/Shipment')
const shipment = new Shipment();

// Get Infomation of Track by Number
app.get('/tracking-number', async function(req, res) {
    let data = await shipment.getInfomationTrack('RR480312677VN');
    for (let i = 0; i < data.length; i++) {
        if(data[i].mes === 'Success') {
             return res.json({
                status: '200',
                tracks: data
            });
        } else {
            return res.json({
                status: '400',
                tracks: data
            });
        }
    } 
})

app.listen("8080", function(req, res) {
    console.log("listen 8080")
})