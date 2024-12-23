const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Cart = sequelize.define(
	'Cart',
	{
		cart_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		}, 
        kuantitas: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                isNumeric: true,
            }
        },
        harga:{
            type: DataTypes.DECIMAL(15,2),
            allowNull:false,
        },
	},
	{ paranoid: true }
);

syncCart();

async function syncCart() {
	await Cart.sync();
}

module.exports = { Cart };

