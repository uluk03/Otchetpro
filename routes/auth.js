const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')


// ---------------- REGISTER ----------------
router.post('/register', (req, res) => {
  const { username, password } = req.body

  const hash = bcrypt.hashSync(password, 10)

  db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  ).run(username, hash)

  res.send('Пользователь создан')
})


// ---------------- LOGIN ----------------
router.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = db.prepare(
    "SELECT * FROM users WHERE username = ?"
  ).get(username)

  if (!user) {
    return res.send('Пользователь не найден')
  }

  const isValid = bcrypt.compareSync(password, user.password)

  if (!isValid) {
    return res.send('Неверный пароль')
  }

  // 🔥 СОЗДАЁМ СЕССИЮ
  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  res.send('Вход выполнен успешно 🚀')
})


// ---------------- LOGOUT ----------------
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('Вы вышли из аккаунта')
})

module.exports = router