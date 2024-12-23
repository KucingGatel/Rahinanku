const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Account = sequelize.define(
	'Account',
	{
		account_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,

		},
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                isEmail: true,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
	},
	{ paranoid: true }
);

syncAccount();

async function syncAccount() {
	await Account.sync();
}

module.exports = { Account };

