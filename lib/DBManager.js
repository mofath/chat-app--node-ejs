const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/chat-app";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

let instance = null

class DBManager {
  constructor() {
    this._conn = null
  }

  static getInstance() {
    if (!instance) {
      instance = new DBManager()
    }
    return instance
  }

  async CONNECT() {
    try {
      this._conn = await mongoose.connect(DB_URL, options)
      console.log('Succcessfully connected to mongodb')
    } catch (error) {
      console.log(`DB Connection Error: ${error.message}`)
    }
  }

  get conn() {
    return this._conn
  }
}

module.exports = DBManager;