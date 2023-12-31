const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('File', fileSchema)