const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');
const { Account } = require('./account.model');

const Toko = sequelize.define(
	'Toko',
	{
        id_toko:{
            type: DataTypes.STRING,
            allowNull: false,
			primaryKey: true,
        },
        nama_toko: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lokasi:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        jam_operasional:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal_bergabung:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        waktu:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        icon:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        account_id:{
            type:DataTypes.STRING,
            allowNull: false
        },
        kota:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('Terkonfirmasi', 'Pending', 'Tidak Dikonfirmasi'),
            allowNull: false
        }
	},
	{ paranoid: true }
);

syncToko();

async function syncToko() {
	await Toko.sync();
}

module.exports = { Toko };