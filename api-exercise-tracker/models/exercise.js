const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      default: null
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

const Exercise = mongoose.model('Exercise', schema);
module.exports = Exercise;

