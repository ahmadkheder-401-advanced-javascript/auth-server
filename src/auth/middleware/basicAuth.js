'use strict';
// const User = require('./models/users-model').userModel;
const users = require('../models/users-schema');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  //check if there is authorization obj {usernam,password} in the req.header
  if (!req.headers.authorization) {
    next('Invalid Login! ');
    return;
  }
  //split the auth to have [ username,password ]
  const auth = req.headers.authorization.split(' ');
  let [username, password] = base64.decode(auth[1]).split(':');
  let record = {
    username: username,
    password: password
  };
  users.authenticateBasic(record)
    .then((validUser) => {
      req.token = users.generateToken(validUser);
      req.user = validUser;
      next();
    })
    .catch(() => next('Invalid Login!! '));
};


