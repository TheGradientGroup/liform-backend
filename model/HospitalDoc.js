let mongoose = require('mongoose')

const HospitalDoc = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hospitalID: {
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
        of: Number
    }
})

module.exports = HospitalDoc
