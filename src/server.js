'use strict';
const express = require('express');
const router = require('./auth/router');
const cors = require('cors');
const morgan = require('morgan');
// const extraRouts = require('./models/extra-routes');
const notFound404 = require('./middleware/404');//get it
const serverError500 = require('./middleware/500.js');///get it
require('dotenv').config('.env');

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());
app.use(morgan('dev'));

app.get('/bad', (req, res) => {
  res.status(400).send('bad Request');
  throw new Error('bad Request');
});

app.use('*', notFound404);
app.use(serverError500);

module.exports = {
  server: app,
  start: port => {
    let PORT = 4000 || process.env.PORT || port;
    app.listen(PORT, () => console.log(` server started at port ${PORT} `));
  }
};

