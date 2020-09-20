'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const schema = require('./users-schema');

const MongoModel = require('../mongo-model');

class User extends MongoModel {
  validUser(record) {
    let userNameObj = { username: record.username };

    return this.get(userNameObj)
      .then(async (dBResult) => {
        let valid = await bcrypt.compare(record.password, dBResult[0].password);
        if (!valid) {
          return Promise.reject('Wrong Password');
        }
        let token = jwt.sign({ data: record.username }, 'secret', { expiresIn: '1h' });
        return {
          "token": token, "user": {
            "acl": [],
            "username": record.username
          }
        }
      }).catch(err => {
        err = err? err :'Invalid Login';
        return Promise.reject( {error: err })
      });
  }
}

module.exports = new User(schema);