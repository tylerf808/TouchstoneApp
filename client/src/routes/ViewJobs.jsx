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
            const jobs = {...res, profit: (res.revenue - res.costs)}
            setJobs(res)
        }
    }

    useEffect(() => {
        if(jobs)
            getJobs()
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

    ]

    return (
        <Container sx={{ marginTop: 3, height: 500}}>
            {jobs ?
                <DataGrid rows={jobs} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                :
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ marginTop: '2%' }}>No jobs associated with this account</Typography>
                </Container>
            }
        </Container>
    )
}