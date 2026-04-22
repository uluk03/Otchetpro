const express = require('express')
const session = require('express-session')

const app = express()
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🔐 SESSION
app.use(session({
  secret: 'agronom-secret-key',
  resave: false,
  saveUninitialized: false
}))

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Otchetpro работает 🚀')
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000')
})



const isAuth = require('./middleware/auth')

app.get('/income', isAuth, (req, res) => {
  res.send('Это защищённая страница доходов 🚜')
})


app.use(express.static('public'))