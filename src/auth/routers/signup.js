'use strict';
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const user = require('../models/users/users-collection');

router.post('/signup', handleSignup);

async function handleSignup(req, res) {

  req.body.password= await bcrypt.hash(req.body.password,5);
  user.create(req.body).then(result => {
    res.json(result);
  }).catch(next=>{
    res.send('You already have an account')
  });
}

module.exports = router;
