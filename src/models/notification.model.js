const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Notification = sequelize.define(
	'Notification',
	{
		Notification_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        isi: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'pembeli', 'penjual', 'guest', 'all'),
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncNotification();

async function syncNotification() {
	await Notification.sync();
}

module.exports = { Notification };

