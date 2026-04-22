const express = require('express')
const app = express()

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on all interfaces')
  })

app.listen(3000, () => {
  console.log('http://localhost:3000')
})