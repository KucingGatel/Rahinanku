const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Transaction = sequelize.define(
	'Transaction',
	{
		id_transaction: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        harga:{
            type: DataTypes.STRING,
            allowNull:false,
        },
		account_id:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		id_address:{
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_voucher:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM('Selesai', 'Proses'),
			allowNull: false,
		}
	},
	{ paranoid: true }
);

syncTransaction();

async function syncTransaction() {
	await Transaction.sync();
}

module.exports = { Transaction };

