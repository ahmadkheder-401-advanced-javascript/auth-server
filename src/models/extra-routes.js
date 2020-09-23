'use strict';
const express = require('express');
const router = express.Router();
const users = require('../auth/models/users-schema');
const bearerMiddleware = require('../auth/middleware/bearer-auth');

router.post('/secret',bearerMiddleware, (req,res) => {});
// router.post('/signin', basicAuth, signInHandler);
// router.get('/users', basicAuth, getAllUsers);
// router.get('/listusers', bearerAuth, getAllUsers);
module.exports = router