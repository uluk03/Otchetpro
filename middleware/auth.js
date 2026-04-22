function isAuth(req, res, next) {
    if (!req.session.user) {
      return res.send('Нет доступа (нужно войти)')
    }
    next()
  }
  
  module.exports = isAuth