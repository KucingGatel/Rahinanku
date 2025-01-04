const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Pembayaran = sequelize.define(
	'Pembayaran',
	{
		pembayaran_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        status_pembayaran: {
            type: DataTypes.ENUM('lunas', 'belum lunas', 'pending'),
            allowNull: false,
        },
        id_transaction: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        metode_pembayaran: {
            type: DataTypes.ENUM('transfer', 'cod'),
            allowNull: false
        },

	},
	{ paranoid: true }
);

syncPembayaran();

async function syncPembayaran() {
	await Pembayaran.sync();
}

module.exports = { Pembayaran };

