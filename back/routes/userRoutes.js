const bcrypt = require('bcrypt')
const saltRound = 10;
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const withAuth = require('../withAuth')

module.exports = app => {
  const User = require('../models/user')

  app.post('/api/user/save', async (req, res) => {
    const {
      firstName,
      lastName,
      nickName,
      email,
      password
    } = req.body

    const hash = await bcrypt.hash(password, saltRound)

    const data = {
      firstName,
      lastName,
      nickName,
      email,
      password: hash,
      creationDate: new Date()
    }

    const user = await new User(data)
    const result = await user.save();

    res.json({status: 200, result})
  })
}