const express = require('express')
const HospitalInfo = require('../model/HospitalInfo')

const route = express()

const handleProcedures = async (req, res) => {
    const hospitalId = req.params.hospitalId || req.query.hospitalId || req.body.hospitalId
    const drg = req.params.drg || req.query.drg || req.body.drg
    if (typeof hospitalId === 'undefined') {
        res.status(400).json({ error: 'missing-hospitalId' })
        return
    }
    if (typeof drg === 'undefined') {
        res.status(400).json({ error: 'missing-drg' })
        return
    }
    try {
        const averageCostForDrg = await HospitalInfo.getDrgCost(hospitalId, drg)
        // TODO: Replace with actual database
        console.log(averageCostForDrg)
        const cost = averageCostForDrg.costTable.get(`${drg}`)
        console.log(cost)
        res.status(200).json({ cost })
    } catch (e) {
        res.status(500).json({ error: 'internal' })
    }
}

/**
 * Fetches price data for procedures.
 * Params:
 *  - drg: Self explanatory
 *  - hospitalId: Self explanatory
 * 
 * @returns The average cost of the given procedure
 */
route.get('/:hospitalId?/:drg?', handleProcedures)

// route.post('/:hospitalId?/:drg?', handleProcedures)

module.exports = route
