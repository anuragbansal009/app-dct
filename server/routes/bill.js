const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Bill = require('../models/Bill');

router.post('/patient/bill', async (req, res) => {


    try {


        const {
            name,
            allocateid,
            medicines,
            labcharges,
            nextvisit,
            advice,

        } = req.body;

        let bill

        let patient = await Patient.findOne({ allocateid: allocateid });

        let doctor = await Doctor.findOne({ username: patient.doctor_name });

        let patientbill = await Bill.findOne({ allocateid: allocateid });

        if (patientbill) {
            bill = await Bill.findOneAndUpdate(
                {
                    allocateid: allocateid
                },
                {
                    medicines: medicines,
                    labcharges: labcharges,
                    nextvisit: nextvisit,
                    advice: advice,
                }
            )

            if (labcharges == null) {
                updatepatient = await Patient.findOneAndUpdate(
                    {
                        allocateid: allocateid
                    },
                    {

                        status: "Consultaion Charge"
                    }
                )

            }
            else {

                updatepatient = await Patient.findOneAndUpdate(
                    {
                        allocateid: allocateid
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
                        _id: patient._id

                    })
                    if (labcharges == null) {
                        updatepatient = await Patient.findOneAndUpdate(
                            {
                                allocateid: allocateid
                            },
                            {

                                status: "Partial"
                            }
                        )

                    }
                    else {

                        updatepatient = await Patient.findOneAndUpdate(
                            {
                                allocateid: allocateid
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

        if(bill)
        {
            res.json(bill)

        }
        else{
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

