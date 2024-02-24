const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content', // Reference to the Content model
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to other User model (self-reference)
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
