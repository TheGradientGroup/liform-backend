let mongoose = require('mongoose')

/**
 * A mapping between a DRG and a human readable
 */
const drgCodeInfoSchema = new mongoose.Schema({
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

drgCodeInfoSchema.statics.lookupByCode = function (drgCode) {
    return this.findOne({ code: drgCode })
}

drgCodeInfoSchema.statics.lookupByDesc = function (desc) {
    // TODO: Actually do lookup by description
    return this.find({ desc: desc })
}

const DRGCodeInfo = mongoose.model('code', drgCodeInfoSchema)

module.exports = DRGCodeInfo
