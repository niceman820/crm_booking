const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookFormId: {
    type: String
  },
  client: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    occupation: {
      type: String
    },
    preferredCommuncation: {
      type: String
    },
    searchEngine: {
      type: String
    }
  },
  bookingType: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number
  },
  message: {
    type: String
  },
  screenMethod: {
    type: String
  },
  ref1: {
    type: String
  },
  ref2: {
    type: String
  },
  idCard: {
    type: String
  }
});

module.exports = mongoose.model('books', BookSchema);