/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
let express = require('express')
var bodyParser = require('body-parser')
let app = express()
let url = require('url')
let port = process.env.PORT || 8080
// app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json()); //here
app.use(bodyParser.urlencoded({ extended: true }));
var minimumHR = 0;
var maximumHR = 0;
var meanHR = 0;
var medianHR = 0;
var arrayOfHRs = [];

app.get('/addData', (req, res) => {
    let hr = parseInt(req.query.heartRate, 10);
    console.log("in add data route: ")
    if (Object.keys(req.query).length != 0 || req.query.heartRate != '') {
        arrayOfHRs.push(hr);
        console.log(arrayOfHRs);

        minimumHR = Math.min(...arrayOfHRs);
        maximumHR = Math.max(...arrayOfHRs);

        let sum = 0;
        for (let i = 0; i < arrayOfHRs.length; i++) {
            sum += arrayOfHRs[i];
        }
        meanHR = sum / arrayOfHRs.length;

        var mid = Math.floor(arrayOfHRs.length / 2);

        if (arrayOfHRs.length % 2)
            medianHR = arrayOfHRs[mid];

        medianHR = (arrayOfHRs[mid - 1] + arrayOfHRs[mid]) / 2.0;
        res.send("Request handled and sent");
        console.log(req.query);
    }
    else{
        res.send("Did not provide Query parameter");
    }

})

app.get('/statistics', (req, res) => {
    res.render('statistics', { minimumHR: minimumHR, maximumHR: maximumHR, meanHR: meanHR, medianHR: medianHR })
})

// POST method route
app.post('/', function (req, res) {
    res.send('POST req to the homepage\n')
})

app.listen(port, () => console.log('Example app listening on port: ' + port))