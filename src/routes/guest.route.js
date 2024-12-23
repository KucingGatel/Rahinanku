const { Router } = require('express');
const router = Router();
const { CreateAccount, Login } = require('../controllers/account.controllers');
const { ResetPassword, KirimKodeUnik } = require('../controllers/reset_password.controller');

// const { AccountValidator } = require('../validator')
// const { validate } = require('../middlewares/validate.middleware');

router.post('/Register', CreateAccount); 
router.post('/Login', Login); 
router.post('/Reset', KirimKodeUnik);
router.post('/Reset-Password', ResetPassword);

module.exports = router;