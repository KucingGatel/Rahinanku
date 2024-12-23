const { Cart } = require('../models/cart.model');
const { Cart_Item } = require('../models/cart_item.model');
const { Product } = require('../models/produk.model');
const { Hash } = require('../controllers/account.controllers');
const { Op } = require('sequelize');

const sekarang = new Date();
const jam = sekarang.getHours(); 
const menit = sekarang.getMinutes(); 
const detik = sekarang.getSeconds(); 
const waktuSekarang = `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
const tanggal = sekarang.getDate();
const bulan = sekarang.getMonth() + 1;
const tahun = sekarang.getFullYear();
const tanggalSekarang = `${tahun}-${bulan.toString().padStart(2, '0')}-${tanggal.toString().padStart(2, '0')} ${waktuSekarang}`;

 
const AddCart = async (req,res) => {
    try {
        const { id_user } = req.body;
        const { id_produk } = req.params;

            const cekProduk = await Product.findOne({
                attributes: ['nama_product', 'harga', 'stock'], 
                where: {
                    id_product: id_produk
                }
            }); 

            const cekCartItem = await Cart_Item.findOne({
                attributes: ['kuantitas', 'id_keranjang', 'id_product'],
                where: {
                    id_product: id_produk,
                }
            });

            if (cekCartItem) {
                if(cekProduk.getDataValue('stock') >= 1){
                    const newKuantitas = cekCartItem.getDataValue('kuantitas') + 1;
                    const tambahKuantitas = await Cart_Item.update(
                        {
                            kuantitas: newKuantitas,
                            harga: cekProduk.getDataValue('harga') * newKuantitas,
                        },
                        {
                            where: {
                                [Op.and]:[
                                    {id_product: id_produk},
                                    {id_keranjang: `cart-${id_user}`},
                                ],
                            }
                        }
                    );
                    res.status(200).json({success: true, msg: 'Berhasil meanbahkan Kuantitas'});    
                }else {
                    res.status(400).json({success: false, msg: 'Stock Habis woi'});    
                }
            }else{
                if(cekProduk.getDataValue('stock') >= 1){
                    const Add = await Cart_Item.create({
                        kuantitas: 1,
                        harga: cekProduk.getDataValue('harga') * 1,
                        waktu: waktuSekarang,
                        tanggal: tanggalSekarang,
                        id_keranjang: `cart-${id_user}`,
                        id_product: id_produk
                    });
                    res.status(201).json({success: true, msg: 'Silahkan cek Keranjang anda'});    
                }else {
                    res.status(400).json({success: false, msg: 'Stock Habis woi'});    
                }
            }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, msg: 'Server internal error'});    
    }
}

const readItem = async (req,res) =>{
    try {
        const { id_user } = req.body;
        const read = await Cart_Item.findAll({
            attributes: ['kuantitas', 'harga', 'id_product'],
            where: {
                id_keranjang: id_user,
            },
        });
        // const total = await Cart.findOne({
        //     attributes: ['harga'],
        //     where: {
        //         cart_id : id_user,
        //     },
        // });
        res.status(201).json({success: true, data: read});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, msg: 'Internal Server Error'});
    }
}

module.exports = {
    AddCart, readItem
}