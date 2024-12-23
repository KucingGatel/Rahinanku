const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Status_Notification = sequelize.define(
	'Status_Notification',
	{
        status:{
            type: DataTypes.ENUM('Dibaca', 'Terkirim'),
            allowNull: false,
        }
	},
	{ paranoid: true }
);

syncStatus_Notification();

async function syncStatus_Notification() {
	await Status_Notification.sync();
}

module.exports = { Status_Notification };