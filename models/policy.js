const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policy_number: String,
  policy_type: String,
  policy_mode: { type: Number, required: true },
  accountNumber: { type: Number, required: true },
  ifscCode: String,
  policy_start_date: { type: Date, default: Date.now },
  policy_end_date: { type: Date, default: Date.now },
});

const PolicyModel = mongoose.model("policy", policySchema);

module.exports = PolicyModel;
