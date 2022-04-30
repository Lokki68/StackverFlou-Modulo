const {default: mongoose} = require('mongoose')
const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  nickName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  creationDate: {
    type: Date,
    require: true
  },
}, {collection: 'user'});

module.exports = mongoose.model('user', userSchema)