const { validationResult, matchedData } = require('express-validator');

const validate = (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		return next();
	} else {
		return res.status(422).json({ success: false, errors: result.array() });
	}
};

module.exports = { validate };
