const { Account } = require('../models/account.model');
const { Op } = require('sequelize');
// const { sendEmail, UnixCode } = require('../controllers/reset_password.controller'); 
const CryptoJS = require('crypto-js');
const { Personal_Data } = require('../models/personal_data.model');
const { Address } = require('../models/address.model');
const { Toko } = require('../models/toko_models');
const { UPDATE } = require('sequelize/lib/query-types');

const Salt = '051'; 
const salT = '005'; 

function Id(text){
    return 'id-' + Date.now() + '-' + Hash(text);
}

function Hash(Salt, text, salT) {
    const test = Salt + text + salT
    return CryptoJS.SHA256(test).toString();
}

function Token(test) {
    return CryptoJS.SHA256(test).toString();    
}

const CreateAccount = async (req,res) =>{
    try {
        const { username, password, email } = req.body;
        
        const checkAccount = await Account.findOne({
            where: {
                [Op.and]: [
                    {username : username},
                    {email: email}
                ]
            }
        });

        if(!checkAccount){
            const newAccount = await Account.create({
                account_id: Id(username),
                username: username,
                email: email,
                password: Hash(Salt,password,salT),
            });

            
            res.status(201).json({success: true, data: Id(username)});

        }else {
            res.status(400).json({ success: false, msg:'Username or Email is already in use'});
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg:'failed to create new Account'});
    }
};

const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const login = await Account.findOne({
            attributes: ['account_id'],
            where: {
                [Op.and]: [
                    { email: email }, 
                    { password: Hash(Salt,password,salT) }
                ],
            }
        });
        if(login){
            res.status(201).json({ success: true, msg:'Login', data: login});
        }else{
            res.status(400).json({ success: false, msg:'Email atau Password salah'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg:'Failed to create new Account'});
    }
}

const profile = async (req,res) => {
    try {
        const {id_user} = req.body;
        const read = await Personal_Data.findOne({
            attributes: ['name', 'phone_number', 'gender', 'birth_date'],
            where: {
                account_id: id_user
            },
            include: [{
                model: Address,
                attributes: ['alamat']
            }]
        })
        const toko = await Toko.findOne({
            attributes: ['id_toko'],
            where: {
                account_id: id_user
            }
        })
        res.status(201).json({ success: true, msg:'data berhasil di ambil', data: read,toko})
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, msg:'dahlah', error})
    }
}

const updateProfile = async(req,res) => {
    try {
        const { name, phone_number, gender, birth_date, account_id } = req.body;

        const existingPhoneNumber = await Personal_Data.findOne({
            where: {
            phone_number: phone_number,
            account_id: {
                [Op.ne]: account_id, // Nomor telepon sudah digunakan oleh akun lain
            },
            },
        });

        if (existingPhoneNumber) {
            return res.status(400).json({ success: false, msg:'Nomer Telepon sudah digunakan', error})
        }

        const update = await Personal_Data.update(
            {
                name: name,
                phone_number: phone_number,
                gender: gender,
                birth_date: birth_date,
            },
            {
                where: {
                    account_id: account_id
                }
            }
        )

        if (update[0] > 0) {
            return res.status(200).json({ success: true, msg: 'Profile updated successfully.' });
        } else {
            return res.status(404).json({ success: false, msg: 'Account not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, msg: 'Account not found.' });
    }
}

module.exports = {
    CreateAccount, Login, Hash, profile, updateProfile
}