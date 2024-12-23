const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Voucher_Account = sequelize.define(
	'Voucher_Account',
	{
		id_voucher_account: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        account_id:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        status: {
            type: DataTypes.ENUM('sudah Terpakai', 'tidak punya', 'punya'),
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncVoucher_Account();

async function syncVoucher_Account() {
	await Voucher_Account.sync();
}

module.exports = { Voucher_Account };

