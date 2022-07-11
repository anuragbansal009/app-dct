const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Labtest = require('../models/Labtest');
const Patient = require('../models/Patient');

router.post('/labtest/add', async (req, res) => {
    try {
        
        const {
            labtest,
            charges,
            doctor_name,
        } = req.body;

        let labtests = await Labtest.find({labtest: labtest})
        if(labtests.length !== 0)
        {
            res.status(400).send('labtest already exists')
        }

        else{

            labtests = await Labtest.create({
                labtest: labtest,
                charges: charges,
                doctor_name: doctor_name
            })
            res.json(labtests);

        }

        
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

router.post('/labtest/getdoc', async (req, res) => {
    labtestList = []
    try {
        console.log(req)
        const allLabtests = await Labtest.find({doctor_name: req.body.doctor_name});

        allLabtests.forEach((labtest, i) => {
            labtestList[i] = {
                labtest: labtest.labtest,
                charges: labtest.charges,
                doctor_name: labtest.doctor_name
            }
        })
        res.json(labtestList);

    } catch (error) {
        res.status(500).send('Error occured')
    }
})

router.post('/labtest/getonelabtest', async (req, res) => {
    try {

        const labtest = await Labtest.find({doctor_name: req.body.doctor_name, labtest: req.body.labtest})
        res.json(labtest)
        
    } catch (error) {
        res.status(500).send('Error occured')
    }
})

router.post('/labtest/updatelabtest/:id', async (req, res) => {
    const {
        labtest,
        charges,
        doctor_name,
    } = req.body;

    try {
        const newLabtest = {};
        if (labtest) {
            newLabtest.labtest = labtest;
        }
        if (charges) {
            newLabtest.charges = charges;
        }
        if (doctor_name) {
            newLabtest.doctor_name = doctor_name;
        }

        let Updatedlabtest = await Labtest.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: newLabtest
            },
            {
                new: true
            }
        )

        res.json(Updatedlabtest);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/labtest/delete', async (req, res) => {

    try {
        let labtest = await Labtest.find({labtest: req.body.labtest, doctor_name: req.body.doctor_name})

        console.log(labtest)
        if (labtest.length == 0) {
            return res.status(401).send("labtest Not found")
        }

        labtest = await Labtest.findOneAndDelete({labtest: req.body.labtest, doctor_name: req.body.doctor_name})
        res.json({ "Deleted": "labtest has been deleted successfully", labtest });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
    
})


module.exports = router
