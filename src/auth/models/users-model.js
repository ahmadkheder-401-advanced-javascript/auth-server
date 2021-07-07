'use strict';

const schema = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
  constructor() {
    this.schema = schema;
  }

 
  get(username) {
    let name = username ? { username } : {};
    return this.schema.find(name);
  }

  async create(record) {
    let user = await this.get(record.username);
    if (user.length === 0) {
      // Hash the password and save it to the user
      record.password = await bcrypt.hash(record.password, 5);
      // Create a new user
      let newRecord = new this.schema(record);
      return newRecord.save();
    }
    return Promise.reject('user exist!');
  }
  async authenticateBasic(record) {
    let result = await this.get(record.username);
    let user = result[0];
    if (user) {
      let valid = await bcrypt.compare(record.password, user.password);
      let returnValue = valid ? user : Promise.reject();
      return returnValue;
    }
    return Promise.reject();
  }
  async authenticateToken(token) {
    try {
      let tokenObject = jwt.verify(token, process.env.SECRET);
      let result = await this.get(tokenObject.username);
      let user = result[0];
      if (user) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  }
  generateToken(record) {
    let token = jwt.sign({ username: record.username }, process.env.SECRET);
    return token;
  }
}

module.exports = new Users();