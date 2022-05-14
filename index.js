// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
let resObject = {}

app.get("/api/timestamp/:timestamp", (req, res) => {
    let timestamp = res.params.timestamp;
    if(timestamp.includes('-')){
      resObject['unix'] = new Date(timestamp).getTime()
      resObject['utc'] = new Date(timestamp).toUTCString()
    }else{
      timestamp = parseInt(timestamp)
      resObject['unix'] = new Date(timestamp).getTime()
      resObject['utc'] = new Date(timestamp).toUTCString()
    }
    let date = new Date(timestamp);
    console.log(date);
    if(!resObject['unix'] || !resObject['utc']){
      res.json({error: 'Invalid Date'})
    }
      res.json(resObject)
  })

app.get("/api/timestamp/", (req, res) => {
  resObject['unix'] = new Date().getTime()
  resObject['utc'] = new Date().toUTCString()
  res.json(resObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
