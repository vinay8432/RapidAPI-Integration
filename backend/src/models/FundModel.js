const mongoose = require('mongoose')

const fundSchema = new mongoose.Schema({
    fund_name: String,
    fund_family: String,
    scheme_type: String,
    nav: Number,
    updated_at: Date,
  });

module.exports = mongoose.model('Fund',fundSchema)