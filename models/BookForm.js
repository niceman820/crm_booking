const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookFormSchema = new Schema({
  bookFormId: {
    type: String,
    unique: true
  },
  approveMailStatus: {
    type: Boolean,
    default: true
  },
  approveMessage: {
    type: String
  },
  declineMailStatus: {
    type: Boolean,
    default: true
  },
  declineMessage: {
    type: String
  },
  welcomeMessage: {
    type: String
  },
  thankyouMessage: {
    type: String
  },
  companyLogo: {
    type: String
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


module.exports = mongoose.model('bookforms', BookFormSchema);