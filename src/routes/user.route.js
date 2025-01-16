const { Router } = require('express');
const router = Router();
const { ReadAllProduct, ReadByCategory, Read9, tambahProduct } = require('../controllers/produk.controllers');
const { AddCart, readItem } = require('../controllers/cart.controller');
const { mulaitransaksi, transaction, Destroy, CekVoucher } = require('../controllers/transaction.controller');
const { BuatToko,TopToko, ReadTokoById } = require('../controllers/toko.controllers');
const { profile, updateProfile } = require('../controllers/account.controllers');


// const { AccountValidator } = require('../validator')
// const { validate } = require('../middlewares/validate.middleware');

router.get('/Home', Read9); 
router.get('/TopToko', TopToko); 
router.get('/Products', ReadAllProduct);
router.post('/AddProduct', tambahProduct);
router.get('/Home/:category', ReadByCategory); 
router.post('/Add_Cart', AddCart);
router.post('/Cart', readItem);
router.post('/Transaksi', mulaitransaksi);
router.post('/Transaction', transaction);
router.post('/ExitTransaksi', Destroy); 
router.post('/CreateToko', BuatToko);
router.post('/Toko', ReadTokoById);
router.post('/Cekvoucher', CekVoucher);
router.post('/Profile', profile);
router.put('/UpdateProfile', updateProfile);

module.exports = router;

