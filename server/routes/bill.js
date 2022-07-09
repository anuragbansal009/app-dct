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
            labtests,
            discount,
            followup,
            totalDiscount,
            payment,
            paymentmode,
            subtotal
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
            if (labtests) {
                newBill.labtests = labtests;
            }
            if (discount.length !== 0) {
                newBill.discount = discount;
            }
            if (payment) {
                newBill.payment = payment;
            }
            if (paymentmode) {
                newBill.paymentmode = paymentmode;
            }
            if (subtotal) {
                newBill.subtotal = subtotal;
            }
            if (totalDiscount) {
                newBill.totalDiscount = totalDiscount;
            }
            if (followup) {
                newBill.followup = followup;
            }

            let bill = await Bill.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: newBill
                },
                {
                    new: true,
                }

            )

            if (bill.payment == 0) {
                findpatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Unpaid",
                    }
                )
            }

            let totalAmount = await Bill.findOne({ _id: req.params.id })

            if (!totalAmount.totalpaid) {
                totalAmount.totalpaid = 0
            }

            letfindpatient = await Bill.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    totalpaid: totalAmount.totalpaid + payment,
                }
            )

            if (bill.payment < bill.subtotal && bill.payment !== 0) {
                findpatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Pending",
                    }
                )
            }

            if (bill.payment == bill.subtotal) {

                findpatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Paid",
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
                        mobile: patient.mobile,
                        allocateid: patient.allocateid,
                        labcharges: labcharges,
                        labtests: labtests,
                        discount: discount,
                        totalDiscount: totalDiscount,
                        followup: followup,
                        payment: payment,
                        paymentmode: paymentmode,
                        subtotal: subtotal,
                        _id: req.params.id

                    })

                    if (bill.payment == 0) {
                        findpatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                status: "Unpaid",
                            }
                        )
                    }

                    let totalAmount = await Bill.findOne({ _id: req.params.id })

                    if (!totalAmount.totalpaid) {
                        totalAmount.totalpaid = 0
                    }
        
                    letfindpatient = await Bill.findOneAndUpdate(
                        {
                            _id: req.params.id
                        },
                        {
                            totalpaid: totalAmount.totalpaid + payment,
                        }
                    )

                    if (bill.payment < bill.subtotal && bill.payment !== 0) {
                        findpatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                status: "Pending",
                            }
                        )
                    }

                    if (bill.payment == bill.subtotal) {

                        findpatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                status: "Paid",
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

router.post('/patient/getbill/:id', async (req, res) => {
    try {
        let patient = await Patient.findById(req.params.id);
        res.json(patient)
    }
    catch (err) {
        console.log(err.message);
    }
})

router.post('/patient/patientbills', async (req, res) => {
    try {
        let bill = await Bill.find({ name: req.body.name, mobile: req.body.mobile });
        res.json(bill)
    }
    catch (err) {
        console.log(err.message);
    }
})

// router.post('/patient/refund/:id', async (req, res) => {
//     try {
//         let bill = await Bill.find({allocateid: req.params.id});

//         await Bill.updateOne({ allocateid: req.params.id }, {
//             $pullAll: {
//                 discount: [{service: req.body.service}],
//             },
//         });

//         res.json(bill)
//     }
//     catch(err) {
//         console.log(err.message);
//     }
// })



module.exports = router

