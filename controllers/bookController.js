const Book = require('../models/Book');
const User = require('../models/User');
const {
  sendMail,
  sendCreateMail
} = require('./mailerController');
const moment = require('moment');

const createBooking = async (req, res) => {
  const initialData = JSON.parse(req.body.initialData);
  try {
    console.log('initialData ', initialData.client.preferredCommuncation.email)
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

    const preferredCommuncation = {
      email: initialData.client.preferredCommuncation.email ? true : false,
      text: initialData.client.preferredCommuncation.text ? true : false,
      phone: initialData.client.preferredCommuncation.phone ? true : false,
    }

    let book = new Book({
      client,
      bookingType,
      date,
      duration,
      message,
      screenMethod,
      ref1,
      ref2,
      bookFormId,
      idCard: req.file.path,
      preferredCommuncation: preferredCommuncation
    });

    const newbook = await book.save();
    const user = await User.findOne({ bookFormId: newbook.bookFormId });

    // sendMail(
    //   user.email,
    //   user.fullName,
    //   newbook.fullName,
    //   newbook.duration,
    //   moment(newbook.date).format('DD/MM/YYYY'),
    //   moment(newbook.date).format('LT')
    // );

    sendCreateMail(user.email);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getBookingData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const bookFormId = user.bookFormId;
    const bookingData = await Book.find({ bookFormId: bookFormId, isRemoved: false });

    res.json(bookingData);


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getBookingDetailData = async (req, res) => {
  try {
    const bookingDetailData = await Book.findById(req.params.bookingId);
    res.json(bookingDetailData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const approveBooking = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(
      req.params.bookingId,
      { status: 2 }
    );

    res.send({ message: 'You approved for this booking.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const declineBooking = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(
      req.params.bookingId,
      { status: 1 }
    );
    res.send({ message: 'You declined for this booking.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const deleteBookings = async (req, res) => {
  try {
    console.log('delete ', req.body);
    const { bookingIds } = req.body;
    bookingIds.map(async (bookingId) => {
      await Book.findByIdAndUpdate(
        bookingId,
        { isRemoved: true }
      );
    });
    res.send({ message: 'You removed for this booking.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  createBooking,
  getBookingData,
  getBookingDetailData,
  approveBooking,
  declineBooking,
  deleteBookings,
}