'use strict';
require('dotenv').config();
const users = require('../models/users-schema');
const superagent = require('superagent');

module.exports = async (req, res, next) => {
    let code = req.query.code;
    let token = await exchangeCodeWithToken(code);
    let user = await exchangeTokenWithUser(token);
    let [savedUser, serverToken] = await saveUser(user);
    req.user = savedUser;
    req.token = serverToken;
    next();

};

const CLIENT_ID = process.env.CLIENT_ID;
const CLINET_SECRET = process.env.CLINET_SECRET;

async function exchangeCodeWithToken(code) {
    const TOKEN_SERVER = 'https://github.com/login/oauth/access_token';
    const response = await superagent.post(TOKEN_SERVER)
        .send({
            CLIENT_ID: CLIENT_ID,
            client_secret: CLINET_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3000/oauth'
        });
    return response.body.access_token;
}

async function exchangeTokenWithUser(token) {
    let userResponse = await superagent.get('https://api.github.com/user')
        .set('Authorization', `token ${token}`)
        .set('User-Agent', 'user-agent/1.0')
    return userResponse.body;
}

async function saveUser(user) {
    let record = {
        username: user.login,
        password: 'XXXX'
    }

    let saveduser = await users.save(record);
    let myserverToken = users.generateToken(saveduser);
    return [saveduser, myserverToken];
}