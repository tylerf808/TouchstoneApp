import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, TextField, Typography, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

export default function LogIn({ logIn, loggedIn }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedIn) {
            navigate('addjob')
        }
    })

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Typography variant='h3' sx={{ marginTop: 4, marginBottom: 1 }}>Log In</Typography>
            </div>
            <Container sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                backgroundColor: 'white', border: 1, borderRadius: 2, width: 325
            }}>
                <div style={{margin: 5}}>
                    <Typography sx={{ marginBottom: 2 }} variant='h4'></Typography>
                    <Typography>Email: </Typography>
                    <OutlinedInput sx={{ borderRadius: 2, background: 'white', height: '50px', width: '250px' }} id='email'></OutlinedInput>
                </div>
                <div style={{margin: 5}}>
                    <Typography>Password:</Typography>
                    <OutlinedInput
                        id="password"
                        sx={{ backgroundColor: 'white', borderRadius: 2 }}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <Button sx={{ alignSelf: 'center', margin: 1, color: 'orange' }} onClick={logIn}>Log In</Button>
            </Container>
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '1vh' }}>
                <Typography>Don't have an account? <Link to="/signup">Sign up here!</Link></Typography>
            </Container>
        </>
    )
}