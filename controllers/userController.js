
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const normalize = require('normalize-url');
const { validationResult } = require('express-validator');

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

		user = new User({
			firstName,
			lastName,
			email,
			avatar,
			password
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

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
		res.json(user);
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

module.exports = {
	getUser,
	signIn,
	signUp,
	getToken,
	sendResetLink,
	getAllUsers,
};