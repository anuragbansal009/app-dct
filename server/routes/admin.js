const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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
            pid,
            did
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
            pid: pid,
            did: did

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

module.exports = router