const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Address = sequelize.define(
	'Address',
	{
        alamat: {
            type: DataTypes.TEXT,
            allowNull: false,
        },  
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                is: /^[0-9]+$/,
                len: [10, 15], 
            },
        },
        deskripsi:{
            type: DataTypes.TEXT,
            allowNull: true
        }
	},
	{ paranoid: true }
);

syncAddress();

async function syncAddress() {
	await Address.sync();
}

module.exports = { Address };

