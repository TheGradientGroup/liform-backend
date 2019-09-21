let mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    desc_human: {
        type: String,
        required: false
    }
})

var CodeDoc = mongoose.model('code', codeSchema)

module.exports = CodeDoc
