const Book = require('../models/Book');
const { validationResult } = require('express-validator');

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
    } = initialData;
    const dateString = (Date.now() * Math.random()).toString();
    const bookFormId = dateString.substring(0,6);
    
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

    await book.save();

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  createBooking,
}