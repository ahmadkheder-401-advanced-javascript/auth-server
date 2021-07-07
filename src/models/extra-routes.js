'use strict';
const express = require('express');
const router = express.Router();
// const users = require('../auth/models/users-schema');
const bearerMiddleware = require('../auth/middleware/bearer-auth');

router.use(express.json());
router.get('/secret',bearerMiddleware, (req,res) => {
  res.status(200).send(req.user);
});

/* router.get('/secret', bearerMiddleware, (req,res) => {
    res.status(200).send(req.user)
    } ); */
// router.post('/signin', basicAuth, signInHandler);
// router.get('/users', basicAuth, getAllUsers);
// router.get('/listusers', bearerAuth, getAllUsers);
module.exports = router;
