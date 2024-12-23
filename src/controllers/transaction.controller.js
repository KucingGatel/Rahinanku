const { Voucher } = require('../models/voucher.model');
const { Voucher_Account } = require('../models/voucher_item.model');
const { Transaction } = require('../models/transaction.model');
const { Transaction_Item } = require('../models/transaction_item.model');
const { Address } = require('../models/address.model');
const { Personal_Data } = require ('../models/personal_data.model');
const { Toko } = require ('../models/toko_models');
const { Op } = require('sequelize');
const { Account } = require('../models/account.model');
const { Product } = require('../models/produk.model');
const { Cart_Item } = require('../models/cart_item.model');

function waktu() {
    const now = new Date();

    const hours = String(now.getHours());
    const minutes = String(now.getMinutes());
    const seconds = String(now.getSeconds());

    const waktu = String(hours) + String(minutes) + String(seconds);

    return waktu;
}

function Id(text, id_toko){
    const ID = 'transaction-' + text + '-' + waktu() + '-' + id_toko;
    return ID;
};

function IdItem(id_user, id_product){
    const id = id_user + '-' + id_product + '-' + Date.now();
    return id;
}

const mulaitransaksi = async (req,res) => {
    try {
      
        const { id_user } = req.body;

        const id_data = await Personal_Data.findOne({
            attributes: ['personal_data_id'],
            where: {
                account_id: id_user,
            }
        });

        const address = await Address.findOne({
            attributes: ['id','name', 'label', 'alamat', 'deskripsi', 'phone_number', 'email'],
            where: {
                persoal_data_id : id_data.getDataValue('personal_data_id'),
            }
        });

        const cart_item = await Cart_Item.findAll({
            attributes: ['kuantitas', 'harga', 'id_product'],
            where: {
                id_keranjang: 'cart-' + id_user,
            }
        });

        const produk = await Product.findOne({
            attributes: ['id_toko', 'harga', 'nama_product'],
            where: {
                id_product: 'P001',
            }
        });

        const cekTransaksi = await Transaction.findAll({
            attributes: ['id_transaction'],
            where: {
                id_user: id_user,
            }
        });

        let id_transaksi = null;

        if (cekTransaksi) {
            id_transaksi = cekTransaksi[0].getDataValue('id_transaction');
        }else{
            id_transaksi = Id(id_user, produk.getDataValue('id_toko'));
        }

        if (cekTransaksi.length == 0) {
            const createTransaction = await Transaction.create({
                id_transaction: Id(id_user, produk.getDataValue('id_toko')),
                harga: 0,
                id_user: id_user,
                id_address : address.getDataValue('id'),
                id_toko: produk.getDataValue('id_toko')
            });         
        }

        for (let i = 0; i < cart_item.length; i++) {
            // const element = cart_item[i];
            // console.log(cart_item[i].getDataValue('kuantitas'));
            const insertItemTransaksi = await Transaction_Item.create({
                id_transaction_item: IdItem(id_user, cart_item[i].getDataValue('id_product')),
                id_transaction : id_transaksi,
                id_produk: cart_item[i].getDataValue('id_product'),
                kuantitas: cart_item[i].getDataValue('kuantitas')
            });
        }
        
        res.status(201).json({success: true, data: address, produk});
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({success: false, msg: 'errror'});
    }
}

const transaction = async (req,res) => {
    const { id_user,kuantitas, id_voucher } = req.body;
    const { id_product } = req.params;

    try {
        const id_data = await Personal_Data.findOne({
            attributes: ['personal_data_id'],
            where: {
                account_id: id_user
            }
        });
    
        const address = await Address.findOne({
            attributes: ['name'],
            where: {
                persoal_data_id : id_data.getDataValue('personal_data_id'),
            }
        });
    
        const produk = await Product.findOne({
            attributes: ['harga', 'nama_product', 'stock', 'id_toko'],
            where : {
                id_product: id_product, 
            }
        });

        const idTransaksi = await Transaction.findOne({
            attributes: ['id_transaction'],
            where: {
                id_user: id_user,
            }
        })

        var harga = null;

        produk.getDataValue('id')
    
        if (id_voucher != null) {
            const voucher = await Voucher.findOne({
                attributes: ['persen', 'minimal_transaction', 'maksimal_potongan'],
                where: {
                    id_voucher: id_voucher,
                },
            });     
               
            const cekVoucher = await Voucher_Account.findOne({
                attributes: ['status'],
                where: {
                    [Op.and]: [
                        { id_voucher: id_voucher},
                        { account_id: id_user}
                    ]
                }
            });
    
            if(kuantitas <= produk.getDataValue('stock') ){
                if(cekVoucher){
                    harga = kuantitas * produk.getDataValue('harga');
                    if(produk.getDataValue('harga') >= voucher.getDataValue('minimal_transaction')){
                        const diskon = harga * voucher.getDataValue('persen');
                        if(diskon > harga){
                            harga = harga - voucher.getDataValue('maksimal_potongan');
                        }else{
                            harga = harga - diskon;
                        }
                    }
                }else{
                    res.status(400).json({success: false, msg: "Kamu Tidak Memiliki Voucher"});
                }
            }else{
                res.status(400).json({success: false, msg: "Stock Tidak Mencukupi"});
            }
        }else{
            if(kuantitas <= produk.getDataValue('stock') ){
                harga = kuantitas * produk.getDataValue('harga');
                console.log("test" + harga);
            }else{
                res.status(400).json({success: false, msg: "Stock Tidak Mencukupi"});
            }
        }   
        
        if(harga != null){
            const updateTransaction = await Transaction.update(
                {
                    harga: harga,
                    id_voucher: id_voucher,
                },
                {
                    where: {
                        id_transaction: idTransaksi.getDataValue('id_transaction'),
                    }
                }
            );
            
            const addItem = await Transaction_Item.create({
                id_transaction_item : IdItem(id_user, id_product),
                id_transaction: idTransaksi.getDataValue('id_transaction'),
                id_produk: id_product,
                kuantitas: kuantitas
            });

            const nowStock = produk.getDataValue('stock') - kuantitas;

            const kurangin = await Product.update(
                {
                    stock: nowStock,
                },
                {
                    where: {
                        id_product: id_product,
                    }
                }
            )
                res.status(201).json({success: true, msg: "data berhasil masuk"});
        }

           
    
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, msg: "Error"});
    }

    }

const Destroy = async (req,res) =>{
    try {
        const { id_user } = req.body;
        const destroy = await Transaction.destroy({
            where: {
                id_user : id_user
            }
        });
        res.status(201).json({success: true, msg: 'ANJAYY'});
    } catch (error) {
        res.status(400).json({success: false, msg: 'ERORRRRRRRRR'});
    }
}

module.exports = {
    mulaitransaksi, transaction, Destroy
}