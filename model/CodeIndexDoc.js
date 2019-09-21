let mongoose = require('mongoose')

const CodeIndexDoc = new mongoose.Schema({
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

module.exports = CodeIndexDoc
