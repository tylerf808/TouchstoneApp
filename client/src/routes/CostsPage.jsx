import { Button, Container, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'

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
        const factorValue = document.getElementById('factor').value
        const odcValue = document.getElementById('odc').value
        const gAndAValue = document.getElementById('g-and-a').value
        const loanValue = document.getElementById('loan').value
        const rentalValue = document.getElementById('rental').value
        const repairsValue = document.getElementById('repairs').value
        const depreciationValue = document.getElementById('depreciation').value

        const costsObj = {
            insurance: insuranceValue,
            tractorLease: tractorValue,
            trailerLease: trailerValue,
            laborRate: laborValue,
            payrollTax: payrollValue,
            dispatch: dispatchValue,
            mpg: mpgValue,
            factor: factorValue,
            odc: odcValue,
            gAndA: gAndAValue,
            loan: loanValue,
            rental: rentalValue,
            repairs: repairsValue,
            depreciation: depreciationValue,
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
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', width: '100%' }}>
            <Container sx={{ flex: 2, margin: 2, padding: 2 }}>
                <Typography sx={{ marginBottom: 2 }} variant='h5'>Current Costs</Typography>
                <Typography sx={{ marginTop: 1 }}>Insurance: <CurrencyFormat value={(costs?.insurance * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Tractor Lease: <CurrencyFormat value={costs?.tractorLease} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Tailer Lease: <CurrencyFormat value={costs?.trailerLease} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Labor Rate: <CurrencyFormat value={(costs?.laborRate * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Payroll Tax: <CurrencyFormat value={(costs?.payrollTax * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Dispatch: <CurrencyFormat value={(costs?.dispatch * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>MPG: {costs?.mpg}</Typography>
                <Typography sx={{ marginTop: 1 }}>Factor: <CurrencyFormat value={(costs?.factor * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>ODC: <CurrencyFormat value={(costs?.odc * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>G&A: <CurrencyFormat value={(costs?.gAndA * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Loan: <CurrencyFormat value={(costs?.loan * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>rental: <CurrencyFormat value={(costs?.rental * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
                <Typography sx={{ marginTop: 1 }}>Depreciation: <CurrencyFormat value={(costs?.depreciation * 100)} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Typography>
            </Container>
            <Container sx={{ flex: 2, margin: 2 }}>
                <Typography sx={{ marginBottom: 2 }} variant='h5'>Create/Update Costs</Typography>
                <FormGroup>
                    <FormLabel htmlFor='insurance'>Insurance:</FormLabel>
                    <TextField id='insurance' sx={{ margin: 2, width: 300 }} placeholder='Dollars per day'></TextField>
                    <FormLabel htmlFor='labor'>Labor Rate:</FormLabel>
                    <TextField id='labor' placeholder='' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='payroll'>Payroll Tax:</FormLabel>
                    <TextField id='payroll' placeholder='Payroll Tax' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='dispatch'>Dispatch:</FormLabel>
                    <TextField id='dispatch' placeholder='Dispatch' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='factor'>Factor:</FormLabel>
                    <TextField id='factor' placeholder='Factor' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='odc'>ODC:</FormLabel>
                    <TextField id='odc' placeholder='ODC' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='tractor'>Tractor Lease:</FormLabel>
                    <TextField id='tractor' sx={{ margin: 2, width: 300 }} placeholder='Tractor Lease'></TextField>
                    <FormLabel htmlFor='trailer'>Trailer Lease:</FormLabel>
                    <TextField id='trailer' sx={{ margin: 2, width: 300 }} placeholder='Trailer Lease'></TextField>
                    <FormLabel htmlFor='g-and-a'>G&A:</FormLabel>
                    <TextField id='g-and-a' placeholder='G&A' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='loan'>Loan:</FormLabel>
                    <TextField id='loan' placeholder='Loan' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='rental'>Rental:</FormLabel>
                    <TextField id='rental' placeholder='Rental' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='repairs'>Repairs:</FormLabel>
                    <TextField id='repairs' placeholder='Repairs' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='depreciation'>Depreciation:</FormLabel>
                    <TextField id='depreciation' placeholder='Depreciation' sx={{ margin: 2, width: 300 }}></TextField>
                    <FormLabel htmlFor='mpg'>MPG:</FormLabel>
                    <TextField id='mpg' placeholder='MPG' sx={{ margin: 2, width: 300 }}></TextField>
                    <Button onClick={addCosts}>Update</Button>
                </FormGroup>
            </Container>
        </Container>
    )
}