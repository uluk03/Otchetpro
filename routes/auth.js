const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')

// REGISTER
router.post('/register', (req, res) => {
  const { username, password } = req.body

  const hash = bcrypt.hashSync(password, 10)

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash],
    (err) => {
      if (err) return res.send('Ошибка регистрации')
      res.send('Пользователь создан')
    }
  )
})

module.exports = router