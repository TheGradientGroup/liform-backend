const express = require('express')
const route = express()

const handleHospitalRequest = async (req, res) => {
    const hospitalId = req.params.id || req.query.hospitalId ||;
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
route.get('/hospitals/:id?', handleHospitalRequest)

route.post('/hospitals/:id?', handleHospitalRequest)

module.exports = app
