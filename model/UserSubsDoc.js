let mongoose = require('mongoose')

const userSubsSchema = new mongoose.Schema({
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

var UserSubsDoc = mongoose.model('user_sub', userSubsSchema)

module.exports = UserSubsDoc
