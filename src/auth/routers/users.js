'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basic');
const user = require('../models/users/users-collection');
router.use(express.json());
router.get('/users',basicAuth,handleGetAllUsers);

async function handleGetAllUsers(req,res){
    let allUsers= await user.get(); 
    res.json(allUsers);
}

module.exports = router;
