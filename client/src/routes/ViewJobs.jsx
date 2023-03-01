import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {CSVLink, CSVDownload} from 'react-csv'

export default function ViewJobs({ user }) {

    let [jobs, setJobs] = useState()

    const getJobs = async () => {
        const res = await fetch('http://localhost:3001/api/jobs?id=' + user,
            {
                method: 'GET',
            }).then((res) => res.json())
        if (res.length === 0) {
            setJobs(false)
        } else {
            const jobs = res
            setJobs(jobs)
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Job ID', width: 80 },
        { field: 'start', headerName: 'Start', width: 200 },
        { field: 'pickUp', headerName: 'Pick Up', width: 200 },
        { field: 'dropOff', headerName: 'Drop Off', width: 200 },
        { field: 'distance', headerName: 'Milage', width: 120 },
        { field: 'revenue', headerName: 'Revenue', width: 120 },
        { field: 'ratePerMile', headerName: 'Rate Per Mile', width: 120 },
        { field: 'grossProfitPercentage', headerName: 'Gross Profit %', width: 120 },
        { field: 'operatingProfitPercentage', headerName: 'Operating Profit %', width: 120 },
        { field: 'netProfitPercentage', headerName: 'Net Profit %', width: 120 },
        { field: 'laborRatePercent', headerName: 'Labor %', width: 120 },
        { field: 'labor', headerName: 'Labor', width: 120 },
        { field: 'payrollTax', headerName: 'Payroll', width: 120 },
        { field: 'dispatch', headerName: 'Dispatch', width: 120 },
        { field: 'factor', headerName: 'Factor', width: 120 },
        { field: 'gasCost', headerName: 'Fuel', width: 120 },
        { field: 'odc', headerName: 'ODC', width: 120 },
        { field: 'insurance', headerName: 'Insurance', width: 120 },
        { field: 'trailer', headerName: 'Lease - Trailer', width: 120 },
        { field: 'tractor', headerName: 'Lease - Tractor', width: 120 },
        { field: 'gAndA', headerName: 'G&A', width: 120 },
        { field: 'operatingProfit', headerName: 'Operating Profit', width: 120 },
        { field: 'loan', headerName: 'Loan', width: 120 },
        { field: 'rental', headerName: 'Rental', width: 120 },
        { field: 'repairs', headerName: 'Repairs', width: 120 },
        { field: 'depreciation', headerName: 'Depreciation', width: 120 },
        { field: 'netProfit', headerName: 'Net Profit', width: 120 },
    ]

    const excelHeaders = [
        { key: 'id', label: 'Job ID' },
        { key: 'start', label: 'Start' },
        { key: 'pickUp', label: 'Pick Up' },
        { key: 'dropOff', label: 'Drop Off' },
        { key: 'distance', label: 'Milage' },
        { key: 'revenue', label: 'Revenue' },
        { key: 'ratePerMile', label: 'Rate Per Mile' },
        { key: 'grossProfitPercentage', label: 'Gross Profit %' },
        { key: 'operatingProfitPercentage', label: 'Operating Profit %' },
        { key: 'netProfitPercentage', label: 'Net Profit %' },
        { key: 'laborRatePercent', label: 'Labor %' },
        { key: 'labor', label: 'Labor' },
        { key: 'payrollTax', label: 'Payroll' },
        { key: 'dispatch', label: 'Dispatch' },
        { key: 'factor', label: 'Factor' },
        { key: 'gasCost', label: 'Fuel' },
        { key: 'odc', label: 'ODC' },
        { key: 'insurance', label: 'Insurance' },
        { key: 'trailer', label: 'Lease - Trailer' },
        { key: 'tractor', label: 'Lease - Tractor' },
        { key: 'gAndA', label: 'G&A' },
        { key: 'operatingProfit', label: 'Operating Profit' },
        { key: 'loan', label: 'Loan' },
        { key: 'rental', label: 'Rental' },
        { key: 'repairs', label: 'Repairs' },
        { key: 'depreciation', label: 'Depreciation' },
        { key: 'netProfit', label: 'Net Profit' },
    ]

    return (
        <Container sx={{ marginTop: 3, height: 500 }}>
            {jobs ? <>
                <DataGrid style={{backgroundColor: 'white'}} rows={jobs} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                <CSVLink style={{marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center'}} data={jobs} headers={excelHeaders}>Download Excel Sheet</CSVLink>
            </>
                : <Typography>No previous jobs</Typography>}
        </Container>
    )
}