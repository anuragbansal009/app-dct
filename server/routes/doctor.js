const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config()


var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'gkang0084@gmail.com',
        pass: 'rambo2001'
    },

    tls: {
        rejectUnauthorized: false
    }

})

router.post('/doctor', [

    body('name', 'Enter a valid user name').isLength({ min: 4 }),
    body('password', 'Password should be atleast 5 char long').isLength({ min: 5 }),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let doctor = await Doctor.findOne({ username: req.body.username });
        if (doctor) {
            return res.status(400).json({ error: "user with this username alrady exists" })
        }

        const {
            username,
            name,
            password,
            hospital_name,
            designation,
            location,
            consultation
        } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        doctor = await Doctor.create({

            name: name,
            username: username,
            password: hashPassword,
            hospital_name: hospital_name,
            designation: designation,
            location: location,
            consultation: consultation,

        })
        const data = {
            doctor: {
                id: doctor.id
            }
        }

        var token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ token, doctor })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/login', async (req, res) => {

    let success = false;

    // check if email already exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let doctor = await Doctor.findOne({ username });
        if (!doctor) {
            return res.status(400).json({ success, errors: 'please try again' });

        }

        const data = {
            doctor: {
                id: doctor.id
            }
        }

        var token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ token, doctor })

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
});


// get all doctor

router.get('/getdoctor', async (req, res) => {
    doctorName = []
    try {

        const alldoctors = await Doctor.find();

        alldoctors.forEach((doctor, i) => {

            doctorName[i] = doctor.username

        })
        res.json(doctorName);

    } catch (error) {
        res.status(500).send('Erro occured')
    }
})

router.post('/forgot', async (req, res) => {

    try {

        const { username, newpassword, confirmpassword } = req.body;

        const user = await Doctor.find({ username: username })

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
                    <p>Date : ${date}</p>
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

            res.json('Updated successfully')

        }

    } catch (error) {
        res.status(500).send('Erro occured')
    }

})

module.exports = router