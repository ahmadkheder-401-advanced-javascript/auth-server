'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = 'mytokensecret';

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
});

// compare the input password with the password from the record
userSchema.methods.comparePassword = async (password) => {
    const valid = await bcrypt.compare(password, this.password);
    return valid ? this : null;
}
userSchema.statics.generateToken = function (username) {
    return jwt.sign({ username: username }, SECRET);
}
userSchema.statics.authenticateBasic = async function (username, password) {
    //find the user in the userSchema
    // this will return the user object of the Schema
    let result = await this.findOne({ username: username });

    console.log('>>>>>>>result', result);
    if (result) {
        /*   since the result is an object of the schema, 
         so it has access to the (methods) of the schema */
        let compareResult = await result.comparePassword(password);
        return compareResult;
    } else {
        return null;
    }
}
//hooks
/* add a hashing methods(hooks)
 that will be always triggered  whenever a new user saved/created in the schema */
// telling the schema right before the save, hash the password
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

userSchema.statics.authenticateToken = async function (token) {

    try {
        let tokenObject = jwt.verify(token, SECRET);
        console.log("tokenObject -----> ", tokenObject);
        let check_user = await this.findOne({ username: tokenObject.username });
        let user_obj = await this.find(tokenObject.username);
        if (check_user) {
            // next();
            return Promise.resolve(
                {
                    tokenObject: tokenObject,
                    user: user_obj
                });
        } else {
            // next('Invalid user!');
            return Promise.reject();
        }
    } catch (e) { next(`ERROR:e.message: ${e.message}...---..e.message`) }

};
module.exports = mongoose.model("userSchema", userSchema)


/* 


'use strict';

const mongoose = require('mongoose');


const users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  users.methods.comparePassword =  function () {
  
  };
  
  module.exports = mongoose.model('users', users);

*/