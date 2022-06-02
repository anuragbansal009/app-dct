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
            allocateid,
            medicines,
            labcharges,
            nextvisit,
            advice,
            
        } = req.body;

        let patient = await Patient.findOne({ allocateid: allocateid });

        let doctor = await Doctor.findOne({ username: patient.doctor_name });

        if(patient)
        {
            if(doctor)
            {
                bill = await Bill.create({

                    name: name,
                    gender: patient.gender,
                    age: patient.age,
                    doctor_name: patient.doctor_name,
                    consultation: doctor.consultation,
                    mobile: patient.mobile,
                    allocateid: allocateid,
                    medicines: medicines,
                    labcharges: labcharges,
                    nextvisit: nextvisit,
                    advice: advice,
        
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

router.get('/patient/billsummary', async (req, res) =>{
    try {
        const bills = await Bill.find()

        res.json(bills)
        
    } catch (error) {
        res.status(500).send("Error occured");
    }
})



module.exports = router

