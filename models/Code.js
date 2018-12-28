var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
  username: String,
  title: String,
  code: String,
  input: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Code', CodeSchema);
