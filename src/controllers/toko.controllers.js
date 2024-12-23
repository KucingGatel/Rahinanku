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
      // Menghitung jumlah data di tabel Toko
      const count = await Toko.count();
  
      // Menambahkan 1 untuk ID baru
      const newIdNumber = count + 1;
  
      // Format ID menjadi "toko" diikuti angka dengan padding nol (misalnya toko001)
      const formattedId = `toko${String(newIdNumber).padStart(3, '0')}`;

    //   console.log(`Generated ID: ${formattedId}`);
      return formattedId;
    } catch (error) {
      console.error('Error generating toko ID:', error);
      throw error;
    }
  };

const BuatToko = async (req,res) => {
    try {

        const { nama_toko, lokasi, jam_operasional, account_id } = req.body;
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


module.exports = {
    BuatToko,TopToko
}