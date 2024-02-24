const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  user: {
    type: String, 
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },

});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
