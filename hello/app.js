

var express = require('express');
var bodyParser = require('body-parser');
var Alexa = require('alexa-sdk');
var app = express();


// Declare handlers for processing the incoming intents
var handlers = {
    'Hello': function () {
        this.emit(':tell', "Hello! This is alexa speaking from your local network monkaS");
    },
    'Unhandled': function () {
        this.emit(':ask', "Something went wrong. The intent could not be handled.");
    }
};

app.use(bodyParser.json());
app.post('/', function(req, res) {

        var context = {
            succeed: function (result) {
                console.log(result);
                res.json(result);
            },
            fail:function (error) {
                console.log(error);
            }
        };

        var alexa = Alexa.handler(req.body, context);
        //alexa.appId = "...";
        alexa.registerHandlers(handlers);
        alexa.execute();
});


app.listen(3000, function () {
  console.log('Listening on port 3000...');
});




