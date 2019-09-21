let mongoose = require('mongoose')

const hospitalInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    loc: {
        type: String,
        required: false
    },
    costTable: {
        type: Map,
        of: Number
    },
    url: {
        type: String,
        required: true
    },
    userCostTable: {
        type: Map,
        of: Number,
        required: false
    }
})

/**
 * Returns the cost of a DRG for a given hospital.
 */
hospitalInfoSchema.statics.getDrgCost = function (hospitalId, drg) {
    const hospital = this.findOne({ id: hospitalId })
    return hospital
}

const HospitalInfo = mongoose.model('hospitals', hospitalInfoSchema)

module.exports = HospitalInfo
