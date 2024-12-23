const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Role = sequelize.define(
	'Role',
	{
		role_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,

		},
        nama_role: {
            type: DataTypes.ENUM('admin','super_admin','penjual','pembeli'),
            allowNull: false,
        },
	},
	{ paranoid: true }
);

syncRole();

async function syncRole() {
	await Role.sync();
}

module.exports = { Role };

