'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const user = require('../models/users/users-collection');

function decoding(req) {
  const auth = req.headers.authorization.split(' ');
  if (auth[0] == 'Basic') {
    // 1st decode auth[1] -> then split it on :
    let [username, password] = base64.decode(auth[1]).split(':');
    return { username, password }
  } else {
    throw new Error('Invalid Login!! ');
  }
}
module.exports = async (req, res, next) => {

  try {
    let record = decoding(req);
    req.userSession = await user.validUser(record);
    next();
  } catch (err) {
    res.status(500).json(err).end();
    // next(err);
  }
};
