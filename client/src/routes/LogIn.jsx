import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { Button, Container, TextField, Typography, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

export default function LogIn({ user, setUser, costs, setCosts, setLoggedIn, setShowAlert, setAlertMsg }) {

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

        if (email === '' || password === '') {
            setAlertMsg('missing and entry')
            setShowAlert(true)
            return
        }

        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        if (response.message) {
            setAlertMsg('no user with that email')
            setShowAlert(true)
            return
        }
        setShowAlert(false)
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
        <div className='pageContainer'>
            <div className='headerContainer'>
                <h1>Log In</h1>
            </div>
            <div className='logInContainer'>
                <div className="logInFormItem">
                    <p>Email:</p>
                    <input className='textInput' type='email' id="email-login"></input>
                </div>
                <div className="logInFormItem">
                    <p>Password:</p>
                    <input className='textInput' type='password' id="password-login"></input>
                </div>
                <div className='showPasswordContainer'>
                    <p>Show Password</p>
                    <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                </div>
                <div className='btnContainer'>
                    <button className='logInBtn' onClick={logIn}>Log In</button>
                </div>
            </div>
            <div className='signUpLinkContainer'>
                <p >Don't have an account? <Link id='sign-up-link' to="/signup">Sign up here!</Link></p>
            </div>

        </div>
    )
}