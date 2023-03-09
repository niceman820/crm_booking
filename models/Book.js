const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookFormId: {
    type: String,
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
    searchEngine: {
      type: String
    }
  },
  preferredCommuncation: {
    email: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Boolean,
      default: false
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
  },
  status: {
    type: Number,
    default: 0   // 0 - unconfirmed, 1 - declined, 2 - approved
  },
  isRemoved: {
    type: Boolean,
    default: false
  },
  client_device_info: {
    systemInfo: {
      type: String
    },
    browserInfo: {
      type: String
    },
    countryInfo: {
      type: String
    },
    ipInfo: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

BookSchema.virtual('fullName').get(function () {
  return this.client.firstName + ' ' + this.client.lastName;
});

BookSchema.index({
  // 'client.firstName': 'text',
  // ref1: 'text'
  duration: 'number'
});

module.exports = mongoose.model('books', BookSchema);