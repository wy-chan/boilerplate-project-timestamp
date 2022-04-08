// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  
  let resObject={};
  
  if (!date){//if date is empty
    resObject.unix = new Date().getTime();
    resObject.utc = new Date().toUTCString();
  }else if((date.match(/^\d+$/))){//if date is unix
    resObject.unix = new Date(parseInt(date)).getTime();
    resObject.utc = new Date(parseInt(date)).toUTCString();
  }else{//if date is other formats
    resObject.unix = new Date(date).getTime();
    resObject.utc = new Date(date).toUTCString();
  }
  if(!resObject.unix||!resObject.utc){//if input is not correct
  res.json({ error : "Invalid Date" });
  }else{
  res.json(resObject);//response with json object
  }
});

