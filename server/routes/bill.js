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
                if (patientbill.payment) {
                    newBill.payment = payment + patientbill.payment;
                }
                else {
                    newBill.payment = payment;
                }
            }
            if (paymentmode) {
                newBill.paymentmode = paymentmode;
            }
            if (subtotal) {

                newBill.subtotal = subtotal;

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
                        discount: discount
                    }
                )
            }

            if (bill.payment < bill.subtotal - bill.totalDiscount && bill.payment !== 0) {
                findpatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Pending",
                        discount: discount
                    }
                )
            }

            if (bill.payment == bill.subtotal - bill.totalDiscount) {

                findpatient = await Patient.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        status: "Paid",
                        discount: discount
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
                        billDiscount: 0,
                        totalDiscount: 0,
                        totalrefund: 0,
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
                                discount: discount
                            }
                        )
                    }

                    if (bill.payment < bill.subtotal && bill.payment !== 0) {
                        findpatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                status: "Pending",
                                discount: discount
                            }
                        )
                    }

                    if (bill.payment == bill.subtotal - bill.totalDiscount) {

                        findpatient = await Patient.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                status: "Paid",
                                discount: discount
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

router.post('/patient/billsummary', async (req, res) => {
    try {
        const bills = await Bill.find({mobile: req.body.mobile, name: req.body.name})

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

// router.post('/patient/patientbills', async (req, res) => {
//     try {
//         let bill = await Bill.find({ name: req.body.name, mobile: req.body.mobile });
//         res.json(bill)
//     }
//     catch (err) {
//         console.log(err.message);
//     }
// })

router.post('/patient/refund', async (req, res) => {
    try {
        let charge
        let bill = await Bill.find({ allocateid: req.body.allocateid });

        charge = req.body.charge - (req.body.charge * (req.body.discount / 100))

        if (bill[0].payment > req.body.charge) {
            if (req.body.reason) {
                if (bill) {
                    bill = await Bill.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid,
                        },
                        {
                            payment: bill[0].payment - charge,
                            subtotal: bill[0].subtotal - charge,
                            totalrefund: bill[0].totalrefund + charge
                        },
                        {
                            new: true
                        }
                    )
                }

                bill = await Bill.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid
                    },
                    {
                        $pull: {
                            discount: { service: req.body.service }
                        },
                        $push: {
                            refundarr: { service: req.body.service, refund: charge }
                        },
                    },
                    {
                        new: true,
                    }
                );

                if (bill.payment == 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Unpaid",
                        }
                    )
                }

                let patient = await Patient.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid
                    },
                    {
                        $pull: {
                            discount: { service: req.body.service }
                        },
                    },
                    {
                        new: true,
                    }
                );
                res.json(bill)
            }
            else {
                return res.status(401).send("Reason Box is Empty")
            }
        }
        else {
            if (req.body.reason) {
                if (bill[0].subtotal - charge < 0) {
                    bill = await Bill.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid,
                        },
                        {
                            payment: 0,
                            subtotal: 0,
                            totalrefund: bill[0].totalrefund + bill[0].payment
                        },
                        {
                            new: true
                        }
                    )
                }
                else {
                    bill = await Bill.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid,
                        },
                        {
                            payment: 0,
                            subtotal: bill[0].subtotal - charge,
                            totalrefund: bill[0].totalrefund + bill[0].payment
                        },
                        {
                            new: true
                        }
                    )
                }

                bill = await Bill.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid
                    },
                    {
                        $pull: {
                            discount: { service: req.body.service }
                        },
                        $push: {
                            refundarr: { service: req.body.service, refund: charge }
                        },
                    },
                    {
                        new: true,
                    }
                );

                if (bill.payment == 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Unpaid",
                        }
                    )
                }

                let patient = await Patient.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid
                    },
                    {
                        $pull: {
                            discount: { service: req.body.service }
                        },
                    },
                    {
                        new: true,
                    }
                );
                res.json(bill)
            }
            else {
                return res.status(401).send("Reason Box is Empty")
            }

        }






    }
    catch (err) {
        console.log(err.message);
    }
})

router.post('/bill/refund', async (req, res) => {
    try {

        let bill = await Bill.find({ allocateid: req.body.allocateid })

        if (req.body.reason) {

            if (bill[0].payment >= req.body.refund) {
                bill = await Bill.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid,
                    },
                    {
                        payment: bill[0].payment - req.body.refund,
                        totalrefund: bill[0].totalrefund + req.body.refund
                    },
                    {
                        new: true,
                    }
                )

                if (bill.payment == 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Unpaid",
                        }
                    )
                }

                if (bill.payment < bill.subtotal && bill.payment !== 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Pending",
                        }
                    )
                }

                if (bill.payment == bill.subtotal) {

                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Paid",
                        }
                    )

                }
                res.send(bill)

            }
            else {
                return res.status(401).send("Refund should be less than Paid amount")
            }


        }
        else {
            return res.status(401).send("Reason Box is Empty")
        }

    } catch (error) {
        console.log(error.message)
    }
})

router.post('/bill/discount', async (req, res) => {
    try {

        let bill = await Bill.find({ allocateid: req.body.allocateid })

        if (req.body.reason) {

            if (bill[0].payment >= req.body.discount) {
                bill = await Bill.findOneAndUpdate(
                    {
                        allocateid: req.body.allocateid,
                    },
                    {
                        payment: bill[0].payment - req.body.discount,
                        subtotal: bill[0].subtotal - req.body.discount,
                        billDiscount: bill[0].billDiscount + req.body.discount,
                    },
                    {
                        new: true,
                    }
                )

                if (bill.payment == 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Unpaid",
                        }
                    )
                }

                if (bill.payment < bill.subtotal && bill.payment !== 0) {
                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Pending",
                        }
                    )
                }

                if (bill.payment == bill.subtotal) {

                    findpatient = await Patient.findOneAndUpdate(
                        {
                            allocateid: req.body.allocateid
                        },
                        {
                            status: "Paid",
                        }
                    )

                }
                res.send(bill)

            }
            else {
                return res.status(401).send("Discount should be less than Paid amount")
            }
        }
        else {
            return res.status(401).send("Reason Box is Empty")
        }

    } catch (error) {
        console.log(error.message)
    }
})

// router.post('/bill/service/discount', async (req, res) => {

//     let bill = await Bill.find({ _id: req.body.id })

//     if (bill.length !== 0) {
//         if (bill[0].payment == bill[0].subtotal) {
//             newsubtotal = bill[0].subtotal - req.body.charge * (req.body.discount / 100)
//             let newbill = await Bill.findOneAndUpdate(
//                 {
//                     _id: req.body.id, "discount.service": req.body.service
//                 },
//                 {
//                     $set: {
//                         "discount.$.discount": req.body.discount,
//                         payment: bill[0].payment - req.body.charge * (req.body.discount / 100),
//                         subtotal: bill[0].subtotal - req.body.charge * (req.body.discount / 100)
//                     },
//                 },
//                 {
//                     new: true,
//                 }

//             )
//             res.json(newbill)
//         }
//         if (bill[0].payment < bill[0].subtotal) {
//             newsubtotal = bill[0].subtotal - req.body.charge * (req.body.discount / 100)
//             if (newsubtotal <= bill[0].payment) {
//                 if (newsubtotal < 0) {
//                     newbill = await Bill.findOneAndUpdate(
//                         {
//                             _id: req.body.id, "discount.service": req.body.service
//                         },
//                         {
//                             $set: {
//                                 "discount.$.discount": req.body.discount,
//                                 payment: -newsubtotal,
//                                 subtotal: -newsubtotal
//                             },
//                         },
//                         {
//                             new: true,
//                         }

//                     )

//                 }
//                 else {
//                     newbill = await Bill.findOneAndUpdate(
//                         {
//                             _id: req.body.id, "discount.service": req.body.service
//                         },
//                         {
//                             $set: {
//                                 "discount.$.discount": req.body.discount,
//                                 payment: newsubtotal,
//                                 subtotal: newsubtotal
//                             },
//                         },
//                         {
//                             new: true,
//                         }

//                     )

//                 }


//                 findpatient = await Patient.findOneAndUpdate(
//                     {
//                         _id: req.body.id
//                     },
//                     {
//                         status: "Paid",
//                     }
//                 )
//                 res.json(newbill)

//             }

//             if (newsubtotal > bill[0].payment) {
//                 let newbill = await Bill.findOneAndUpdate(
//                     {
//                         _id: req.body.id, "discount.service": req.body.service
//                     },
//                     {
//                         $set: {
//                             "discount.$.discount": req.body.discount,
//                             subtotal: newsubtotal
//                         },
//                     },
//                     {
//                         new: true,
//                     }

//                 )

//                 res.json(newbill)

//             }

//         }
//     }
//     else {
//         return res.status(401).send("Create a bill first")
//     }

// })

router.post('/bill/service/discount', async (req, res) => {

    let bill = await Bill.find({ _id: req.body.id })

    if (bill.length !== 0) {

        let newbill = await Bill.findOneAndUpdate(
            {
                _id: req.body.id, "discount.service": req.body.service
            },
            {
                $set: {
                    "discount.$.discount": req.body.discount,
                },
            },
            {
                new: true,
            }

        )
        res.json(newbill)

    }
    else {
        return res.status(401).send("Create a bill first")
    }

})




module.exports = router

