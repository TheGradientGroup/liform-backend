let mongoose = require('mongoose')

const UserSubsDoc = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    hospitalID: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})

module.exports = UserSubsDoc
