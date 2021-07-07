'use strict';

const users = require('../models/users-schema');
// what is this middleware used for?
// check on the token, does it exist?
// if yes then parse it and get user and validate him

// check if I have in my request header, an Authorization key
// header key Authorization
// value of it {Bearer token}
module.exports = (req, res, next)=> {
  if (!req.headers.authorization) {
    return next('Invalid Login, No Headers !!');
  }
  let bearer = req.headers.authorization.split(' ');

  if (bearer[0] === 'Bearer') {
    const token = bearer[1];
    // authenticate this token and get the valid user
    users.authenticateToken(token).then(validUser=> {
      req.user = validUser;
      next();
    }).catch(() => next('Invalid Token!'));

  } else {
    return next('Invalid Bearer!!');
  }





};
