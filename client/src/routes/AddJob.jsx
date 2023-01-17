import { Button, TextField, Typography, CircularProgress, InputLabel, Box, Alert, Input } from "@mui/material"
import { Container } from "@mui/system"
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"
import { useEffect } from "react"
import { useState } from "react"
import { CurrencyFormat } from 'react-currency-format'

const library = ['places']

export default function AddJob({ user, loggedIn }) {

    const CurrencyFormat = require('react-currency-format')

    const [showJobBtn, setShowJobBtn] = useState(false)
    const [showLoading, setshowLoading] = useState(false)
    const [showProfit, setShowProfit] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [profitable, setProfitable] = useState(false)
    const [job, setJob] = useState({})
    const statesArray = []

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDcXIOrxmAOOPEvqjLEXVeZb9mdTyUqS6k',
        libraries: library
    })

    if (!isLoaded) {
        return (
            <CircularProgress />
        )
    }

    const checkJob = async () => {
        setShowJobBtn(false)
        setshowLoading(true)

        const start = document.getElementById('origin').value
        const pickUp = document.getElementById('pick-up').value
        const dropOff = document.getElementById('drop-off').value
        const pay = document.getElementById('revenue').value
        const date = document.getElementById('date').value

        setAlertMsg('')
        setShowAlert(false)
        setShowProfit(false)

        if (start === '' || pickUp === '' || dropOff === '' || pay === '') {
            setAlertMsg('Missing an entry')
            setShowAlert(true)
            setshowLoading(false)
            return
        }

        const geocoder = new window.google.maps.Geocoder()

        const geoStart = await geocoder.geocode({ 'address': start })
        const geoPickUp = await geocoder.geocode({ 'address': pickUp })
        const geoDropOff = await geocoder.geocode({ 'address': dropOff })

        statesArray.push(geoStart.results[0].address_components[4].short_name)
        statesArray.push(geoPickUp.results[0].address_components[4].short_name)
        statesArray.push(geoDropOff.results[0].address_components[4].short_name)

        const startPlaceId = geoStart.results[0].place_id
        const pickUpPlaceId = geoPickUp.results[0].place_id
        const dropOffPlaceId = geoDropOff.results[0].place_id

        const checkRes = await fetch('http://localhost:3001/api/costs/check?id=' + user + '&start=' + startPlaceId +
            '&pick_up=' + pickUpPlaceId + '&drop_off=' + dropOffPlaceId + '&state1=' + statesArray[0] +
            '&state2=' + statesArray[1] + '&state3=' + statesArray[2])
            .then((data) => data.json())

        if (checkRes.message) {
            setAlertMsg('Please add costs in the costs page')
            setShowAlert(true)
            setshowLoading(false)
            return
        }

        console.log(checkRes)

        const directCosts = (checkRes.depreciation * pay) + (checkRes.repairs * pay) + (checkRes.rental * pay) + (checkRes.loan * pay) + (checkRes.gAndA * pay) + (checkRes.odc * pay) + (checkRes.factor * pay) + (checkRes.laborRate * pay) + (checkRes.payrollTax * pay) + (checkRes.dispatch * pay) + checkRes.gasCost
        const indirectCosts = checkRes.insurance + checkRes.tractorLease + checkRes.trailerLease
        const totalCost = indirectCosts + directCosts

        setshowLoading(false)

        if (totalCost > pay) {
            showProfit(false)
            setShowJobBtn(false)
            setProfitable(false)
        } else {
            setJob({
                start: start,
                pickUp: pickUp,
                dropOff: dropOff,
                revenue: pay,
                costs: totalCost.toFixed(2),
                profit: (pay - totalCost).toFixed(2),
                distance: checkRes.distance,
                date: date,
                user_id: user,
                gasCost: checkRes.gasCost,
                depreciation: checkRes.depreciation,
                factor: checkRes.factor,
                gAndA: checkRes.gAndA,
                loan: checkRes.loan,
                odc: checkRes.odc,
                rental: checkRes.rental,
                repairs: checkRes.repairs
            })
            setShowJobBtn(true)
            setShowProfit(true)
            setProfitable(true)
        }
    }

    const addJob = async () => {

        await fetch('http://localhost:3001/api/jobs',
            {
                method: 'POST',
                body: JSON.stringify(job),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => res.json())
        setShowJobBtn(false)
        setShowProfit(false)
        document.getElementById('origin').value = ''
        document.getElementById('pick-up').value = ''
        document.getElementById('drop-off').value = ''
        document.getElementById('revenue').value = ''
        document.getElementById('date').value = ''
    }

    return (

        <Container sx={{ backgroundColor: 'white', width: '70%' }}>
            <Box sx={{ marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h5'>Check Profit and Add Job</Typography>
                {showAlert ? <Alert sx={{ marginTop: 2 }} severity="error">{alertMsg}</Alert> : null}
            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'rows', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <Box sx={{ margin: 5 }}>
                    <InputLabel>Start</InputLabel>
                    <Autocomplete>
                        <TextField id='origin' ></TextField>
                    </Autocomplete>
                </Box>
                <Box sx={{ margin: 5 }}>
                    <InputLabel   >Pick Up</InputLabel>
                    <Autocomplete>
                        <TextField id='pick-up' ></TextField>
                    </Autocomplete>
                </Box>
                <Box sx={{ margin: 5 }}>
                    <InputLabel  >Drop Off</InputLabel>
                    <Autocomplete>
                        <TextField id='drop-off' ></TextField>
                    </Autocomplete>
                </Box>
                <Box sx={{ margin: 5 }}>
                    <InputLabel >Revenue</InputLabel>
                    <TextField placeholder="Enter a dollar amount" id="revenue" />
                </Box>
                <Box sx={{ margin: 5 }}>
                    <InputLabel >Date</InputLabel>
                    <Input type='date' id='date' ></Input>
                </Box>
            </Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 2 }}>
                <Button onClick={checkJob}>Check Job</Button>
            </Box>
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {showLoading ? <CircularProgress /> : null}
            </Box>
            {showProfit ?
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {profitable ?
                        <Container sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Typography variant="h5" sx={{marginBottom: 1}}>Job is Profitable</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Revenue: </Typography>
                                    <CurrencyFormat value={job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Gas Cost: </Typography>
                                    <CurrencyFormat value={job?.gasCost} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Depreciation: </Typography>
                                    <CurrencyFormat value={job?.depreciation * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Factor: </Typography>
                                    <CurrencyFormat value={job?.factor * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>G&A: </Typography>
                                    <CurrencyFormat value={job?.gAndA * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Loan: </Typography>
                                    <CurrencyFormat value={job?.loan * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>ODC: </Typography>
                                    <CurrencyFormat value={job?.odc * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Rental: </Typography>
                                    <CurrencyFormat value={job?.rental * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography sx={{ marginRight: 4 }}>Repairs: </Typography>
                                    <CurrencyFormat value={job?.repairs * job?.revenue} displayType={'text'} thousandSeparator={true} prefix={'-$'} />
                                </Box>
                                <Typography sx={{ fontWeight: 'bold' }}>------------</Typography>
                                <CurrencyFormat value={job?.profit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </Box>
                            <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Typography>Milage: {job?.distance}</Typography>
                                <Typography>Rate Per Mile: {(job?.revenue/job?.distance).toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                                <Button onClick={addJob}>Add Job</Button>
                            </Box>
                        </Container> : <Typography variant="h5">Job is NOT Profitable</Typography>}
                </Container>
                : null
            }
        </Container>

    )
}