const Book = require('../models/Book');
const User = require('../models/User');
const BookForm = require('../models/BookForm');
const Notification = require('../models/Notification');
const {
  sendCreateMail,
  sendApproveMail,
  sendDeclineMail
} = require('./mailerController');
const moment = require('moment');
const SocketServer = require('../socket')

const createBooking = async (req, res) => {
  console.log('create booking ', req.body)
  const initialData = JSON.parse(req.body.initialData);
  const client_device_info = JSON.parse(req.body.client_device_info);
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
      bookFormId,
    } = initialData;
    console.log('device ', client_device_info);
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
      preferredCommuncation: preferredCommuncation,
      client_device_info
    });

    const newbook = await book.save();
    const user = await User.findOne({ bookFormId: newbook.bookFormId });

    sendCreateMail(
      user.email,
      user.fullName,
      newbook.fullName,
      newbook.duration,
      moment(newbook.date).format('DD/MM/YYYY'),
      moment(newbook.date).format('LT')
    );

    let notification = new Notification({
      bookingId: newbook._id,
      userId: user._id
    });

    await notification.save();

    SocketServer.getInstance().sendMailNotification(user._id);

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
    const bookingId = req.params.bookingId;
    const book = await Book.findByIdAndUpdate(
      bookingId,
      { status: 2 }
    );

    const bookForm = await BookForm.findOne({ bookFormId: book.bookFormId });
    let {
      approveMailStatus,
      approveTitle,
      approveMessage
    } = bookForm;
    
    if (!approveMailStatus) return res.send({ message: 'You approved for this booking.' });

    if (approveTitle.includes('{client_fname}')) approveTitle = approveTitle.replace(/{client_fname}/g, book.client.firstName);
    if (approveTitle.includes('{client_lname}')) approveTitle = approveTitle.replace(/{client_lname}/g, book.client.lastName);
    if (approveTitle.includes('{client_email}')) approveTitle = approveTitle.replace(/{client_email}/g, book.client.email);
    if (approveTitle.includes('{client_phone}')) approveTitle = approveTitle.replace(/{client_phone}/g, book.client.phone);
    if (approveTitle.includes('{booking_date}')) approveTitle = approveTitle.replace(/{booking_date}/g, moment(book.date).format('DD/MM/YYYY'));
    if (approveTitle.includes('{booking_time}')) approveTitle = approveTitle.replace(/{booking_time}/g, moment(book.date).format('LT'));
    if (approveTitle.includes('{booking_duration}')) approveTitle = approveTitle.replace(/{booking_time}/g, book.duration);

    if (approveMessage.includes('{client_fname}')) approveMessage = approveMessage.replace(/{client_fname}/g, book.client.firstName);
    if (approveMessage.includes('{client_lname}')) approveMessage = approveMessage.replace(/{client_lname}/g, book.client.lastName);
    if (approveMessage.includes('{client_email}')) approveMessage = approveMessage.replace(/{client_email}/g, book.client.email);
    if (approveMessage.includes('{client_phone}')) approveMessage = approveMessage.replace(/{client_phone}/g, book.client.phone);
    if (approveMessage.includes('{booking_date}')) approveMessage = approveMessage.replace(/{booking_date}/g, moment(book.date).format('DD/MM/YYYY'));
    if (approveMessage.includes('{booking_time}')) approveMessage = approveMessage.replace(/{booking_time}/g, moment(book.date).format('LT'));
    if (approveMessage.includes('{booking_duration}')) approveMessage = approveMessage.replace(/{booking_duration}/g, `${book.duration} hours`);

    approveMessage = approveMessage.replace(/\n/g, "<br />");

    console.log('--- approve message ---\n ', approveTitle);
    sendApproveMail(book.client.email, approveTitle, approveMessage);
    res.send({ message: 'You approved for this booking.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const declineBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const user = await User.findById(req.user.id);
    const book = await Book.findByIdAndUpdate(
      bookingId,
      { status: 1 }
    );
    const bookForm = await BookForm.findOne({ bookFormId: book.bookFormId });
    let {
      declineMailStatus,
      declineTitle,
      declineMessage
    } = bookForm;
    
    // console.log('updated book ', declineMailStatus, declineTitle, declineMessage);
    if (!declineMailStatus) return res.send({ message: 'You declined for this booking.' });

    if (declineTitle.includes('{client_fname}')) declineTitle = declineTitle.replace(/{client_fname}/g, book.client.firstName);
    if (declineTitle.includes('{client_lname}')) declineTitle = declineTitle.replace(/{client_lname}/g, book.client.lastName);
    if (declineTitle.includes('{client_email}')) declineTitle = declineTitle.replace(/{client_email}/g, book.client.email);
    if (declineTitle.includes('{client_phone}')) declineTitle = declineTitle.replace(/{client_phone}/g, book.client.phone);
    if (declineTitle.includes('{booking_date}')) declineTitle = declineTitle.replace(/{booking_date}/g, moment(book.date).format('DD/MM/YYYY'));
    if (declineTitle.includes('{booking_time}')) declineTitle = declineTitle.replace(/{booking_time}/g, moment(book.date).format('LT'));
    if (declineTitle.includes('{booking_duration}')) declineTitle = declineTitle.replace(/{booking_time}/g, book.duration);

    if (declineMessage.includes('{client_fname}')) declineMessage = declineMessage.replace(/{client_fname}/g, book.client.firstName);
    if (declineMessage.includes('{client_lname}')) declineMessage = declineMessage.replace(/{client_lname}/g, book.client.lastName);
    if (declineMessage.includes('{client_email}')) declineMessage = declineMessage.replace(/{client_email}/g, book.client.email);
    if (declineMessage.includes('{client_phone}')) declineMessage = declineMessage.replace(/{client_phone}/g, book.client.phone);
    if (declineMessage.includes('{booking_date}')) declineMessage = declineMessage.replace(/{booking_date}/g, moment(book.date).format('DD/MM/YYYY'));
    if (declineMessage.includes('{booking_time}')) declineMessage = declineMessage.replace(/{booking_time}/g, moment(book.date).format('LT'));
    if (declineMessage.includes('{booking_duration}')) declineMessage = declineMessage.replace(/{booking_duration}/g, `${book.duration} hours`);

    declineMessage = declineMessage.replace(/\n/g, "<br />");

    sendDeclineMail(book.client.email, declineTitle, declineMessage);
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

const getNotificaton = async (req, res) => {
  try {
    const {bookFormId} = req.params;
    // console.log('bookformId ', systemInfo, browserInfo);
    const bookForm = await BookForm.findOne({ bookFormId: bookFormId });
    res.send(bookForm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const customBookingForm = async (req, res) => {
  try {
    console.log('custom booking form data', req.body);
    let {
      bookFormId,
      welcomeTitle,
      welcomeMessage,
      thankyouTitle,
      thankyouMessage
    } = req.body;

    await BookForm.findOneAndUpdate(
      { bookFormId: bookFormId },
      { $set: {
        'welcomeTitle': welcomeTitle,
        'welcomeMessage': welcomeMessage,
        'thankyouTitle': thankyouTitle,
        'thankyouMessage': thankyouMessage,
        'companyLogo': req.file ? req.file.path : 'uploads/user-logo.png',
      }}
    );
    res.send({message: 'Updated suceesfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const customEmailNotification = async (req, res) => {
  try {
    console.log('custom booking email notification data', req.body);
    let {
      bookFormId,
      approveTitle,
      approveMessage,
      approveMailStatus,
      declineTitle,
      declineMessage,
      declineMailStatus
    } = req.body;
    
    const bookForm = await BookForm.findOneAndUpdate(
      { bookFormId: bookFormId },
      {
        $set: {
          'approveTitle': approveTitle,
          'approveMessage': approveMessage,
          'approveMailStatus': approveMailStatus,
          'declineTitle': declineTitle,
          'declineMessage': declineMessage,
          'declineMailStatus': declineMailStatus
        }
      }
    );

    res.send({message: 'Updated suceesfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const searchBooking = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const bookFormId = user.bookFormId;
    let { keyword } = req.body;
    const bookingData = await Book.find({
      bookFormId: bookFormId, 
      isRemoved: false,
      $or: [
        {'client.firstName': { $regex: keyword, $options: 'i' }},
        {'client.lastName': { $regex: keyword, $options: 'i' }},
        {'client.occupation': { $regex: keyword, $options: 'i' }},
        {'client.searchEngine': { $regex: keyword, $options: 'i' }},
        {'client.email': { $regex: keyword, $options: 'i' }},
      ]
    });
    res.json(bookingData);
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
  getNotificaton,
  customBookingForm,
  customEmailNotification,
  searchBooking,
}