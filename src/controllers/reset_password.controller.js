const { Reset_Password } = require('../models/reset_password.model');
const { Account } = require('../models/account.model');
const { Op, where } = require('sequelize');
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');

const Salt = '051'; 
const salT = '005'; 

function UnixCode() {
    return Math.floor(10000 + Math.random() * 90000);
}

function Expired(){
    return Date.now() + 300 * 5;
}

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cahyack16@gmail.com',
        pass: 'epjm mxhm sgsb slje',
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'cahyack16@gmail.com',
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

const KirimKodeUnik = async (req,res) => {
    const { email } = req.body;
    try {
        const user = await Account.findOne({ where: {email: email,}})
        if (!user) {
            res.status(400).json({ success: false, msg:'Emailnya gak ada cuk'});
        }else{
            try {
                const kode = UnixCode();
                await sendEmail(email, 'Kode Reset Password', `Kode Anda Adalah: ${kode}`);
                const CreateCode = await Reset_Password.create({
                    email: email,
                    token: kode,
                    expired_time: Expired(),
                });
                res.status(201).json({msg: 'Kode Telah Dikirim Ke Email Anda'});    
            } catch (error) {
                res.status(400).json({msg: 'Sabar Cuk ERROR'});    
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : 'Terjadi Kesalahan Server'});
    }
};

const ResetPassword = async (req, res) => {
    const  { email, kodeunik, newpassword} = req.body;
    try {
        const CekKode = await Reset_Password.findOne({
            attributes: ['expired_time'],
            where: {
                [Op.and]: [
                    { email: email},
                    { token: kodeunik},
                ],
            }
        });
        if (!CekKode) {
            res.status(400).json({success: false, msg: 'Kode Yang Anda Masukan Salah'});    
        }else if (CekKode.getDataValue('expired_time') <= Date.now()){
            res.status(400).json({success: false, msg: 'Kode Anda sudah Expired'});
        }else{
            console.log(CekKode);
            console.log(Date.now());
            const GantiPassword = await Account.update(
                { password: Hash(Salt,newpassword,salT)},
                { where: { email: email}}
            );
            res.status(201).json({success:true, msg: 'Password anda sudah di perbaharui', data: CekKode.getDataValue('expired_time') <= Date.now()});
        }    
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: 'Error internal server'});
    }
}

module.exports = {
    KirimKodeUnik, ResetPassword, sendEmail, UnixCode, Expired
}