'use strict';
const usersModel = require('../models/users.model');
const express = require('express');
const router = express.Router();

router.post('/signup', handleSignup);
router.post('/signin',basicAuth,handleSignin);

async function handleSignup(req, res) {

    req.body.password= await bcrypt.hash(req.body.password,5);
    usersModel.create(req.body).then(result => {
      res.json(result);
    }).catch(next=>{
      res.send('You already have an account')
    });
  }

  async function handleSignin(req,res){
    res.json(req.userSession);
}
async function basicAuth(req,res,next){
    try {
        let record = (req)=>{
            const auth = req.headers.authorization.split(' ');
            if (auth[0] == 'Basic') {
              // 1st decode auth[1] -> then split it on :
              let [username, password] = base64.decode(auth[1]).split(':');
              return { username, password }
            } else {
              throw new Error('Invalid Login!! ');
            }
        };
        req.userSession = await usersModel.validUser(record);
        next();
      } catch (err) {
        res.status(500).json(err).end();
        // next(err);
      }
}