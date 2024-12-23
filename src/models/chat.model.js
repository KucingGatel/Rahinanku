// const { Sequelize, DataTypes} = require('sequelize');
// const { sequelize } = require('../config/db.config');

// const Chat = sequelize.define(
// 	'Chat',
// 	{
//         id_chat:{
//             type: DataTypes.STRING,
//             allowNull: false,
// 			primaryKey: true,
//         },
//         chat: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         waktu:{
//             type: DataTypes.TIME,
//             allowNull: false,
//         },
//         tanggal_chat:{
//             type: DataTypes.DATE,
//             allowNull: false,
//         }
// 	},
// 	{ paranoid: true }
// );

// syncChat();

// async function syncChat() {
// 	await Chat.sync();
// }

// module.exports = { Chat };