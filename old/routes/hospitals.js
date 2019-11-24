const express = require('express')
const router = express.Router()
const HospitalInfo = require('../model/HospitalInfo')

const handleHospitalRequest = async (req, res) => {
    const hospitalId = req.params.id || req.query.hospitalId
    if (typeof hospitalId !== 'undefined') {
        HospitalInfo.findById(hospitalId, (err, doc) => {
            if (err) { 
                res.status(500).json({error: 'db-error'})
            }
            res.json(doc)
        })
    } else {
        var docArr = []
        HospitalInfo.find({}, (err, docs) => {
            if (err) { 
                res.status(500).json({error: 'db-error'})
            }
            docArr = docs.map(doc => { return { _id: doc._id, name: doc.name } })
            res.json(docArr)
        })
    }
} 

/**
 * Fetches all the hospitals.
 * 
 * If a given id is provided, data for that hospital is fetched.
 */
router.get('/:id?', handleHospitalRequest)

router.post('/:id?', handleHospitalRequest)

module.exports = router
