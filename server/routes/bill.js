const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Bill = require('../models/Bill');

router.post('/patient/bill',async (req, res) => {


    try {


        const {
            name,
            charges,
            
        } = req.body;

        let patient = await Patient.findOne({ name: name });

        console.log(patient.doctor_name);

        let doctor = await Doctor.findOne({ username: patient.doctor_name });

        if(patient)
        {
            if(doctor)
            {
                bill = await Bill.create({

                    name: name,
                    doctor_name: patient.doctor_name,
                    charges: charges,
                    consultation: doctor.consultation
        
                })
                patient.paid = true

                res.json(bill)

            }
            else{
                res.json("doctor not found")
            }
            
        }
        else{
            res.json("user not found")
        }

        

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})


module.exports = router

