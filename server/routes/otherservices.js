const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Otherservices = require('../models/Otherservices');
const Patient = require('../models/Patient');

router.post('/otherservices/add', async (req, res) => {
    try {
        
        const {
            service,
            charges,
            doctor_name,
            gst,
        } = req.body;

        let services = await Otherservices.find({service: service, doctor_name: doctor_name})

        if(services.length !== 0)
        {
            res.status(400).send('service already exists')
        }
        else{

            services = await Otherservices.create({
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

router.post('/otherservices/get', async (req, res) => {
    serviceList = []
    try {

        const patient = await Patient.find({_id: req.body.id});

        const allServices = await Otherservices.find({doctor_name: patient[0].doctor_name});

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

router.post('/otherservices/getdoc', async (req, res) => {
    serviceList = []
    try {
        const allServices = await Otherservices.find({doctor_name: req.body.doctor_name});

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

router.post('/otherservices/getoneservice', async (req, res) => {
    try {

        const service = await Otherservices.find({doctor_name: req.body.doctor_name, service: req.body.service})
        res.json(service)
        
    } catch (error) {
        res.status(500).send('Error occured')
    }
})

router.post('/otherservices/updateservice/:id', async (req, res) => {
    const {
        service,
        gst,
        charges,
        doctor_name,
    } = req.body;

    try {
        const newService = {};
        if (service) {
            newService.service = service;
        }
        if (gst) {
            newService.gst = gst;
        }
        if (charges) {
            newService.charges = charges;
        }
        if (doctor_name) {
            newService.doctor_name = doctor_name;
        }

        let Updatedservice = await Otherservices.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: newService
            },
            {
                new: true
            }
        )

        res.json(Updatedservice);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/otherservices/delete', async (req, res) => {

    try {
        let service = await Otherservices.find({service: req.body.service, doctor_name: req.body.doctor_name})

        if (service.length == 0) {
            return res.status(401).send("Service Not found")
        }

        service = await Otherservices.findOneAndDelete({service: req.body.service, doctor_name: req.body.doctor_name})
        res.json({ "Deleted": "service has been deleted successfully", service });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
    
})


module.exports = router