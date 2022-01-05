const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firsName: String,
  lastName: String,
  email: String,
  phone: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);