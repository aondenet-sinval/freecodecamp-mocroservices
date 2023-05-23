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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  let { date } = req.params;

  if (Number(date)) date = Number(date);
  // Definindo newDate caso o parametro seja passado ou não
  const newDate = date ? new Date(date) : new Date();
  // Caso de datas inválidas
  if (newDate == 'Invalid Date') {
    return res.status(400).json({ error: `${newDate}`})
  }

  const utc = newDate.toUTCString();
  const unix = newDate.valueOf();

  res.status(200).json({ unix, utc });
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
