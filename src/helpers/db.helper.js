const { Account } = require('../models/account.model');
const { Role } = require('../models/role.model');
const { Access } = require('../models/access.model');
const { Personal_Data } = require('../models/personal_data.model');
const { Address } = require('../models/address.model');
const { Cart } = require('../models/cart.model');
const { Model } = require('sequelize');
const { Cart_Item } = require('../models/cart_item.model');
const { Product } = require('../models/produk.model');
const { Toko } = require('../models/toko_models');
const { Komentar } = require('../models/komentar.model');
const { Kategori } = require('../models/kategori.model');
// const { Chat } = require('../models/chat.model');
const { Notification } = require('../models/notification.model');
const { Status_Notification } = require('../models/status_notification.model');
const { Foto } = require('../models/foto.model');
const { Video } = require('../models/video.model');
const { Reset_Password } = require('../models/reset_password.model');
const { Transaction } = require('../models/transaction.model');
const { Transaction_Item } = require('../models/transaction_item.model');
const { Voucher_Item, Voucher_Account } = require('../models/voucher_item.model');
const { Voucher } = require('../models/voucher.model');
const { Pembayaran } = require('../models/pembayaran.model');


async function authenticateDB(sequelize) {
	try {
		// Model relations

		Role.belongsToMany(Access, { through: 'access_role'});
		Access.belongsToMany(Role, { through: 'access_role'});

		Account.belongsToMany(Role, { through: 'account_role'});
		Role.belongsToMany(Account, { through: 'account_role'});

		Account.hasOne(Personal_Data, { foreignKey: 'account_id'});
		Personal_Data.belongsTo(Account, { foreignKey: 'account_id'});

		Personal_Data.hasMany(Address, { foreignKey: 'personal_data_id'});
		Address.belongsTo(Personal_Data, { foreignKey: 'personal_data_id'});

		Account.hasOne(Cart, { foreignKey: 'account_id'});
		Cart.belongsTo(Account, { foreignKey: 'account_id'});

		Cart.hasMany(Cart_Item, { foreignKey: 'id_keranjang'});
		Cart_Item.belongsTo(Cart, { foreignKey: 'id_keranjang'});

		Product.hasMany(Cart_Item, { foreignKey: 'id_product'});
		Cart_Item.belongsTo(Product, { foreignKey: 'id_product'});

		Toko.hasMany(Product, { foreignKey: 'id_toko'});
		Product.belongsTo(Toko, { foreignKey: 'id_toko'});

		Product.belongsToMany(Account, { through: 'whislist'});
		Account.belongsToMany(Product, { through: 'whislist'});

		Product.hasMany(Komentar, { foreignKey: 'id_product'});
		Komentar.belongsTo(Product, { foreignKey: 'id_product'});

		Product.belongsToMany(Kategori, { through: 'kategori_product'});
		Kategori.belongsToMany(Product, { through: 'kategori_product'});

		// Account.hasMany(Chat, { foreignKey: 'id_penerima'});
		// Chat.belongsTo(Account, { foreignKey: 'id_penerima'});
		
		// Account.hasMany(Chat, { foreignKey: 'id_pengirim'});
		// Chat.belongsTo(Account, { foreignKey: 'id_pengirim'});

		Account.hasMany(Notification, { foreignKey: 'account_id'});
		Notification.belongsTo(Account, { foreignKey: 'account_id'});

		Notification.hasOne(Status_Notification, { foreignKey: 'id_notification'});
		Status_Notification.belongsTo(Notification, { foreignKey: 'id_notification'});

		Account.hasMany(Status_Notification, { foreignKey: 'account_id'});
		Status_Notification.belongsTo(Account, { foreignKey: 'account_id'});

		Toko.hasMany(Foto, { foreignKey: 'id_toko'});
		Toko.hasMany(Video, { foreignKey: 'id_toko'});

		Product.hasMany(Foto, { foreignKey: 'id_product'});
		Product.hasMany(Video, { foreignKey: 'id_product'});

		Komentar.hasMany(Foto, { foreignKey: 'id_komentar'});
		Komentar.hasMany(Video, { foreignKey: 'id_komentar'});

		// Chat.hasMany(Foto, { foreignKey: 'id_chat'});
		// Chat.hasMany(Video, { foreignKey: 'id_chat'});

		Notification.hasMany(Foto, { foreignKey: 'id_notification'});
		Notification.hasMany(Video, { foreignKey: 'id_notification'});

		Komentar.hasMany(Foto, { foreignKey: 'id_komentar'});
		Komentar.hasMany(Video, { foreignKey: 'id_komentar'});

		// Toko.belongsTo(Foto, { foreignKey: 'id_toko'});
		// Toko.belongsTo(Video, { foreignKey: 'id_toko'});

		// Product.belongsTo(Foto, { foreignKey: 'id_product'});
		// Product.belongsTo(Video, { foreignKey: 'id_product'});

		// Komentar.belongsTo(Foto, { foreignKey: 'id_komentar'});
		// Komentar.belongsTo(Video, { foreignKey: 'id_komentar'});

		// Chat.belongsTo(Foto, { foreignKey: 'id_chat'});
		// Chat.belongsTo(Video, { foreignKey: 'id_chat'});

		// Notification.belongsTo(Foto, { foreignKey: 'id_notification'});
		// Notification.belongsTo(Video, { foreignKey: 'id_notification'});

		// Komentar.belongsTo(Foto, { foreignKey: 'id_komentar'});
		// Komentar.belongsTo(Video, { foreignKey: 'id_komentar'});

		Transaction_Item.belongsTo(Product,{foreignKey: 'id_product'});
		Product.belongsTo(Transaction_Item,{foreignKey: 'id_product'});
	
		Transaction.hasOne(Pembayaran,{foreignKey: 'id_transaction'});
		Pembayaran.belongsTo(Transaction,{foreignKey: 'id_transaction'});

		Voucher.hasMany(Voucher_Account,{foreignKey: 'id_voucher'});
		Voucher_Account.belongsTo(Voucher,{foreignKey: 'id_voucher'});

		Account.hasMany(Voucher_Account,{foreignKey: 'account_id'});
		Voucher_Account.belongsTo(Account,{foreignKey: 'account_id'});

		Account.hasMany(Transaction, {foreignKey: 'account_id'});
		Transaction.belongsTo(Account, {foreignKey: 'account_id'});

		// await sequelize.sync({ alter: true });
		await sequelize.sync();
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

module.exports = { authenticateDB };
