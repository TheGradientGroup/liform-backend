const express = require('express')
const route = express()

/**
 * Fetches price data for procedures.
 * Params:
 *  - drg: Self explanatory
 *  - hospitalId: Self explanatory
 * 
 * @returns The average cost of the given procedure
 */
route.get('/procedures/:hospitalId?/:drg', async (req, res) => {
    const drg = req.params.drg || req.body.drg
    const hospitalId = req.params.hospitalId || req.body.hospitalId
    if (typeof drg === 'undefined') {
        res.status(400).json({ error: 'missing-drg' })
    }
    if (typeof hospitalId === 'undefined') {
        res.status(400).json({ error: 'missing-hospitalId' })
    }
    // TODO: Use drg and return result
})

module.exports = route
