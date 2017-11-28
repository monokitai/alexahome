

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Initialize the Alexa SDK
var Alexa = require('alexa-sdk');


// Declare handlers for processing the incoming intents
var handlers = {
    'Hello': function () {
        //var item = this.event.request.intent.slots.item.value;
        this.emit(':tell', "Hello! This is alexa speaking from your local network monkaS");
    },
    'Unhandled': function () {
        this.emit(':ask', "Something went wrong. The intent could not be handled.");
    }
};

app.use(bodyParser.json());
app.post('/', function(req, res) {


        // Build the context manually, because Amazon Lambda is missing
        var context = {
            succeed: function (result) {
                console.log(result);
                res.json(result);
            },
            fail:function (error) {
                console.log(error);
            }
        };
        // Delegate the request to the Alexa SDK and the declared intent-handlers


        var alexa = Alexa.handler(req.body, context);
        //alexa.appId = "...";
        alexa.registerHandlers(handlers);
        alexa.execute();
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



