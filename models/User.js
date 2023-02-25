const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: 'client'
  },
  bookFormId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('user', UserSchema);
