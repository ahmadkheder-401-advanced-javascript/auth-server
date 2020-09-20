// 'use strict';
// // for the Users Mongoose schema
// const mongoose = require('mongoose');
// // for the Users Mongoose model
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');


// const base64 = require('base-64');

// // Mongoose CRUD operations Model
// class Model {
//     constructor(schema) {
//       this.schema = schema;
//     }
//     // CRUD 
//     create(record) {
//       let newRecord = new this.schema(record);
//       return newRecord.save();
//     }
//     get(record) {
//       if (typeof record === 'object'){
//         return this.schema.find(record);
//       }  else{
//         return this.schema.find({});
//       }
//     }
  
//     update(_id, record) {
//       return this.schema.findByIdAndUpdate(_id, record);
//     }
  
//     delete(_id) {
//       return this.schema.findByIdAndDelete(_id);
//     }
//   }




//   books Model
//  class User extends Model {

    
//      //for the sigin Authorization
//     validUser(record) {
//       let userNameObj = { username: record.username };
//       return this.get(userNameObj)
//         .then(async (dBResult) => {
//           let valid = await bcrypt.compare(record.password, dBResult[0].password);
//           if (!valid) {
//             return Promise.reject('Wrong Password');
//           }
//           //Create a method in the schema to generate a Token following a valid login
//           let token = jwt.sign({ data: record.username }, 'secret', { expiresIn: '1h' });
//           return {
//             "token": token, "user": {
//               "acl": [],
//               "username": record.username
//             }
//           }
//         }).catch(err => {
//           err = err? err :'Invalid Login';
//           return Promise.reject( {error: err })
//         });
//     }

//    async basicAuth(req,res,next){
//         try {
//             let record = (req)=>{
//                 const auth = req.headers.authorization.split(' ');
//                 if (auth[0] == 'Basic') {
//                   // 1st decode auth[1] -> then split it on :
//                   let [username, password] = base64.decode(auth[1]).split(':');
//                   return { username, password }
//                 } else {
//                   throw new Error('Invalid Login!! ');
//                 }
//             };
//             req.userSession = await this.validUser(record);
//             next();
//           } catch (err) {
//             res.status(500).json(err).end();
//             // next(err);
//           }
//     }
//   };

// // Mongoose Schema
// const user = mongoose.Schema({
//   username: {type: String, required: true,unique: true},
//   email: {type: String, required: true ,unique: true},
//   password: {type: String, required: true},
//   fullname: {type: String, required: true},

// });


// module.exports = mongoose.model('user', user);
