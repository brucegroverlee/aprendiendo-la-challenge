require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// init app
const port = process.env.PORT || 10000;
const app = express();

// middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs
}

// ********************************************
// ROUTERS
// ********************************************
const countriesRouter = require(path.join(__dirname, 'api/countries'));

// ********************************************
// API
// ********************************************
app.use('/countries', countriesRouter )

// ********************************************
// The 404 Route
// ********************************************
app.use( (req, res, next) => {
  res.status(404)
  // respond with html page
  if (req.accepts('html')) {
    res.type('txt').send('Aprendiendo.la 404')
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Aprendiendo.la 404' })
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Aprendiendo.la 404')
})

// ********************************************
// http server listening
// ********************************************
app.listen(port, function () {
  console.log('NODE_ENV: ', process.env.NODE_ENV)
  console.log('The Api is running on http://localhost:%d/', port)
})

module.exports = app // for testing