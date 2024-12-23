const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Komentar = sequelize.define(
	'Komentar',
	{
        id_Komentar:{
            type: DataTypes.STRING,
            allowNull: false,
			primaryKey: true,
        },
        komentar: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating:{
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        tanggal_bergabung:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        waktu:{
            type: DataTypes.TIME,
            allowNull: false,
        },
	},
	{ paranoid: true }
);

syncKomentar();

async function syncKomentar() {
	await Komentar.sync();
}

module.exports = { Komentar };