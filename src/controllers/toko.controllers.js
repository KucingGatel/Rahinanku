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

function tanggal() {
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log(formattedDateTime); // Contoh: "2024-12-18 14:30:45"
    return formattedDateTime;
}

const generateTokoID = async () => {
    try {
      const count = await Toko.count();
  
      const newIdNumber = count + 2;

      const formattedId = `toko${String(newIdNumber).padStart(3, '0')}`;

      return formattedId;
    } catch (error) {
      console.error('Error generating toko ID:', error);
      throw error;
    }
  };

const BuatToko = async (req,res) => {
    try {
        const { nama_toko, lokasi, jam_operasional, account_id, kota } = req.body;
        const id = await generateTokoID(); 
        console.log(account_id);
        const buat = await Toko.create({
            id_toko: id,
            nama_toko: nama_toko,
            lokasi: lokasi,
            jam_operasional: jam_operasional,
            tanggal_bergabung: tanggal(), 
            waktu: "00:00:00",
            icon: "test.jpg",
            account_id: account_id,
            kota: kota,
            status: "pending",
        });
        res.status(201).json({success: true, data: buat})
    } catch (error) 
    {
        console.log(error);
        res.status(400).json({success: false})
    }
}

const TopToko = async (req,res) => {
    try {
        const satu = await Toko.findAll({
            attributes: ['nama_toko'],
            limit:5,
            offset:0
        });
        res.status(201).json({success:true, data: satu});
    } catch (error) {
        res.status(400).json({success:false});
    }
}

const ReadTokoById = async (req,res) => {
    const {id_toko} = req.body;
    try {
        const read = await Toko.findOne({
            attributes: ['nama_toko', 'lokasi', 'jam_operasional', 'kota'],
            where: {
                id_toko: id_toko,
            },
            include:{
                model: Product,
                attributes: ['nama_product', 'harga', 'id_product']
            }
        })
        res.status(201).json({success: true, data : read});
    } catch (error) {
        res.status(404).json({success: false});
    }
}


module.exports = {
    BuatToko,TopToko, ReadTokoById
}