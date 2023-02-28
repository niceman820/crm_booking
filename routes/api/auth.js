const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const {
  getToken,
  signIn,
  readNotification
} = require('../../controllers/userController');


// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, getToken);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  signIn
);


router.get(
  '/read-notification',
  auth,
  readNotification
)

module.exports = router;
