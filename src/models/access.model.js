const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Access = sequelize.define(
	'Access',
	{
		access_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,

		},
        nama_access: {
            type: DataTypes.ENUM(''),
            allowNull: false,
        },
	},
	{ paranoid: true }
);

syncAccess();

async function syncAccess() {
	await Access.sync();
}

module.exports = { Access };

