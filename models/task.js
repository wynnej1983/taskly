/*global module: true*/

var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  user_id: { type: Number, required: true }
, name: { type: String, required: true }
, done: { type: Boolean, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
