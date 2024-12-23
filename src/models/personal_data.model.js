const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Personal_Data = sequelize.define(
	'Personal_Data',
	{
		personal_data_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                is: /^[0-9]+$/,
                len: [10, 15],
            }
        },
        gender:{
            type: DataTypes.ENUM('man', 'woman', 'undefined'),
            allowNull:false
        },
        birth_date:{
            type: DataTypes.DATE,
            allowNull:false,
        },
	},
	{ paranoid: true }
);

syncPersonal_Data();

async function syncPersonal_Data() {
	await Personal_Data.sync();
}

module.exports = { Personal_Data };

