const express = require('express')
const router = express.Router()
const UserSubDoc = require('../model/UserSubsDoc')

router.post('/upload', async (req, res) => {
    if (!req.body) {
        res.status(401).json({ error: 'no-params' })
        return
    }
    if (!(req.body['drg'] && req.body['hospitalID'] && req.body['cost'])) {
        res.status(400).json({ error: 'not-all-params-specified' })
    }
    const uploadData = {
        code: req.body.drg,
        hospitalID: req.body.hospitalID,
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

module.exports = router