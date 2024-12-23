const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('rahinanku', process.env.DB_USERNAME, process.env.DB_PASS, {
	host: 'localhost',
	dialect: 'mysql',
	logging: console.log,
	dialectOptions: {
		useUTC: false, // for reading from database
		timezone: "+08:00", // for WITA
	},
	timezone: '+08:00',
});

module.exports = { sequelize };
