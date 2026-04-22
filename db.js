const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db')

// таблицы
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      role TEXT DEFAULT 'user'
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS income (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      hectares REAL,
      price REAL,
      income REAL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS expense (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      category TEXT,
      amount REAL,
      description TEXT
    )
  `)

})

module.exports = db