const Database = require('better-sqlite3')

const db = new Database('database.db')

// users
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  role TEXT DEFAULT 'user'
)
`).run()

// income
db.prepare(`
CREATE TABLE IF NOT EXISTS income (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  hectares REAL,
  price REAL,
  income REAL
)
`).run()

// expense
db.prepare(`
CREATE TABLE IF NOT EXISTS expense (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  category TEXT,
  amount REAL,
  description TEXT
)
`).run()

module.exports = db