const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Voucher = sequelize.define(
	'Voucher',
	{
		id_voucher: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        persen:{
            type: DataTypes.TINYINT,
            allowNull:false,
        },
        minimal_transaction: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maksimal_potongan: {
            type: DataTypes.STRING,
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncVoucher();

async function syncVoucher() {
	await Voucher.sync();
}

module.exports = { Voucher };

