'use strict';

// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server

require('dotenv').config()

const line = require('@line/bot-sdk');

const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
    console.log('get webhook')
});

// Creates the endpoint for our webhook 
app.post('/line/webhook', (req, res) => {
    console.log('req.body -> ', req.body)
    console.log('req.body.source -> ', req.body.events[0].source)
    console.log('req.body.message -> ', req.body.events[0].message)

    if (req.body.events[0].type === 'message') {
        if (req.body.events[0].message.type === 'text') {
            console.log('in if[message]')
            const message = {
                type: 'text',
                text: 'Hello World!'
            };

            client.replyMessage(req.body.events[0].replyToken, message)
                .then(() => {
                    console.log('send success ...')
                })
                .catch((err) => {
                    // error handling
                    console.log('error -> ', err)
                });
        } else if (req.body.events[0].message.type === 'location') {
            console.log('in elseif[location]')
            const message = {
                "type": "location",
                "title": "my location",
                "address": "หมู่บ้านคลองชะโด",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            }

            client.replyMessage(req.body.events[0].replyToken, message)
                .then(() => {
                    console.log('send success ...')
                })
                .catch((err) => {
                    // error handling
                    console.log('error -> ', err)
                });
        } else {
            console.log('else ...')
        }
    }

    res.send('success')
});
// Sets server port and logs message on success
app.listen(process.env.PORT || 3700, () => console.log(`webhook is listening on port 3700`));