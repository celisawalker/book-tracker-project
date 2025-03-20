const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String
  },

  author: {
    type: String
  },

  assignee: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Reference to the User model
  }]

});

const List = mongoose.model('List', listSchema);

module.exports = List;