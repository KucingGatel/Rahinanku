const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Foto = sequelize.define(
	'Foto',
	{
        foto_url: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        }
	},
	{ paranoid: true }
);

syncFoto();

async function syncFoto() {
	await Foto.sync();
}

module.exports = { Foto };

