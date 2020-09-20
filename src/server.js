'use strict';
const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const signinRouter = require('./auth/routers/signin');
const signupRouter = require('./auth/routers/signup');
const usersRouter = require('./auth/routers/users');

const user = require('./auth/models/users/users-collection');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(signinRouter);
app.use(signupRouter);
app.use(usersRouter);



module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        console.log(PORT);
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    }
}
