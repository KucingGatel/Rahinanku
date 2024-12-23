const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.config');

const Video = sequelize.define(
	'Video',
	{
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        }
	},
	{ paranoid: true }
);

syncVideo();

async function syncVideo() {
	await Video.sync();
}

module.exports = { Video };

