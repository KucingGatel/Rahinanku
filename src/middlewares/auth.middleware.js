require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
	try {
		const token = req.session.token;

		if (!token) {
			return res.status(401).json({ success: false, msg: 'No token provided' });
		}

		const decoded = jwt.verify(token, process.env.jwtSecret || 'sidkerenbanget');

		const user = {
			id: decoded.userID,
			role: decoded.role,
		};

		req.user = user;

		return next();
	} catch (err) {
		next(err);
	}
};

const verifyAdmin = async (req, res, next) => {
	try {
		const token = req.session.token;

		if (!token) {
			return res.status(401).json({ success: false, msg: 'No token provided' });
		}

		const decoded = jwt.verify(token, process.env.jwtSecret || 'sidkerenbanget');

		if (decoded.role !== 'admin') {
			return res.status(401).json({ success: false, msg: 'Only admin is authorized' });
		}

		const user = {
			id: decoded.userID,
			role: decoded.role,
		};

		req.user = user;

		return next();
	} catch (err) {
		next(err);
	}
};

module.exports = { verifyUser, verifyAdmin };