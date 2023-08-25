const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userType: String,
  firstName:String,
  city:String,
  address:String,
  state:String,
 
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
