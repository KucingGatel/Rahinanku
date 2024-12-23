const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Cart_Item = sequelize.define(
	'Cart_Item',
	{
        kuantitas: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        harga:{
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
        },
        waktu:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        tanggal:{
            type: DataTypes.DATE,
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncCart_Item();

async function syncCart_Item() {
	await Cart_Item.sync();
}

module.exports = { Cart_Item };

