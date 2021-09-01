const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
}, {timestamp: true});

module.exports = mongoose.model('users', UserSchema);