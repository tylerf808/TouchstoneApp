import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

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
            console.log(jobs)
    }, [])

    const columns = [
        { field: 'id', headerName: 'Job ID', width: 80 },
        { field: 'start', headerName: 'Start', width: 200 },
        { field: 'pickUp', headerName: 'Pick Up', width: 200 },
        { field: 'dropOff', headerName: 'Drop Off', width: 200 },
        { field: 'revenue', headerName: 'Revenue', width: 120 },
        { field: 'costs', headerName: 'Expenses', width: 120},
        { field: 'profit', headerName: 'Profit', width: 120},
        { field: 'distance', headerName: 'Milage', width: 120 },
        { field: 'gasCosts', headerName: 'Gas Cost', width: 120 },
        { field: 'depreciation', headerName: 'Depreciation', width: 120 },
        { field: 'factor', headerName: 'Factor', width: 120 },
        { field: 'gAndA', headerName: 'G&A', width: 120 },
        { field: 'loan', headerName: 'Loan', width: 120 },
        { field: 'odc', headerName: 'ODC', width: 120 },
        { field: 'rental', headerName: 'Rental', width: 120 },
        { field: 'repairs', headerName: 'Repairs', width: 120 },
    ]

    return (
        <Container sx={{ marginTop: 3, height: 500}}>
            {jobs ? 
                <DataGrid rows={jobs} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
              : <Typography>No previous jobs</Typography>}  
        </Container>
    )
}