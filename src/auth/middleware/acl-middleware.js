'use strict';


const users = require('../models/users-model');

module.exports = (action) => {
  return (req, res, next) => {
    let permission = users.hasPermission(req.user.role, action);
    try {
      if (permission) {
        next();
      } else {
        next('Access Denied!,Wrong Action ');
      }
    } catch (e) {
      next('Access Denied!!');
    }
  };
};
