const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Reset_Password = sequelize.define(
	'Reset_Password',
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                isEmail: true,
            }
		},
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expired_time: {
            type: DataTypes.STRING,
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncReset_Password();

async function syncReset_Password() {
	await Reset_Password.sync();
}

module.exports = { Reset_Password };

