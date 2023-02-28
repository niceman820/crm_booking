
const User = require('../models/User');
const BookForm = require('../models/BookForm');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const normalize = require('normalize-url');
const { validationResult } = require('express-validator');
const Notification = require('../models/Notification');

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}

const signIn = async (req, res) => {
	console.log('req sigin data ', req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'User does not exist!' }] });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			config.jwtSecret,
			{ expiresIn: '2 days' },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}

const signUp = async (req, res) => {
	console.log('req data here ---> ', req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { firstName, lastName, email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'User already exists' }] });
		}

		const avatar = normalize(
			gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			}),
			{ forceHttps: true }
		);

		const dateString = (Date.now() * Math.random()).toString();
    const bookFormId = dateString.substring(0,6);

		user = new User({
			firstName,
			lastName,
			email,
			avatar,
			password,
			bookFormId
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();
		let bookForm = new BookForm({
			bookFormId: bookFormId,
			approveMessage: `Dear {client_fname},\n\nThank you for your booking. Your appointment has been approved and confirmed!\n\nI look forward to seeing you on {booking_date} at {booking_time}.\n\nThank you and see you soon!\n\n${firstName}`,
			// Dear ${client_fname}.<br/>Thank you for your booking. Your appointment has been approved and confirmed!<br/>I look forward to seeing you on ${booking_date} at ${booking_time}.<br/>Thank you and see you soon!<br/>${user.firstName}
			declineMessage: `Thank you for your booking request. Unfortunately, I will not be able to accomodate you.`,
			welcomeMessage: `I appreciate you connecting with me. To ensure your booking is accepted, please be sure to fill in this booking form in its entirety. - ${firstName}`,
			thankyouMessage: `Thank you for your booking. I have received your request and will get back to you shortly!`,
		});

		await bookForm.save();

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			config.jwtSecret,
			{ expiresIn: '5 days' },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}

const getToken = async (req, res) => {
	try {
		console.log("user ", req.user);
		const user = await User.findById(req.user.id).select('-password');
		const notification = await Notification.find({ userId: user._id, isRead: false }).populate('bookingId userId');
		res.json({user, notification});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}

const sendResetLink = async (req, res) => {
	console.log('send reset link ', req.body);
	let { email } = req.body;
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('-role -password');
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}

const readNotification = async (req, res) => {
	try {
		const user = req.user;
		await Notification.updateMany(
			{ userId: user.id },
			{ $set: {
				isRead: true
			}}
		);

		res.send({ msg: 'success'});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}

module.exports = {
	getUser,
	signIn,
	signUp,
	getToken,
	sendResetLink,
	getAllUsers,
	readNotification
};