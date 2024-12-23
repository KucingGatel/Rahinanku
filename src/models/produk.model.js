const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Product = sequelize.define(
	'Product',
	{
        id_product:{
            type: DataTypes.STRING,
            allowNull: false,
			primaryKey: true,
        },
        nama_product: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        harga:{
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waktu:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        tanggal:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: { 
            type: DataTypes.TINYINT,
            allowNull: true,
        }
	},
	{ paranoid: true }
);

syncProduct();

async function syncProduct() {
	await Product.sync();
}

module.exports = { Product };