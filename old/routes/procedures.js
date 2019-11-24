const express = require('express')
const HospitalInfo = require('../model/HospitalInfo')
const totalAvgDRG = require('../domain/totalAvgDRG')

const router = express.Router()

const handleProcedures = async (req, res) => {
    const hospitalId = req.params.hospitalId || req.query.hospitalId || req.body.hospitalId
    const drg = req.params.drg || req.query.drg || req.body.drg
    if (typeof drg === 'undefined') {
        res.status(400).json({ error: 'missing-drg' })
        return
    }
    if (typeof hospitalId === 'undefined') {
        var average = { avg: await totalAvgDRG(drg) }
        console.log(average)
        res.json(average)
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
router.get('/:drg?/:hospitalId?', handleProcedures)

// route.post('/:hospitalId?/:drg?', handleProcedures)

module.exports = router
