const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Labtest = require('../models/Labtest');
const Patient = require('../models/Patient');

router.post('/labtest/add', async (req, res) => {
    try {

        let labtests = await Labtest.findOne({ labtest: req.body.labtest });
        if (labtests) {
            return res.status(400).json({ error: "labtest Already Exists" })
        }
        
        const {
            labtest,
            charges,
            doctor_name,
        } = req.body;

        labtests = await Labtest.create({
            labtest: labtest,
            charges: charges,
            doctor_name: doctor_name
        })
        res.json(labtests);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
});

router.post('/labtest/get', async (req, res) => {
    LabList = []
    try {

        const patient = await Patient.find({_id: req.body.id});
        const allLabtests = await Labtest.find({doctor_name: patient[0].doctor_name});

        allLabtests.forEach((labtests, i) => {
            LabList[i] = {
                labtest: labtests.labtest,
                charges: labtests.charges,
                doctor_name: labtests.doctor_name
            }
        })
        res.json(LabList);

    } catch (error) {
        res.status(500).send('Error occured')
    }
})

module.exports = router
