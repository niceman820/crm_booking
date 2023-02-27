const Book = require('../models/Book');
const User = require('../models/User');
const BookForm = require('../models/BookForm');
const {
  sendCreateMail,
  sendApproveMail,
  sendDeclineMail
} = require('./mailerController');
const moment = require('moment');

const createBooking = async (req, res) => {
  console.log('create booking ', req.body)
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

    sendCreateMail(
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
    const user = await User.findById(req.user.id);
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
    
    // console.log('updated book ', approveMailStatus, approveTitle, approveMessage);
    if (!approveMailStatus) return res.send({ message: 'You approved for this booking.' });

    if (approveTitle.includes('{client_fname}')) approveTitle = approveTitle.replace("{client_fname}", book.client.firstName);
    if (approveTitle.includes('{client_lname}')) approveTitle = approveTitle.replace("{client_lname}", book.client.lastName);
    if (approveTitle.includes('{client_email}')) approveTitle = approveTitle.replace("{client_email}", book.client.email);
    if (approveTitle.includes('{client_phone}')) approveTitle = approveTitle.replace("{client_phone}", book.client.phone);
    if (approveTitle.includes('{booking_date}')) approveTitle = approveTitle.replace("{booking_date}", moment(book.date).format('DD/MM/YYYY'));
    if (approveTitle.includes('{booking_time}')) approveTitle = approveTitle.replace("{booking_time}", moment(book.date).format('LT'));
    if (approveTitle.includes('{booking_duration}')) approveTitle = approveTitle.replace("{booking_time}", book.duration);

    if (approveMessage.includes('{client_fname}')) approveMessage = approveMessage.replace("{client_fname}", book.client.firstName);
    if (approveMessage.includes('{client_lname}')) approveMessage = approveMessage.replace("{client_lname}", book.client.lastName);
    if (approveMessage.includes('{client_email}')) approveMessage = approveMessage.replace("{client_email}", book.client.email);
    if (approveMessage.includes('{client_phone}')) approveMessage = approveMessage.replace("{client_phone}", book.client.phone);
    if (approveMessage.includes('{booking_date}')) approveMessage = approveMessage.replace("{booking_date}", moment(book.date).format('DD/MM/YYYY'));
    if (approveMessage.includes('{booking_time}')) approveMessage = approveMessage.replace("{booking_time}", moment(book.date).format('LT'));
    if (approveMessage.includes('{booking_duration}')) approveMessage = approveMessage.replace("{booking_time}", book.duration);


    console.log('--- approve message ---\n ', approveTitle);


    const client_fname = book.client.firstName;
    const client_lname = book.client.lastName;
    const client_email = book.client.email;
    const client_phone = book.client.phone;
    const booking_date = moment(book.date).format('DD/MM/YYYY');
    const booking_time = moment(book.date).format('LT');
    const booking_duration = book.duration;

    // let mailSubject = 'Your booking request has been approved!';
    // let mailContent = `Dear ${client_fname}.<br/>Thank you for your booking. Your appointment has been approved and confirmed!<br/>I look forward to seeing you on ${booking_date} at ${booking_time}.<br/>Thank you and see you soon!<br/>${user.firstName}`;
    // let mailContent = 'Nice to see you, Michael';
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
    const client_fname = book.client.firstName;
    const client_lname = book.client.lastName;
    const client_email = book.client.email;
    const client_phone = book.client.phone;
    const booking_date = moment(book.date).format('DD/MM/YYYY');
    const booking_time = moment(book.date).format('LT');
    const booking_duration = book.duration;

    let mailSubject = 'Your booking request has been declined!';
    let mailContent = `Thank you for your booking request. Unfortunately, I will not be able to accomodate you.`;

    sendDeclineMail(client_email, mailSubject, mailContent);

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
    console.log('bookformId ', bookFormId);
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
    const {
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
        'thankyouMessage': thankyouMessage
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
    const {
      bookFormId,
      approveTitle,
      approveMessage,
      approveMailStatus,
      declineTitle,
      declineMessage,
      declineMailStatus
    } = req.body;
    await BookForm.findOneAndUpdate(
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
}