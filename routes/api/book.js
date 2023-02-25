const express = require('express');
const router = express.Router();
const path = require('path');
const { check } = require('express-validator');
const { createBooking } = require('../../controllers/bookController');
const multer  = require('multer');

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


// router.route('/').post(upload.single('idCard'), (req, res) => {
//   console.log('req is here', req.file);
//   return res.json("File uploaded");
// });



module.exports = router;
