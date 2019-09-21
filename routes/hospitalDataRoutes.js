const express = require('express');
const app = express.Router()
const HospitalDoc = require('../model/HospitalInfo')

app.post('/submission/upload', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: 'no-params' })
        return
    }
    if (!(req.body['drgCode'] && req.body['hospitalId'] && req.body['cost'])) {
        res.status(400).json({ error: 'not-all-params-specified' })
    }
    const uploadData = {
        name: req.body.name,
        hospitalId: req.body.hospitalId,
        loc: req.body.name,
        url: req.body.url,
    }
    if (req.body['costTable']) {
        uploadData.costTable = req.body.costTable
    }
    if (req.body['loc']) {
        uploadData.loc = req.body.loc
    }
    if (req.body['userCostTable']) {
        uploadData.userCostTable =  req.body.userCostTable
    }
    const hospitalDoc = new HospitalDoc(uploadData)
    try {
        await hospitalDoc.save()
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ error: 'db-write-error' })
    }
})

module.exports = app