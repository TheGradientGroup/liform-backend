const express = require('express')
const {
    isDrg,
    lookupDrgInformation,
    findDrgFromQuery
} = require('../domain/searchUtils')

const route = express()

const handleSearchRequest = async (req, res) => {
    const searchQuery = req.params.query || req.query.query || req.body.query
    if (typeof searchQuery === 'undefined') {
        res.status(200).json({ error: 'query-undefined' })
        return
    }
    if (isDrg(searchQuery)) {
        try {
            const result = await lookupDrgInformation(searchQuery)
            res.status(200).json([ result ])
        } catch (e) {
            res.status(500).json({ error: 'internal' })
        }
    } else {
        try {
            const results = await findDrgFromQuery(searchQuery)
            res.status(200).json(results)
        } catch (e) {
            res.status(500).json({ error: 'internal' })
        }
    }
}

/**
 * Params: 
 *  - query (String): A search query or DRG code
 * 
 * Returns:
 *  - A list of matching DRGCodeInfo, 0 if none exist
 */
route.get('/:query?', handleSearchRequest)

route.post('/:query?', handleSearchRequest)

module.exports = route