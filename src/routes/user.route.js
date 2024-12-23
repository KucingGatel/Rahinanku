const { Router } = require('express');
const router = Router();
const { ReadAllProduct, ReadByCategory, Read9 } = require('../controllers/produk.controllers');
const { AddCart, readItem } = require('../controllers/cart.controller');
const { mulaitransaksi, transaction, Destroy } = require('../controllers/transaction.controller');
const { BuatToko,TopToko } = require('../controllers/toko.controllers');


// const { AccountValidator } = require('../validator')
// const { validate } = require('../middlewares/validate.middleware');

router.get('/Home', Read9); 
router.get('/TopToko', TopToko); 
router.get('/Products', ReadAllProduct); 
router.get('/Home/:category', ReadByCategory); 
router.post('/Add_Cart/:id_product', AddCart);
router.post('/Cart', readItem);
router.post('/Transaksi', mulaitransaksi);
router.post('/Transaction/:id_product', transaction);
router.post('/ExitTransaksi', Destroy); 
router.post('/CreateToko', BuatToko);

module.exports = router;