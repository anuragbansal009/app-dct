const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Services = require('../models/Services');

router.post('/services/add', async (req, res) => {
    try {

        let services = await Services.findOne({ service: req.body.service });
        if (services) {
            return res.status(400).json({ error: "Service Already Exists" })
        }
        
        const {
            service,
            charges
        } = req.body;

        services = await Services.create({
            service: service,
            charges: charges,

        })
        res.json(services);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
});

router.get('/services/get', async (req, res) => {
    serviceList = []
    try {

        const allServices = await Services.find();

        allServices.forEach((services, i) => {
            serviceList[i] = {
                service: services.service,
                charges: services.charges
            }
        })
        res.json(serviceList);

    } catch (error) {
        res.status(500).send('Error occured')
    }
})

module.exports = router
