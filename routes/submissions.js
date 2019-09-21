const express = require('express')
const app = express.Router()
const UserSubDoc = require('../model/UserSubsDoc')

app.post('/submissions/upload', async (req, res) => {
    if (!req.body) {
        res.status(401).json({ error: 'no-params' })
        return
    }
    if (!(req.body['drgCode'] && req.body['hospitalId'] && req.body['cost'])) {
        res.status(400).json({ error: 'not-all-params-specified' })
    }
    const uploadData = {
        drgCode: req.body.drgCode,
        hospitalId: req.body.hospitalId,
        cost: req.body.cost,
    }
    const userDoc = new UserSubDoc(uploadData)
    try {
        await userDoc.save()
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ error: 'db-write-error' })
    }
})

module.exports = app