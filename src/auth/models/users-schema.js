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
userSchema.methods.comparePassword = async function (password) {
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
        console.log('TOKEN>>>>>>>>',token);
        let tokenObject = jwt.verify(token, SECRET);
        console.log("tokenObject -----> ", tokenObject);
        let result = await this.findOne({ username: tokenObject.username });

        if (result) {
        console.log('TOKEN>>>>>>>>',token);
        next();
        return Promise.resolve({ tokenObject: tokenObject });
        } else {
            next('Invalid user!');
            return Promise.reject();
        }
    } catch (e){ next(`ERROR: ${e.message}`) }

};
module.exports = mongoose.model("userSchema", userSchema)
// mongoose.model("userSchema",userSchema);





/*
userFunctions.hashPass = async function (record) {
    return {
        userName: record.username,
        userPass: await bcrypt.hash(record.password, 5)
    }
}
userFunctions.authenticateBasic = async function (username, password) {
    let userLogin = new User();
    let result = await userLogin.get({ userName: username });
    console.log('>>>>>>>result', result);
    if (result.length > 0) {
        let userPassword = password
        let hasedPass = result[0].userPass
        // console.log('>>>>>>>userPassword',record);
        let valid = await bcrypt.compare(userPassword, hasedPass)
        let returnValue = valid ? result : Promise.reject();
        return returnValue
    } else {
        return Promise.reject();
    }
}

userFunctions.generateToken = function (username) {
    return jwt.sign({ username: username }, SECRET);
} */
/*
class User {
    constructor() {
        this.schema = mongoose.model('userScema', userScema);
    }
    async create(record) {
        console.log('>>>>>>>>>>>>>>>dataRecord', record);
        let dataRecord = await userFunctions.hashPass(record)
        let newUser = new this.schema(dataRecord);
        return newUser.save();
    }
    get(query) {
        // let obj = val ? { prop : val } : {};
        // console.log('>>>>>>>>>>OBJ',obj);
        return this.schema.find(query);
    }
    getByuserName(userName) {
        let obj = { userName };
        return this.schema.find(obj);
    }
    update(_id, record) {
        return this.schema.findByIdAndUpdate(_id, record);
    }
    patch(_id, record) {
        return this.schema.findByIdAndUpdate(_id, record);
    }
    delete(_id) {
        return this.schema.findByIdAndDelete(_id)
    }


} */
