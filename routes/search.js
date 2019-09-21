const express = require('express')
const {
    isDrg,
    lookupDrgInformation,
    findDrgFromQuery
} = require('../domain/searchUtils')

const route = express()

/**
 * Params: 
 *  - query (String): A search query or DRG code
 * 
 * Returns:
 *  - A list of matching DRGCodeInfo, 0 if none exist
 */
route.get('/', async (req, res) => {
    const searchQuery = req.query.query || req.body.query
    if (typeof searchQuery === 'undefined') {
        res.status(200).json({ error: 'query-undefined' })
    }
    if (isDrg(searchQuery)) {
        console.log(searchQuery)
        try {
            const result = await lookupDrgInformation(searchQuery)
            res.status(400).json([ result ])
        } catch (e) {
            res.status(500).json({ error: 'internal' })
        }
    } else {
        try {
            console.log(searchQuery)
            const results = await findDrgFromQuery(searchQuery)
            res.status(400).json(results)
        } catch (e) {
            res.status(500).json({ error: 'internal' })
        }
    }
})


module.exports = route