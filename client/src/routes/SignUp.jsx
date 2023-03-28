import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";

export default function SignUp({ signUp, loggedIn }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('addjob')
    }
  })

  const togglePassword = () => {
    let password = document.getElementById('password-signup')
    let passwordConf = document.getElementById('password-signup-conf')
    if(password.type === 'password'){
      password.type = 'text'
      passwordConf.type = 'text'
    } else {
      password.type = 'password'
      passwordConf.type = 'password'
    }
  }

  return (
    <div>
      <div className="headerContainer">
        <h1>Create an Account</h1>
      </div>
      <div className="formContainer">
        <div className="form">
          <div className="formItem">
            <p className="text1">Email:</p>
            <input type='email' id="email-signup"></input>
          </div>
          <div className="formItem">
            <p className="text1">Password:</p>
            <input type='password' id="password-signup"></input>
          </div>
          <div className="formItem">
            <p className="text1">Confirm Password:</p>
            <input type='password' id="password-signup-conf"></input>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p>Show Password</p>
            <input onClick={togglePassword} style={{ margin: '1.2em' }} type='checkbox'></input>
          </div>
        </div>
        <button className="btn1" onClick={signUp}>Sign Up</button>
      </div>
      <div>
        <p className="text1">Already have an account? <Link to='/'>Log in here!</Link></p>
      </div>
    </div>
  );
}
