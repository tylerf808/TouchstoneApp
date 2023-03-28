import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { Button, Container, TextField, Typography, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

export default function LogIn({ user, setUser, costs, setCosts, setLoggedIn }) {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        let password = document.getElementById('password-login')
        if (password.type === 'password') {
            password.type = 'text'
        } else {
            password.type = 'password'
        }
    }

    const logIn = async () => {
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

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
            <div className='headerContainer'>
                <h1 >Log In</h1>
            </div>
            <div className='pageContainer'>
                <div className='verticalFormContainer'>
                    <div className="formItem">
                        <p className="text1">Email:</p>
                        <input type='email' id="email-login"></input>
                    </div>
                    <div className="formItem">
                        <p className="text1">Password:</p>
                        <input style={{ marginBottom: '0em' }} type='password' id="password-login"></input>
                        <div style={{ marginTop: '0em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <p>Show Password</p>
                            <input onClick={togglePassword} style={{ margin: '1.2em' }} type='checkbox'></input>
                        </div>
                    </div>
                    <button className='btn1' onClick={logIn}>Log In</button>
                </div>
                <div className='textContainer'>
                    <p style={{ fontSize: '1.2em' }}>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
                </div>
            </div>
        </div>
    )
}