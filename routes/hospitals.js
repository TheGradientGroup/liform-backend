const express = require('express')
const router = express.Router()

const handleHospitalRequest = async (req, res) => {
    const hospitalId = req.params.id || req.query.hospitalId
    if (typeof hospitalId !== 'undefined') {
        // Fetch hospital by ID
        return
    }
} 

/**
 * Fetches all the hospitals.
 * 
 * If a given id is provided, data for that hospital is fetched.
 */
router.get('/hospitals/:id?', handleHospitalRequest)

router.post('/hospitals/:id?', handleHospitalRequest)

module.exports = app
