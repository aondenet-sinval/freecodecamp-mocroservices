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
  let utcDate = new Date(date)
  // date = Number(date)
  //Retorno da data atual se nenhuma data for informada pelo usuário
  if ((date === undefined) || (date === '')) {
    date = Date.parse(Date())
    utcDate = new Date(date)
    return res.json(
      {
        unix: Number(date),
        utc: utcDate.toUTCString()
      }
    )
  }
  // Se a variável date não for uma instância de Date ou não puder se
  //tornar um número válido retorna um erro
  if( !(date instanceof Date) && isNaN(date)) {
    return res.json({
      error: "Invalid Date"
    })
  }
  // Permissão de entrada de datas apenas com 10 digitos
  if (utcDate) {
    let unixDate = Date.parse(date)
    let utcValue = utcDate.toUTCString()
    if (!unixDate) {
      unixDate = Number(date)
      utcValue = new Date(Number(date))
      utcValue = utcValue.toUTCString()
    }
    return res.json(
      {
        unix: Number(unixDate),
        utc: utcValue
      }
    )
  }
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
