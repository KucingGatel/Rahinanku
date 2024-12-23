const { body } = require('express-validator');

const LecturerValidator = [
	// body('name').trim().isLength({ min: 5, max: 20 }).withMessage('min 5 characters, max 20 characters'),
	body('name').trim().notEmpty().withMessage('Name Required'),
	// body('profile_url').trim().isLength(30).withMessage(''),
	body('nidn').trim().isLength({ min: 5, max: 20 }).withMessage('min 5 characters, max 20 characters').isNumeric().withMessage('nidn must be numeric'),
	body('nip').trim().isLength({ min: 5, max: 20 }).withMessage('min 5 characters, max 20 characters').isNumeric().withMessage('nip must be numeric'),
	body('phone_number').trim().isLength({ min: 5, max: 20 }).withMessage('min 5 characters, max 20 characters').isNumeric().withMessage('phone number must be numeric'),
	body('address').trim().notEmpty().withMessage('address required'),
	body('email').trim().notEmpty().withMessage('email required').isEmail().withMessage('harus email')
];

const LectureValidator = [
	body('code').trim().isLength(10).withMessage('Must 10 characters'),
	body('name').trim().notEmpty().withMessage('Name Required'),
	body('sks').trim().isLength({ min: 1, max: 4 }).withMessage('min 1 characters, max 4 characters').isNumeric().withMessage('SKS must be numeric'),
	body('type').trim().notEmpty().withMessage('Type Required')
];

const PicketValidator = [
	// body('name').trim().notEmpty().withMessage('Name Required'),
	body('day').trim().notEmpty().withMessage('Day Required').isIn(['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu' ]).withMessage('Input the correct day'),
	body('location').trim().notEmpty().withMessage('Location Required'),
	body('status').trim().notEmpty().withMessage('Status Required').isIn(['Mengajar','Tidak Mengajar','Istirahat','Ijin','Sakit','Mengikuti Kegiatan']).withMessage('Input the correct status'),
];

const ScheduleValidator = [
	body('lecturer_id').trim().notEmpty().withMessage('Lecturer Required').isNumeric().withMessage('Lecture Must be numeric'),
	body('lecture_id').trim().notEmpty().withMessage('Lecture Required').isNumeric().withMessage('Lecture Must be numeric'),
	body('day').trim().notEmpty().withMessage('Day Required').isIn(['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu' ]).withMessage('Input the correct day'),
	body('start_time').trim().notEmpty().withMessage('Start Time Required'),
	body('end_time').trim().notEmpty().withMessage('End Time Required'),
	body('location').trim().notEmpty().withMessage('Location Required')
];

const AbsencesValidator = [
	body('status').trim().notEmpty().withMessage('Status Required').isIn(['Mengajar','Tidak Mengajar','Istirahat','Ijin','Sakit','Mengikuti Kegiatan']).withMessage('Input the correct status'),
	body('activity').trim().notEmpty().withMessage('Activity Required'),
	body('location').trim().notEmpty().withMessage('Location Required'),
	body('start_time').trim().notEmpty().withMessage('Start Time Required'),
	body('end_time').trim().notEmpty().withMessage('End Time Required'),
];

module.exports = { LecturerValidator, LectureValidator, PicketValidator,  ScheduleValidator,  AbsencesValidator};

// untuk profile_url kan sudah ada nama yang di generate jadi seharusnya sudah ada panjang pasti dari karakternya rasanya panjangnya 30 karakter jadi saran saya isLength nya seharusnya dibuatkan misalkan haris 20 karakter
// untuk not_empty juga seharusnya dihilangkan di setiap validator yang mempunyai validator isLenght
// untuk di address saran saya tidak perlu menggunakan isLenght karena panjang dari semua alamat ada kemungkinan berbeda jadi saran saya hanya perlu diisi notEmpty