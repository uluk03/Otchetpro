const express = require('express')
const app = express()

const authRoutes = require('./routes/auth')
const db = require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// роуты
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Otchetpro работает 🚀')
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000')
})