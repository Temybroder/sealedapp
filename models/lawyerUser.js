const mongoose = require('mongoose');

const lawyerUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const lawyerUser = mongoose.model('lawyerUser', lawyerUserSchema);

module.exports = lawyerUser;
