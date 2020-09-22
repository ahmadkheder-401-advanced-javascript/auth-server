'use strict';
// const User = require('./models/users-model').userModel;
const users = require('../models/users-schema');
const base64 = require('base-64');

module.exports = (req, res, next) => {
    //check if there is authorization obj {usernam,password} in the req.header
    if (!req.headers.authorization) {
        next("missing headers!!!");
        return;
    }
    console.log("after headers check!");
    //split the auth to have [ username,password ]
    const auth = req.headers.authorization.split(' ');
    if (auth[0] == 'Basic') {
        const [username, password] = base64.decode(auth[1]).split(':');
        users.authenticateBasic(username, password)
        .then(validUser => {
            console.log('validUser',validUser);
            if(!validUser){
                return next('Wrong username or password');
            }
            let token = users.generateToken(validUser.username);
            console.log('>>>>>>>>>>token', token);
            if (token) {
                req.basicAuth = {
                    token: token,
                    user: validUser
                }
            }
            next();

        }).catch(err => next(err));
    } else {
        next('Invalid Login!! ');
    }
    // next();
}