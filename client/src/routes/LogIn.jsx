import {useState, useEffect} from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, TextField, Typography, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

export default function LogIn({logIn, loggedIn}) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedIn){
            navigate('addjob')
        }
    })

    return (
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ marginBottom: 2 }} variant='h4'></Typography>
                <Typography>Email</Typography>
                <OutlinedInput sx={{borderRadius: 3, background: 'white', height: '50px', width: '250px'}} id='email'></OutlinedInput>
                <Typography>Password</Typography>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        id="password"
                        sx={{backgroundColor: 'white'}}
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
                    <Button onClick={logIn}>Log In</Button>
                </FormControl>
            <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '1vh'}}>
                <Typography>Don't have an account? <Link to="/signup">Sign up here!</Link></Typography>
            </Container>
        </Container>
    )
}