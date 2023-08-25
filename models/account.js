const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  agent: String,
  account_type:String,
  company_name:String,
  phone:{type: Number, required: true},
 
});

const AccountModel = mongoose.model('account', accountSchema);

module.exports = AccountModel;
