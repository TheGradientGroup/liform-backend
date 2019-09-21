const DRGCodeInfo = require('../model/DRGCodeInfo')

/**
 * Returns true if the given query is a DRG.
 */
function isDrg(query) {
    return /^\b[0-9]{3}$/.test(query)
}

async function lookupDrgInformation(drg) {
    try {
        const info = await DRGCodeInfo.lookupByCode(drg)
        return info
    } catch (e) {
        throw e
    }
}

async function findDrgFromQuery(query) {
    try {
        const results = await DRGCodeInfo.lookupByDesc(query)
        return results
    } catch (e) {
        throw e
    }
}

module.exports = {
    isDrg,
    lookupDrgInformation,
    findDrgFromQuery,
}