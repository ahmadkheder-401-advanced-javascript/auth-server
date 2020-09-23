'use strict';
const express = require('express');
const router = require('./auth/router');
const cors = require('cors');
const morgan = require('morgan');
const extraRouts = require('./models/extra-routes');

const app = express();
app.use(express.json());
app.use(router)
app.use(cors());
app.use(morgan('dev'));
module.exports = {
    server: app,
    start: port => {
        let PORT = 4000 || process.env.PORT || port;
        app.listen(PORT, () => console.log(` server started at port ${PORT} `));
    }
}

