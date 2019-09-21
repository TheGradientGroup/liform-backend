const express = require('express')
const route = express()

/**
 * Fetches all the hospitals
 */
route.get('/hospitals/:id?', async (req, res) => {
    const hospitalId = req.params.hospitalId || req.query.hospitalId;
    if (typeof hospitalId !== 'undefined') {
        // Fetch hospital by ID
        return
    }
})

module.exports = app
