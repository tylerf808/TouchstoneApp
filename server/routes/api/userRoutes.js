const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/User')

//Create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)
    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json(err)
  }
})

//Login
router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email: req.body.email } })
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!' })
      return
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    )
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' })
      return
    }
    res.status(200).json(userData)

  } catch (err) {
    res.status(500).json(err)
  }
})

//Log out
router.delete('/', (req, res) => {

  req.session.destroy()
  res.send(200).json({ message: 'test' })
})

module.exports = router
