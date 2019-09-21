const express = require('express')
const route = express()

/**
 * Params: 
 *  - query (String): A search query or DRG code
 *  - loc (String): A city to lookup
 *  - hospitals (String|Array<String>): A list of hospital codes
 */
route.get('/search', async (req, res) => {

})


module.exports = route