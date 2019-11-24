const HospitalInfo = require('../model/HospitalInfo')

module.exports = function (drg) {
    return new Promise((resolve, reject) => {
        HospitalInfo.find({}, 'costTable', (err, docs) => {
            if (err) reject('db-error')
            var costs = []
            for (var i = 0; i < docs.length; i++) { 
                if (docs[i].costTable.get(drg)) {
                    costs.push(docs[i].costTable.get(drg))
                }
            }
            var avg = costs.length === 0 ? 0 : costs.reduce((acc, cur) => acc += cur) / costs.length
            resolve(avg)
        })
    })
    
}