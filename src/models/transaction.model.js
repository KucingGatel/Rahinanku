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
		id_user:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_address:{
			type: DataTypes.STRING,
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

