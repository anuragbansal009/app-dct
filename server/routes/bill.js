const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Bill = require('../models/Bill');

router.post('/patient/bill/:id', async (req, res) => {


    try {


        const {
            name,
            gender,
            age,
            doctor_name,
            labcharges,
            advice,

        } = req.body;

        let bill

        let patient = await Patient.findById(req.params.id);

        let doctor = await Doctor.findOne({ username: patient.doctor_name });

        let patientbill = await Bill.findOne({ allocateid: patient.allocateid });

        if (patientbill) {
            const newBill = {};

            if (name) {
                newBill.name = name;
            }
            if (gender) {
                newBill.gender = gender;
            }
            if (age) {
                newBill.age = age;
            }
            if (doctor_name) {
                newBill.doctor_name = doctor_name;
            }
            if (labcharges) {
                newBill.labcharges = labcharges;
            }
            if (advice) {
                newBill.advice = advice;
            }

            let bill = await Bill.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: newBill
                }
            )

            if (newBill.labcharges == null) {
                updatepatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Partial"
                    }
                )

            }
            if(newBill.labcharges !== null) {

                updatepatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {

                        status: "Paid"
                    }
                )

            }

            res.json(bill)

        }


        else {

            if (patient) {
                if (doctor) {
                    bill = await Bill.create({

                        name: patient.name,
                        gender: patient.gender,
                        age: patient.age,
                        doctor_name: patient.doctor_name,
                        consultation: doctor.consultation,
                        mobile: patient.mobile,
                        allocateid: patient.allocateid,
                        labcharges: labcharges,
                        advice: advice,
                        _id: patient._id

                    })
                    if (bill.labcharges == null) {
                        updatepatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {

                                status: "Partial"
                            }
                        )

                    }
                    else {

                        updatepatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {

                                status: "Paid"
                            }
                        )

                    }

                    res.json(bill)

                }
                else {
                    res.json("doctor not found")
                }

            }
            else {
                res.json("user not found")
            }

        }


    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/bill/getid', async (req, res) => {
    try {

        const id = req.body

        const bill = await Bill.find({ _id: id })

        if (bill) {
            res.json(bill)

        }
        else {
            res.json("Not found")
        }



    } catch (error) {

        res.status(500).send("Error occured");

    }
})

router.get('/patient/billsummary', async (req, res) => {
    try {
        const bills = await Bill.find()

        res.json(bills)

    } catch (error) {
        res.status(500).send("Error occured");
    }
})



module.exports = router

