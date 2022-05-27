const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');

router.post('/patient/create', [

    body('name', 'Enter a valid user name').isLength({ min: 4 }),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let patient = await Patient.findOne({ name: req.body.name });

        const {
            name,
            gender,
            dob,
            age,
            mobile,
            email,
            bloodgroup,
            opd_number,
            city,
            pin,
            doctor_name,
        } = req.body;

        patient = await Patient.create({

            name: name,
            gender: gender,
            dob: dob,
            age: age,
            mobile: mobile,
            email: email,
            bloodgroup: bloodgroup,
            opd_number: opd_number,
            city: city,
            pin: pin,
            doctor_name: doctor_name,

        })

        res.json(patient)

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})


module.exports = router

