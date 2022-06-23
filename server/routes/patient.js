const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const MongoClient = require('mongodb').MongoClient;
const Bill = require('../models/Bill');
const mongoURI = "mongodb://localhost:27017/hospital?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
var database
const ZonedDateTime = require("zoned-date-time");
const zoneData = require("iana-tz-data");


MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    database = res.db('hospital')
})




router.post('/patient/create', [

    body('name', 'Enter a valid user name').isLength({ min: 4 }),
    body('mobile', 'Enter a valid Mobile Number').isLength(10),

], async (req, res) => {

    let followupdate
    let recentdate
    let patientdate

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let patient = await Patient.find({ mobile: req.body.mobile, name: req.body.name, doctor_name: req.body.doctor_name });


        let doctor = await Doctor.findOne({ username: req.body.doctor_name });

        len = patient.length;


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
            followup,
        } = req.body;

        if (len !== 0) {

            recentdate = patient[len - 1].slotdate
            recentdate = new Date(`${recentdate}`).getTime();

            followupdate = recentdate + 86400000 * (doctor.followup)
            patientdate = new Date(`${slotdate}`).getTime();

        }


        lastPatient = await database.collection('patients').findOne({}, { sort: { _id: -1 } });

        position = lastPatient.position + 1
        allocateid = doctor.allocateid.concat(String(position))

        if (patientdate < followupdate) {
            patient = await Patient.create({

                name: name,
                gender: gender,
                age: age,
                mobile: mobile,
                bloodgroup: bloodgroup,
                city: city,
                pin: pin,
                doctor_name: doctor_name,
                allocateid: allocateid,
                position: position,
                slotdate: slotdate,
                time: time,
                status: "Unpaid",
                followup: true

            })

        }
        else {
            patient = await Patient.create({

                name: name,
                gender: gender,
                age: age,
                mobile: mobile,
                bloodgroup: bloodgroup,
                city: city,
                pin: pin,
                doctor_name: doctor_name,
                allocateid: allocateid,
                position: position,
                slotdate: slotdate,
                time: time,
                status: "Unpaid",
                followup: false

            })

        }



        res.json(patient)

    }
    catch (err) {
        console.error(err)
        res.status(500).send("Error occured");
    }

})

router.get('/patient/get', async (req, res) => {
    try {

        const patients = await Patient.find()

        res.send(patients)

    } catch (error) {

        console.log(error)
        res.status(500).send("Error occured");

    }
})


router.post('/patient/getMobile', async (req, res) => {
    try {
        const {mobile} = req.body
        const patient = await Patient.find({ mobile: mobile })
        res.send(patient)
    } catch (error) {
        console.log(error)
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

router.post('/patient/getallocateid', async (req, res) => {
    try {

        const { allocateid } = req.body

        const patient = await Patient.find({ allocateid: allocateid })

        if (patient) {
            res.json(patient)

        }
        else {
            res.json("Not found")
        }

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
        vitals,
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
        if (time) {
            newPatient.time = time;
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
        if (vitals) {
            newPatient.vitals = vitals;
        }

        // let patient = await Patient.findOneAndUpdate(req.params.id, { $set: newPatient }, { new: true })

        let patient = await Patient.findOneAndUpdate(
            {
                allocateid: req.params.id
            },
            {
                $set: newPatient
            }
        )

        let bill = await Bill.findOneAndUpdate(
            {
                allocateid: req.params.id
            },
            {
                $set: newPatient
            }
        )

        res.json(patient);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})

router.post('/patient/filter', async (req, res) => {

    let alldates = []

    let patients = []

    const { date } = req.body;

    let allpatients = await Patient.find()

    allpatients.forEach(async (patient, i) => {

        const t2 = new Date(`${patient.slotdate}`).getTime();
        if (t2 > (date - 86400000) && t2 < date) {
            alldates[i] = patient.slotdate
        }

    })

    // console.log(alldates.length)

    if (alldates.length == 0) {
        res.json([])
    }
    else {
        for (var i = 0; i < alldates.length; i++) {
            // console.log(alldates[i])
            if (alldates[i] !== undefined) {
                // console.log(alldates[i])
                patients = await Patient.find({ slotdate: alldates[i] })
                res.json(patients)
                break
            }

        }
    }

    // 1655251200000


})

router.post('/patient/getmobile', async (req, res) => {

    // lastPatient = await database.collection('patients').findOne({}, { sort: { _id: -1 } });
    let patients = await Patient.find(
        {
            "$or":[
                {name: {$regex: req.body.name}}
            ]
        }
    )

    res.json(patients)


})


module.exports = router

