const { Account } = require('../models/account.model');
const { Op } = require('sequelize');
// const { sendEmail, UnixCode } = require('../controllers/reset_password.controller'); 
const CryptoJS = require('crypto-js');

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

module.exports = {
    CreateAccount, Login, Hash
}