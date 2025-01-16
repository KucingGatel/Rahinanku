const { Product } = require('../models/produk.model');
const { Kategori } = require('../models/kategori.model');
const { Toko } = require('../models/toko_models');
const { Op } = require('sequelize');

const generateProductID = async () => {
    try {
      const count = await Product.count();
  
      const newIdNumber = count + 2;
  
      const formattedId = `P${String(newIdNumber).padStart(3, '0')}`;

    //   console.log(`Generated ID: ${formattedId}`);
      return formattedId;
    } catch (error) {
      console.error('Error generating Product ID:', error);
      throw error;
    }
};

  function generateFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena bulan dimulai dari 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const ReadAllProduct = async (req,res) => {
    try {
        const Read = await Product.findAll({
            attributes : ['id_product', 'nama_product', 'harga', 'deskripsi', 'rating'],    
        });
        res.status(201).json({success: true, data : Read});
    } catch (error) {
        res.status(400).json({success: false});
    }
}

const Read9 = async (req,res) => {
    try {
        const Read = await Product.findAll({
            attributes : ['id_product', 'nama_product', 'harga', 'deskripsi', 'rating'],    
            limit: 9,
            offset: 0,
        });
        
        res.status(201).json({success: true, data : Read});
    } catch (error) {
        res.status(400).json({success: false});
    }
}

const ReadByCategory = async (req,res) => {
    const {category} = req.params;
    try {
        const byCategory = await Product.findAll({
            attributes : ['id_product', 'nama_product', 'harga', 'deskripsi', 'rating'], 
            include: [
                {
                    model: Kategori,
                    where: {kategori: category},
                    through: { attributes: [] },
                    attributes: ['kategori']
                },
            ],
            limit: 10,
            offset: 0,
        });
        res.status(201).json({success: true, data : byCategory});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
}

const DetailProduct = async (req,res) => {
    const {id_product} = req.body;
    try {
        const detail = await Product.findOne({
            attributes : ['nama_product', 'harga', 'deskripsi', 'rating'],
            where: {id_product: id_product},
        });
        res.status(201).json({success: true, data : detail});
    } catch (error) {
        res.status(400).json({success: false});
    }
}

const tambahProduct = async (req, res) => {
    try {
        const id_product = await generateProductID();
        const { id_toko, account_id, nama_product, harga, deskripsi, stock, kategori } = req.body;

        const cekToko = await Toko.findOne({
            attributes: ['id_toko'],
            where: { account_id: account_id },
        });

        if (!cekToko) {
            return res.status(400).json({ success: false, msg: 'Toko tidak ditemukan' });
        }

        if (cekToko.getDataValue('id_toko') !== id_toko) {
            return res.status(400).json({ success: false, msg: 'ID Toko tidak valid' });
        }

        const product = await Product.create({
            id_product: id_product,
            nama_product: nama_product,
            harga: harga,
            deskripsi: deskripsi,
            stock: stock,
            waktu: '00:00:00',
            tanggal: generateFormattedDate(),
            id_toko: id_toko,
        });
        console.log(kategori);
        // Validasi kategori dan tambahkan ke relasi
        if (kategori) {
            const kategoriInstance = await Kategori.findByPk(kategori); // Cari kategori berdasarkan ID
            if (!kategoriInstance) {
                return res.status(400).json({ success: false, msg: 'Kategori tidak ditemukan' });
            }

            // Tambahkan relasi ke produk
            await product.setKategoris([kategoriInstance]);
            console.log(`Kategori ${kategori} berhasil ditambahkan ke produk ${id_product}`);
        } else {
            return res.status(400).json({ success: false, msg: 'Kategori tidak valid' });
        }

        res.status(201).json({ success: true, msg: 'Berhasil Menambahkan Product' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: 'Gagal Menambahkan Product' });
    }
};



module.exports = {
    ReadAllProduct, ReadByCategory, Read9, tambahProduct
}