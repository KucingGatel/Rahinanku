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
const { Pembayaran } = require('../models/pembayaran.model');

function waktu() {
    const now = new Date();

    const hours = String(now.getHours());
    const minutes = String(now.getMinutes());
    const seconds = String(now.getSeconds());

    const waktu = String(hours) + String(minutes) + String(seconds);

    return waktu;
}

function Id(text){
    const ID = 'transaction-' + text + '-' + Date.now();
    return ID;
};

function IdItem(id_user, id_product){
    const id = id_user + '-' + id_product + '-' + Date.now();
    return id;
}

function id_pembayaran(params) {
    const id = "pembayaran-" + params;
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
            attributes: ['id','name', 'alamat', 'deskripsi', 'phone_number'],
            where: {
                personal_data_id : id_data.getDataValue('personal_data_id'),
            }
        });

        const cart_item = await Cart_Item.findAll({
            attributes: ['kuantitas', 'harga', 'id_product'],
            where: {
                id_keranjang: 'cart-' + id_user,
            }
        });

        const productIds = cart_item.map(item => item.getDataValue('id_product'));

        const produk = await Product.findAll({
            attributes: ['nama_product'],
            where: {
                id_product : {
                [Op.in]: productIds,
                }
            },
            include: {
                model: Cart_Item,
                attributes: ["kuantitas", "harga"]
            }
        });

        const cekTransaksi = await Transaction.findAll({
            attributes: ['id_transaction'], 
            where: {
                [Op.and] : [
                    {account_id: id_user},
                    {status: "Proses"}
                ]
            },
            // logging: console.log,
        });

        let id_transaksi = null;

        console.log(cekTransaksi);

        if (cekTransaksi.length != 0) {
            // console.log(cekTransaksi);
            id_transaksi = cekTransaksi[0].getDataValue('id_transaction');
        }else{
            id_transaksi = Id(id_user);
        }

        if (cekTransaksi.length == 0) {
            const createTransaction = await Transaction.create({
                id_transaction: Id(id_user),
                harga: 0,
                account_id: id_user,
                id_address : address.getDataValue('id'),
                status: "Proses",
            });         
        }

        // const cekItemTransaksi = await Transaction_Item.findAll({
        //     where: {
        //         [Op.and]: [
        //             id_product : {
        //                 [Op.in]: productIds,
        //             },
        //             id_transaction: id_transaksi
        //         ]
                
        //     },
        // });

        const cekItemTransaksi = await Transaction_Item.findAll({
            where: {
                [Op.and]: [
                    { id_product: { [Op.in]: productIds } },
                    { id_transaction: id_transaksi }
                ]
            },
        });

        if (cekItemTransaksi.length != cart_item.length){
            const deleteitemtransakasi = await Transaction_Item.destroy({
                where : {
                    id_transaction: id_transaksi
                }
            });
            for (let i = 0; i < cart_item.length; i++) {
                // const element = cart_item[i];
                // console.log(cart_item[i].getDataValue('kuantitas'));
                const insertItemTransaksi = await Transaction_Item.create({
                    id_transaction_item: IdItem(id_user, cart_item[i].getDataValue('id_product')),
                    id_transaction : id_transaksi,
                    id_product: cart_item[i].getDataValue('id_product'),
                    kuantitas: cart_item[i].getDataValue('kuantitas')
                });
            }
        }
        
        res.status(201).json({success: true, data: address, produk, id_transaksi});
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({success: false, msg: 'errror'});
    }
}

const transaction = async (req,res) => {
    const { id_user, total, voucher, id_transaction, metode_pembayaran } = req.body;
    try { 
        const transaction_item = await Transaction_Item.findAll({
            attributes: ['kuantitas', 'id_product'],
            where: {
                id_transaction: id_transaction,
            },
            include: [
                {
                    model: Product,
                    attributes: ['nama_product', 'stock', 'harga']
                }
            ]
        });

        // console.log(transaction_item);
        const productIds = transaction_item.map(item => item.getDataValue('id_product'));
        const TotalSatuan = transaction_item.map(item => item.Product.getDataValue('harga') * item.getDataValue('kuantitas'));

        const TotalKeseluruhan = TotalSatuan.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(TotalKeseluruhan);

        let hargaAkhir = null;

        if(voucher != null){
            hargaAkhir = total;
        }else{
            hargaAkhir = TotalKeseluruhan;
        }

        const updateTransaksi = await Transaction.update(
            { 
                harga: hargaAkhir, 
                id_voucher: voucher,
                status: "Selesai",
            },
            {
                where: {
                    id_transaction: id_transaction,
                }
            }
        );

        const buatPembayaran = await Pembayaran.create({
            pembayaran_id: id_pembayaran(id_transaction),
            status_pembayaran: 'belum lunas',
            id_transaction: id_transaction,
            metode_pembayaran: metode_pembayaran,
        });

        const deleteCartItem = await Cart_Item.destroy({
            where:{
                id_keranjang: `cart-${id_user}`,
            }
        })

        res.status(201).json({success: true, msg: "data berhasil masuk"});

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
};

const CekVoucher = async (req,res) => {
    const { id_voucher,id_user,total } = req.body;
    try {
        const cekVoucher = await Voucher_Account.findOne({
            attributes: ["status"],
            where: {
                [Op.and]: [
                    { id_voucher: id_voucher },
                    { account_id: id_user },
                    { status: 'punya'},
                ]
            },
            include: [
                {
                    model: Voucher,
                    attributes: ['persen', 'minimal_transaction', 'maksimal_potongan'],
                },
            ],
        });

        let harga_akhir;
        
        if (cekVoucher.length <= 0) {
            res.status(400).json({ success: false, msg: "Kamu Tidak Memiliki Voucher" });
            return;
        }else{
            if (Number(total) < cekVoucher.Voucher.getDataValue("minimal_transaction")) {
                console.log(total < cekVoucher.Voucher.getDataValue("minimal_transaction")); 
                console.log(total); 
                console.log(cekVoucher.Voucher.getDataValue("minimal_transaction")); 
                res.status(201).json({ success: true, msg: "Anda Tidak mencapai minimal transaksi"});
            }else{
                const diskon = total * cekVoucher.Voucher.getDataValue("persen") / 100;
                // console.log(diskon);
                if (diskon <= cekVoucher.Voucher.getDataValue("maksimal_potongan")) {
                    harga_akhir = total - diskon;
                }else{
                    harga_akhir = total - cekVoucher.Voucher.getDataValue("maksimal_potongan");
                }
            }
            res.status(201).json({ success: true, msg: "Voucher Sudah Terpasang", data: harga_akhir});
        }
    } catch (error) {
        res.status(404).json({ success: false, msg: "server internal error" });
    }
}

module.exports = {
    mulaitransaksi, transaction, Destroy, CekVoucher
}