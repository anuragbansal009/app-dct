const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const MongoClient = require('mongodb').MongoClient;
const Bill = require('../models/Bill');
const mongoURI = "mongodb://localhost:27017/hospital?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
var database


MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    database = res.db('hospital')
})

router.post('/patient/create', [

    body('name', 'Enter a valid user name').isLength({ min: 4 }),
    body('mobile', 'Enter a valid Mobile Number').isLength(10),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let patient = await Patient.findOne({ name: req.body.name });

        let doctor = await Doctor.findOne({ username: req.body.doctor_name });

        const {
            name,
            gender,
            age,
            mobile,
            bloodgroup,
            city,
            pin,
            doctor_name,
            slotdate,
            time,
        } = req.body;

        lastPatient = await database.collection('patients').findOne({}, { sort: { _id: -1 } });

        position = lastPatient.position + 1
        allocateid = doctor.allocateid.concat(String(position))

        patient = await Patient.create({

            name: name,
            gender: gender,
            age: age,
            mobile: mobile,
            email: email,
            bloodgroup: bloodgroup,
            city: city,
            pin: pin,
            doctor_name: doctor_name,
            allocateid: allocateid,
            position: position,
            slotdate: slotdate,
            time: time,
            status: false

        })

        res.json(patient)

    }
    catch (err) {
        res.status(500).send("Error occured");
    }

})

router.get('/patient/get', async (req, res) => {
    try {

        const patients = await Patient.find()

        res.send(patients)

    } catch (error) {

        res.status(500).send("Error occured");

    }
})

router.post('/patient/getid', async (req, res) => {
    try {

        const id = req.body

        const patient = await Patient.find({ _id: id })

        res.json(patient)

    } catch (error) {

        res.status(500).send("Error occured");

    }
})

router.post('/patient/updatepatient/:id', async (req, res) => {
    const {
        name,
        gender,
        age,
        mobile,
        bloodgroup,
        city,
        pin,
        doctor_name,
        slotdate,
        time,
    } = req.body;

    try {
        const newPatient = {};
        if (name) {
            newPatient.name = name;
        }
        if (gender) {
            newPatient.gender = gender;
        }
        if (age) {
            newPatient.age = age;
        }
        if (mobile) {
            newPatient.mobile = mobile;
        }
        if (bloodgroup) {
            newPatient.bloodgroup = bloodgroup;
        }
        if (slotdate) {
            newPatient.slotdate = slotdate;
        }
        if (bloodgroup) {
            newPatient.time = time;
        }

        if (city) {
            newPatient.city = city;
        }
        if (pin) {
            newPatient.pin = pin;
        }
        if (doctor_name) {
            newPatient.doctor_name = doctor_name;
        }

        let patient = await Patient.findById(req.params.id)

        patient = await Patient.findByIdAndUpdate(req.params.id, { $set: newPatient }, { new: true })
        res.json({ patient });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

module.exports = router

