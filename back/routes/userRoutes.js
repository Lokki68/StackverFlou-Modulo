const userCtrl = require ('../controllers/userCtrl')
const withAuth = require('../withAuth')

module.exports = app => {
  const User = require('../models/user')

  app.get('/api/user/:id',withAuth , userCtrl.getOne)

  app.post('/api/user/save', userCtrl.save)

  app.post('/api/user/login', userCtrl.login)

  app.put('/api/user/update/:id',withAuth , userCtrl.update)
}