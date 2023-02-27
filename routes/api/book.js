const express = require('express');
const router = express.Router();
const path = require('path');
const { 
  createBooking,
  getBookingData, 
  getBookingDetailData,
  approveBooking,
  declineBooking,
  deleteBookings,
  getNotificaton,
  customBookingForm,
  customEmailNotification
} = require('../../controllers/bookController');
const multer  = require('multer');
const auth = require('../../middleware/auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes= ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage, fileFilter });

// @route    POST api/booking
// @desc     Create New Booking from Client with User of Clientl website
// @access   Public
router.post(
  '/',
  upload.single('idCard'),
  createBooking
);

// @route    GET api/booking
// @desc     Get booking data by user
// @access   Private
router.get('/', auth, getBookingData);

// @route    DELETE api/booking
// @desc     delete bookings by user
// @access   Private
router.post('/delete', auth, deleteBookings);

// @route    GET api/booking/detail/:bookingId
// @desc     Get booking detail data by user
// @access   Private
router.get('/detail/:bookingId', auth, getBookingDetailData);

// @route    PUT api/booking/detail/:bookingId
// @desc     approve booking by user
// @access   Private
router.put('/detail/:bookingId', auth, approveBooking);

// @route    PATCH api/booking/detail/:bookingId
// @desc     decline booking by user
// @access   Private
router.patch('/detail/:bookingId', auth, declineBooking);


// @route    GET api/booking/custom-notification
// @desc     get bookinf form email notification
// @access   Public
router.get('/custom-notification/:bookFormId', getNotificaton);

// @route    POST api/booking/custom-notification
// @desc     Update create bookinf form
// @access   Private
router.post(
  '/custom-booking', 
  auth, 
  upload.single('userLogo'),
  customBookingForm
  );

// @route    POST api/booking/custom-email-notification
// @desc     Update booking form email notification
// @access   Private
router.post('/custom-email-notification', auth, customEmailNotification);

module.exports = router;
