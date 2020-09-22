'use strict';
const express = require('express');
const router = require('./auth/router')
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(router)
app.use(cors());
app.use(morgan('dev'));
module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(` server started at port ${PORT} `));
    }
}

