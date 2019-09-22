const express = require('express')
const router = express.Router()
const Papa = require('papaparse')
const HospitalInfo = require('../model/HospitalInfo')

router.post('/upload', (req, res) => {
    if (!req.body) {
        res.status(401).json({ error: 'no-params' })
    }
    if (!(req.body['csv'] && req.body['drgCol'] && req.body['costCol'] && req.body['name'] && req.body['url'] && req.body['location'])) {
        res.status(400).json({ error: 'not-all-params-specified' })
    }
    const bundle = {
        csv: req.body.csv,
        drgCol: req.body.drgCol,
        costCol: parseFloat(req.body.costCol)
    }

    var costTable = {}

    var csvParsed = Papa.parse(bundle.csv)
    csvParsed.data.forEach((val, idx) => {
        if (idx === 0) return
        costTable[val[bundle.drgCol]] = val[bundle.costCol]
    })
    var info = new HospitalInfo({
        name: req.body.name,
        loc: req.body.location,
        url: req.body.url,
        costTable
    })
    info.save()
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500).json({ error: 'db-write-error' }))
})

module.exports = router
