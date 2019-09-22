let mongoose = require('mongoose')

const drgHospitalInfo = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    hospitalId: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

const DRGHospitalInfo = mongoose.model('DRGHospitalInfo', drgHospitalInfo)

module.exports = DRGHospitalInfo
