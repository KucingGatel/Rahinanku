const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Kategori = sequelize.define(
	'Kategori',
	{
		kategori_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,

		},
        kategori: {
            type: DataTypes.STRING,
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncKategori();

async function syncKategori() {
	await Kategori.sync();
}

module.exports = { Kategori };

