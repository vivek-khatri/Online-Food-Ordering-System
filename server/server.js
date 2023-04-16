const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const { readdirSync } = require('fs')

dotenv.config()
const app = express()

connectDB()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/', (req, res) => {
  res.send('API is running....')
})

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

const PORT = process.env.PORT || 4200
app.listen(PORT, console.log('Server running at 4200'.yellow.bold))
