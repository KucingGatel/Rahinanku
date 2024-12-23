const { Product } = require('../models/produk.model');
const { Kategori } = require('../models/kategori.model');
const { Op } = require('sequelize');

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
    const category = req.params.category;
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

module.exports = {
    ReadAllProduct, ReadByCategory, Read9
}