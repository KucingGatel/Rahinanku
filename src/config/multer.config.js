const path = require('path');
const multer = require('multer');

const announcementStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'public', 'announcement'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

const announcementFileFilter = (req, file, cb) => {
	if (file.mimetype !== 'application/pdf') {
		console.log(file.mimetype);
		return cb(null, false);
	}

	cb(null, true);
};

const uploadAnnouncement = multer({ storage: announcementStorage, fileFilter: announcementFileFilter });

module.exports = { uploadAnnouncement };