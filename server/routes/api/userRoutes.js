const router = require('express').Router()
const bcrypt = require('bcrypt')
const Manager = require('../../models/Manager')
const Driver = require('../../models/Driver')
const Costs = require('../../models/Costs')
const { Op } = require('sequelize')

//Check if driver with an email already exists during sign up.
router.get('/check', async (req, res) => {
  try {
    if (req.query.accountType === 'manager') {
      const checkEmail = await Manager.findOne({
        where: {
          [Op.or]: [
            { email: req.query.email },
            { username: req.query.username }
          ]
        }
      })
      res.status(200).json(checkEmail)
    } else {
      const checkEmail = await Driver.findOne({
        where: {
          [Op.or]: [
            { email: req.query.email },
            { username: req.query.username }
          ]
        }
      })
      res.status(200).json(checkEmail)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Create a Driver
router.post('/driver', async (req, res) => {
  try {
    const userData = await Driver.create({ email: req.body.email, username: req.body.username, password: req.body.password })
    // const costsData = await Costs.create({
    //   user_id: userData.user_id,
    //   insurance: req.body.insurance,
    //   tractorLease: req.body.tractorLease,
    //   trailerLease: req.body.trailerLease,
    //   dispatch: req.body.dispatch,
    //   mpg: req.body.mpg,
    //   laborRate: req.body.laborRate,
    //   payrollTax: req.body.payrollTax,
    //   factor: req.body.factor,
    //   odc: req.body.odc,
    //   gAndA: req.body.gAndA,
    //   loan: req.body.loan,
    //   repairs: req.body.repairs,
    //   depreciation: req.body.depreciation
    // })
    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json(err)
  }
})

//Create a Dispatcher
router.post('/manager', async (req, res) => {
  try {
    const userData = await Manager.create({ email: req.body.email, username: req.body.username, password: req.body.password })
    // const costsData = await Costs.create({
    //   user_id: userData.user_id,
    //   insurance: req.body.insurance,
    //   tractorLease: req.body.tractorLease,
    //   trailerLease: req.body.trailerLease,
    //   dispatch: req.body.dispatch,
    //   mpg: req.body.mpg,
    //   laborRate: req.body.laborRate,
    //   payrollTax: req.body.payrollTax,
    //   factor: req.body.factor,
    //   odc: req.body.odc,
    //   gAndA: req.body.gAndA,
    //   loan: req.body.loan,
    //   repairs: req.body.repairs,
    //   depreciation: req.body.depreciation,
    //   drivers: req.body.drivers
    // })
    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json(err)
  }
})


//Login
router.post('/login', async (req, res) => {
  try {

    const userData = await Driver.findOne({ where: { email: req.body.email } })
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
