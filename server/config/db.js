const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB
