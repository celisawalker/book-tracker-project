const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
      "romance",
      "fantasy",
      "science-fiction",
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
  }
})

const userSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [bookSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
