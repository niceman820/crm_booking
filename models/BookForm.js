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
  approveTitle: {
    type: String,
    default: 'Your booking request has been approved!'
  },
  approveMessage: {
    type: String
  },
  declineTitle: {
    type: String,
    default: 'Your booking request has been declined.'
  },
  declineMailStatus: {
    type: Boolean,
    default: true
  },
  declineMessage: {
    type: String
  },
  welcomeTitle: {
    type: String,
    default: 'Welcome'
  },
  welcomeMessage: {
    type: String
  },
  thankyouTitle: {
    type: String,
    default: 'Thank you!'
  },
  thankyouMessage: {
    type: String
  },
  companyLogo: {
    type: String,
    default: 'assets/images/user-logo.png'
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


module.exports = mongoose.model('bookforms', BookFormSchema);