'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basic');
router.use(express.json());
router.post('/signin',basicAuth,handleSignin);

async function handleSignin(req,res){
    res.json(req.userSession);
}

module.exports = router;
