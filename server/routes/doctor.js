const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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
            location
        } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        doctor = await Doctor.create({

            name: name,
            username: username,
            password: hashPassword,
            hospital_name: hospital_name,
            designation: designation,
            location: location

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

        const passwordcompare = await bcrypt.compare(password, doctor.password);
        if (!passwordcompare) {
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


module.exports = router