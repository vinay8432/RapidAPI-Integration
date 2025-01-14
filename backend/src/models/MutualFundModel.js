const mongoose = require("mongoose");

// Define the schema
const mutualFundSchema = new mongoose.Schema({
  Scheme_Code: { type: Number, required: true, unique: true },
  ISIN_Div_Payout_ISIN_Growth: { type: String, required: true },
  ISIN_Div_Reinvestment: { type: String, required: false },
  Scheme_Name: { type: String, required: true },
  Net_Asset_Value: { type: Number, required: true },
  Date: { type: Date, required: true },
  Scheme_Type: { type: String, required: true },
  Scheme_Category: { type: String, required: true },
  Mutual_Fund_Family: { type: String, required: true },
});

// Create the model
const MutualFund = mongoose.model("MutualFund", mutualFundSchema);

module.exports = MutualFund;
