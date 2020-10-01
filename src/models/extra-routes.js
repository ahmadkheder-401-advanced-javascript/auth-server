'use strict';
const express = require('express');
const router = express.Router();
// const users = require('../auth/models/users-schema');
const bearerMiddleware = require('../auth/middleware/bearer-auth');
const permissions = require('./auth/middleware/authorize')

router.use(express.json());
router.get('/secret',bearerMiddleware, (req,res) => {
  res.status(200).send(req.user);
});

<<<<<<< HEAD
router.get('/read', bearerMiddleware, permissions('READ'), (req, res) => {
    res.status(200).send('Reached the response')
})
router.post('/add', bearerMiddleware, permissions('CREATE'), (req, res) => {
    res.status(200).send('Reached the response')
})
router.put('/change', bearerMiddleware, permissions('UPDATE'), (req, res) => {
    res.status(200).send('Reached the response')
})
router.delete('/remove', bearerMiddleware, permissions('DELETE'), (req, res) => {
    res.status(200).send('Reached the response')
})
=======
/* router.get('/secret', bearerMiddleware, (req,res) => {
    res.status(200).send(req.user)
    } ); */
>>>>>>> class-13
// router.post('/signin', basicAuth, signInHandler);
// router.get('/users', basicAuth, getAllUsers);
// router.get('/listusers', bearerAuth, getAllUsers);
module.exports = router;
