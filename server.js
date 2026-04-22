const express = require('express')
const session = require('express-session')
const path = require('path')

const app = express()

const authRoutes = require('./routes/auth')
const auth = require('./middleware/auth')
const db = require('./db')

// ---------------- MIDDLEWARE ----------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'agronom-secret-key',
  resave: false,
  saveUninitialized: false
}))

// static files (HTML)
app.use(express.static('public'))

// ---------------- ROUTES ----------------

// auth routes
app.use('/auth', authRoutes)

// ---------------- HOME PAGE ----------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/auth.html'))
})

// ---------------- INCOME PAGE (test) ----------------
app.get('/income', auth, (req, res) => {
  res.send('Это защищённая страница доходов 🚜')
})

// ---------------- ADD INCOME ----------------
app.post('/income', auth, (req, res) => {
  const { name, hectares, price } = req.body

  const income = hectares * price
  const userId = req.session.user.id

  db.prepare(
    `INSERT INTO income (user_id, name, hectares, price, income)
     VALUES (?, ?, ?, ?, ?)`
  ).run(userId, name, hectares, price, income)

  res.send('Доход добавлен 🚜')
})

// ---------------- SERVER START ----------------
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000')
})