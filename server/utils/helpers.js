const axios = require('axios')

const getGasPrice = async (state1, state2, state3) => {
  const state1Res = await axios.get('https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + state1,
    {
      headers: {
        authorization: 'apikey 4JZ6EJzzWJ3XEE2535zUXd:0YB2BIARDg8MctdIkdOhqd'
      }
    })
    .then((response) => { return response.data })
  const state2Res = await axios.get('https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + state2,
    {
      headers: {
        authorization: 'apikey 4JZ6EJzzWJ3XEE2535zUXd:0YB2BIARDg8MctdIkdOhqd'
      }
    })
    .then((response) => { return response.data })
  const state3Res = await axios.get('https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + state3,
    {
      headers: {
        authorization: 'apikey 4JZ6EJzzWJ3XEE2535zUXd:0YB2BIARDg8MctdIkdOhqd'
      }
    })
    .then((response) => { return response.data })
  const aveGasPrice = parseFloat(state1Res.result.state.diesel) + parseFloat(state2Res.result.state.diesel) + parseFloat(state3Res.result.state.diesel)
  return aveGasPrice
}

const getDirections = async (start, pickUp, dropOff) => {
  const directionsResObj = await axios.post(
    ('https://maps.googleapis.com/maps/api/directions/v2:computeRoutes?key=AIzaSyDcXIOrxmAOOPEvqjLEXVeZb9mdTyUqS6k'),
    {
      origin: {address: start},
      destination: {address: dropOff},
      intermediate: [
        {
          address: pickUp
        }
      ],
      extraComputations: ["TOLLS"]
    })
    .then((response) => { return response.data })
  return directionsResObj
}

module.exports = { getGasPrice, getDirections }