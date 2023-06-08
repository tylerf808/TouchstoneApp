const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const Costs = require('../../models/Costs')

//Create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({email: req.body.email, password: req.body.password})
    const costsData = await Costs.create({
      user_id: userData.user_id,
      insurance: req.body.insurance,
      tractorLease: req.body.tractorLease,
      trailerLease: req.body.trailerLease,
      dispatch: req.body.dispatch,
      mpg: req.body.mpg,
      laborRate: req.body.laborRate,
      payrollTax: req.body.payrollTax,
      factor: req.body.factor,
      odc: req.body.odc,
      gAndA: req.body.gAndA,
      loan: req.body.loan,
      repairs: req.body.repairs,
      depreciation: req.body.depreciation
    })
    res.status(200).json([userData, costsData])
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/create', async (req, res) => {
  try {
    const userData = await User.create({email: req.body.email, password: req.body.password})
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
