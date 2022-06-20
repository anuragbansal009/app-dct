const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Services = require('../models/Services');
const Patient = require('../models/Patient');

router.post('/services/add', async (req, res) => {
    try {
        
        const {
            service,
            charges,
            doctor_name,
            gst,
        } = req.body;

        let services = await Services.find({service: service})
        console.log(services.length)
        if(services.length !== 0)
        {
            res.status(400).send('service already exists')
        }
        else{

            services = await Services.create({
                service: service,
                charges: charges,
                doctor_name: doctor_name,
                gst: gst
            })
            res.json(services);
            
        }

        
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
});

router.post('/services/get', async (req, res) => {
    serviceList = []
    try {

        const patient = await Patient.find({_id: req.body.id});

        const allServices = await Services.find({doctor_name: patient[0].doctor_name});

        allServices.forEach((services, i) => {
            serviceList[i] = {
                service: services.service,
                charges: services.charges,
                doctor_name: services.doctor_name
            }
        })
        res.json(serviceList);

    } catch (error) {
        res.status(500).send('Error occured')
    }
})

module.exports = router
