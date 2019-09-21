let mongoose = require('mongoose')

const hospitalDocSchema = new mongoose.Schema({
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

var HospitalDoc = mongoose.model('hospital', hospitalDocSchema)

module.exports = HospitalDoc
