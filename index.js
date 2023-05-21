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
  let { date } = req.params
  //Retorno da data atual se nenhuma data for informada pelo usuário
  if (date === undefined) {
    date = Date.now()
    const dateUtc = new Date(date)
    return res.json(
      {
        unix: date,
        utc: dateUtc.toUTCString()
      }
    )
  }
  // Permissão de entrada de datas apenas com 10 digitos
  if (date.length === 10) {
    const dateUtc = new Date(date)
    const resDate = Date.parse(date)
    return res.json(
      {
        unix: resDate ? resDate : date,
        utc: dateUtc.toUTCString()
      }
    )
  }
  if ((date.length > 10) && (date.length < 14) && (!isNaN(date))) {
    const dateUtc = new Date(Number(date))
    const resDate = Date.parse(Number(date))
    return res.json(
      {
        unix: resDate ? resDate : Number(date),
        utc: dateUtc.toUTCString()
      }
    )
  }
  // Se a variável date não for uma instância de Date retorna um erro
  date = new Date(date)
  if( !(date instanceof Date && !isNaN(date)) ) {
    return res.json({
      error: "Invalid Date"
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// Development
// const port = 33869
// var listener = app.listen(port, function () {
//   console.log('Your app is listening on port ' + port);
// });
