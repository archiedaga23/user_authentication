const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  avatar: {
    type: String,
    require: false
  },
  account: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    
  },
  email: {
    type: String,
    unique: false,
  },
  position: {
    type: String,
    require: false
  },
  contact_number: {
    type: String,
    require: false
  },
},{ timestamps: true });

module.exports = Profile = mongoose.model('profile', ProfileSchema);