const Book = require('../models/Book');
const User = require('../models/User');
const { sendMail } = require('./mailerController');
const moment = require('moment');

const createBooking = async (req, res) => {
  const initialData = JSON.parse(req.body.initialData);
  try {
    const {
      screenMethod,
      ref1,
      ref2,
    } = req.body;
    const {
      client,
      bookingType,
      date,
      duration,
      message,
      bookFormId
    } = initialData;
    // const dateString = (Date.now() * Math.random()).toString();
    // const bookFormId = dateString.substring(0,6);

    let book = new Book({
      client,
      bookingType,
      date,
      duration,
      message,
      screenMethod,
      ref1,
      ref2,
      bookFormId
    });

    const newbook = await book.save();
    const user = await User.findOne({ bookFormId: newbook.bookFormId });

    console.log('new book ', newbook);
    console.log('user ', user);

    sendMail(
      user.email,
      user.fullName,
      newbook.fullName,
      newbook.duration,
      moment(newbook.date).format('DD/MM/YYYY'),
      moment(newbook.date).format('LT')
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  createBooking,
}