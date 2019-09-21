var express = require('express')
var bodyParser = require('body-parser')
var app = express.Router()
var CodeDoc = require('../model/CodeDoc')

app.post('/code/create', (req, res) => { 
    if (!req.body) {
        res.status(401).json({ error: 'no-params' })
        return
    }
    var bodyKeys = Object.keys(req.body)
    if (bodyKeys.includes('code') && bodyKeys.includes('desc')) {
        CodeDoc.find({ code: req.body.code }, (err, docs) => { 
            if (err) { 
                res.status(401).json({ error: 'db-err' })
            }
            if (docs.length > 0) { 
                res.status(401).json({ error: 'code-already-exists' })
            }
            var docData = {
                code: req.body.code,
                desc: req.body.desc
            }
            if (bodyKeys.includes('desc_human')) { 
                docData.desc_human = req.body.desc_human
            }
            var doc = new CodeDoc(docData)
            doc.save().then(
                () => { res.status(200).json({ success: true }) }
            ).catch(
                () => { res.status(401).json({ error: 'db-write-error' }) } 
            )
        })
    } else { 
        res.status(401).json({ error: 'not-all-params-specified' })
        return
    }
})

app.post('/code/update', (req, res) => { 
    if (!req.body) {
        res.status(401).json({ error: 'no-params' })
        return
    }
    var bodyKeys = Object.keys(req.body)
    if (bodyKeys.includes('code') || bodyKeys.includes('desc') || bodyKeys.includes('desc_human')) {
        CodeDoc.find({ code: req.body.code }, (err, docs) => { 
            if (err) { 
                res.status(401).json({ error: 'db-err' })
            }
            if (docs.length === 0) {
                res.status(401).json({ error: 'code-doesnt-exist' })
            } else if (docs.length > 1) { 
                console.error('ERROR: inconsistent DB state! duplicate codes exist')
                res.status(401).json({ error: 'inconsistent-db-code-dupe' })
            }
            var curDoc = docs[0]
            
            if (bodyKeys.includes('code')) { 
                curDoc.code = req.body.code
            }
            if (bodyKeys.includes('desc')) { 
                curDoc.desc = req.body.desc
            }
            if (bodyKeys.includes('desc_human')) { 
                curDoc.desc_human = req.body.desc_human
            }

            curDoc.save().then(
                res.status(200).json({ success: true }).end()
            ).catch(
                res.status(401).json({error: 'db-write-error'}).end()
            )
        })
    } else { 
        res.status(401).json({ error: 'not-all-params-specified' })
        return
    }
})

module.exports = app
