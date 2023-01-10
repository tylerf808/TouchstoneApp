import { Button, Container, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'


export default function CostsPage({ user, costs, setCosts }) {

    useEffect(() => {
        fetch('http://localhost:3001/api/costs?id=' + user,
            {
                method: 'GET'
            }).then((res) => res.json()).then((data) => setCosts(data[0]))
    }, [])

    const CurrencyFormat = require('react-currency-format')

    const addCosts = async () => {
        const insuranceValue = document.getElementById('insurance').value
        const tractorValue = document.getElementById('tractor').value
        const trailerValue = document.getElementById('trailer').value
        const mpgValue = document.getElementById('mpg').value
        const laborValue = document.getElementById('labor').value
        const payrollValue = document.getElementById('payroll').value
        const dispatchValue = document.getElementById('dispatch').value

        const costsObj = {
            insurance: insuranceValue,
            tractorLease: tractorValue,
            trailerLease: trailerValue,
            laborRate: laborValue,
            payrollTax: payrollValue,
            dispatch: dispatchValue,
            mpg: mpgValue,
            user_id: user
        }

        if (costs) {
            await fetch('http://localhost:3001/api/costs?id=' + user,
                {
                    method: 'PUT',
                    body: JSON.stringify(costsObj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                .catch((err) => console.log(err))
            await fetch('http://localhost:3001/api/costs?id=' + user,
                {
                    method: 'GET'
                }).then((res) => res.json()).then((data) => setCosts(data[0]))
        } else {
            await fetch('http://localhost:3001/api/costs?id=' + user,
                {
                    method: 'POST',
                    body: JSON.stringify(costsObj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                .catch((err) => console.log(err))
            await fetch('http://localhost:3001/api/costs?id=' + user,
                {
                    method: 'GET'
                }).then((res) => res.json()).then((data) => setCosts(data[0]))
        }

    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Container sx={{ flex: 2, margin: 2, padding: 2 }}>
                <Typography sx={{marginBottom: 2}} variant='h5'>Current Costs</Typography>
                <Typography sx={{ marginTop: 1 }}>Insurance: <CurrencyFormat value={costs?.insurance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Tractor Lease: <CurrencyFormat value={costs?.tractorLease} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Tailer Lease: <CurrencyFormat value={costs?.trailerLease} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Labor Rate: <CurrencyFormat value={costs?.laborRate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Payroll Tax: <CurrencyFormat value={costs?.payrollTax} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Dispatch: <CurrencyFormat value={costs?.dispatch} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>MPG: {costs?.mpg}</Typography>
            </Container>
            <Container sx={{ flex: 2, margin: 2 }}>
                <Typography sx={{marginBottom: 2}} variant='h5'>Create/Update Costs</Typography>
                <FormGroup>
                    <FormLabel htmlFor='insurance'>Insurance:</FormLabel>
                    <TextField id='insurance' sx={{ margin: 2, width: 300 }} placeholder='Dollars per day'></TextField>
                    <FormLabel htmlFor='labor'>Labor Rate:</FormLabel>
                    <TextField id='labor' placeholder='' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='payroll'>Payroll:</FormLabel>
                    <TextField id='payroll' placeholder='Payroll Tax' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='dispatch'>Dispatch:</FormLabel>
                    <TextField id='dispatch' placeholder='Dispatch' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='tractor'>Tractor Lease:</FormLabel>
                    <TextField id='tractor' sx={{ margin: 2, width: 300 }} placeholder='Tractor Lease'></TextField>
                    <FormLabel htmlFor='trailer'>Trailer Lease:</FormLabel>
                    <TextField id='trailer' sx={{ margin: 2, width: 300 }} placeholder='Trailer Lease'></TextField>
                    <FormLabel htmlFor='mpg'>MPG:</FormLabel>
                    <TextField id='mpg' sx={{ margin: 2, width: 300 }} placeholder='MPG'></TextField>
                    <Button onClick={addCosts}>Update</Button>
                </FormGroup>
            </Container>
        </Container>
    )
}