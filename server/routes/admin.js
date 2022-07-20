const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config()


var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    },

    tls: {
        rejectUnauthorized: false
    }

})

router.post('/admin', [

    body('name', 'Enter a valid user name').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be atleast 5 char long').isLength({ min: 5 }),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let admin = await Admin.findOne({ name: req.body.name });
        if (admin) {
            return res.status(400).json({ error: "user with this username alrady exists" })
        }

        const {
            name,
            email,
            password,
            occupation,
            allocateid,
            status,
            account_type,
            credits,
        } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        admin = await Admin.create({

            name: name,
            email: email,
            password: hashPassword,
            occupation: occupation,
            allocateid: allocateid,
            status: status,
            account_type: account_type,
            credits: credits,

        })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/admin/login', async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
        let admin = await Admin.findOne({ name });
        if (!admin) {
            return res.status(400).json({ success, errors: 'please try again' });

        }

        const passwordcompare = await bcrypt.compare(password, admin.password);
        if (!passwordcompare) {
            return res.status(400).json({ success, errors: 'please try again' });
        }

        const data = {
            admin: {
                id: admin.id
            }
        }

        var token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ token, admin })

    } catch (err) {
        res.status(500).send("Error occured");
    }
});

// get all admin

router.get('/getall', async (req, res)=>{
    adminName = []
    try {

        const alladmins = await Admin.find();

        alladmins.forEach((admin,i)=>{

            adminName[i] = admin.name
            
        })
        res.json(adminName);
        
    } catch (error) {
        res.status(500).send('Erro occured')
    }
})

router.post('/admin/forgot', async (req, res) => {

    try {

        const { username, newpassword, confirmpassword } = req.body;

        const user = await Admin.find({ name: username })

        var epoch_date = new Date(Date.now());
        var date = epoch_date.toLocaleString('en-GB', { hour12: false });

        var mailOptions = {
            from: 'gkang0084@gmail.com',
            to: 'gkang0084@gmail.com',
            subject: 'Front Desk Dashboard',
            html: `<div style="font-family: Helvetica,Arial,sans-serif;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Front Desk Dashboard</a>
                  </div>
                  <p style="font-size:1.1em">Security Alert,</p>
                  <p>User with the username ${user[0].name} changed its password</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:black;font-size:1em;line-height:1;font-weight:300">
                    <p >Date : ${date}</p>
                  </div>
                </div>
              </div>`,

        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('mail sent')
            }
        })

        if (newpassword == confirmpassword) {
            
            user[0].password = newpassword

            await user[0].save()

        }


        res.json('Updated successfully')

    } catch (error) {
        res.status(500).send('Error occured')
    }

})

module.exports = router