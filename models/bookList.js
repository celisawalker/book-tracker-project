const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String
  },

  author: {
    type: String
  },

  genre: {
    type: String,
    required: true,
    enum: [
      "fiction",
      "non-fiction",
      "biography",
      "romance",
      "fantasy",
      "science-fiction",
      "memoir",
      "mystery",
      "coming-of-age",
      "young-adult",
      "new-adult",
      "self-help",
      "poetry",
      "history"
    ]
  },

  status: {
    type: String
  },

  rating: {
    type: String,
  },

  review: {
    type: String,
  },

  assignee: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Reference to the User model
  }]

});

const List = mongoose.model('List', listSchema);

module.exports = List;