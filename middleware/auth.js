function auth(req, res, next) {
    if (!req.session.user) {
      return res.send('Нет доступа ❌')
    }
    next()
  }
  
  module.exports = auth