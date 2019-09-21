let mongoose = require('mongoose')

require('dotenv').config()

const CONNECT_STRING = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}/liform?retryWrites=true&w=majority`

class Database {
	constructor() {
		this._connect()
	}
	_connect() {
		mongoose.connect(CONNECT_STRING, { useNewUrlParser: true, autoIndex: false })
			.then(() => {
				console.log('Database connection successful')
			})
			.catch(err => {
				console.error('Database connection error')
			})
	}
}
module.exports = new Database()