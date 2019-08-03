const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      maxlength: [20, 'Max Length 20 Characters']
    }
});

const User = mongoose.model('User', schema);
module.exports = User;
