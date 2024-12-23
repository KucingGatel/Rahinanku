const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Transaction_Item = sequelize.define(
	'Transaction_Item',
	{
		id_transaction_item: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        id_transaction : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_produk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kuantitas:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
	},
	{ paranoid: true }
);

syncTransaction_Item();

async function syncTransaction_Item() {
	await Transaction_Item.sync();
}

module.exports = { Transaction_Item };

