import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { Button, Container, TextField, Typography, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

export default function LogIn({user, setUser, costs, setCosts, setLoggedIn}) {

    const [showPassword, setShowPassword] = useState(false);
   
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();

       
    const logIn = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).catch((err) => console.log(err));
        setUser(response.user_id);
        setLoggedIn(true);

        await fetch("http://localhost:3001/api/costs?id=" + response.user_id, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => setCosts(data[0]));

        navigate('addjob')
    };

    return (
        <div className='backgroundCanvas'>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <h1 variant='h3' sx={{ marginTop: 4, marginBottom: 1 }}>Log In</h1>
            </div>
            <Container sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                backgroundColor: 'white', border: 1, borderRadius: 2, width: 325
            }}>
                <div style={{ margin: 5 }}>
                    <h1 sx={{ marginBottom: 2 }} variant='h4'></h1>
                    <p>Email: </p>
                    <OutlinedInput sx={{ borderRadius: 2, background: 'white', height: '50px', width: '250px' }} id='email'></OutlinedInput>
                </div>
                <div style={{ margin: 5 }}>
                    <p>Password:</p>
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
                <Button sx={{ alignSelf: 'center', margin: 1, color: 'blue' }} onClick={logIn}>Log In</Button>
            </Container>
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '1vh' }}>
                <p style={{ fontSize: '1.2em' }}>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
            </Container>
        </div>
    )
}