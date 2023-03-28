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
    if (password.type === 'password') {
      password.type = 'text'
      passwordConf.type = 'text'
    } else {
      password.type = 'password'
      passwordConf.type = 'password'
    }
  }

  return (
    <>
      <div className="headerContainer">
        <h1>Create an Account</h1>
      </div>
      <div className="pageContainer">
        <div className="verticalFormContainer">
          <div className="formItem">
            <p className="text1">Email:</p>
            <input type='email' id="email-signup"></input>
          </div>
          <div className="formItem">
            <p className="text1">Password:</p>
            <input type='password' id="password-signup"></input>
          </div>
          <div className="formItem" style={{ alignItems: 'flex-start' }}>
            <p className="text1">Confirm Password:</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <input type='password' id="password-signup-conf"></input>
              <p className="text1">Show Password</p>
              <input onClick={togglePassword} type='checkbox'></input>
            </div>
          </div>
          <div className="formItem">
            <p className="text1">How often do you pay insurance?</p>
            <form className="radioMenu">
              <label htmlFor="monthly">Monthly</label>
              <input className="radioInput" type='radio' id="monthly"></input>
              <label htmlFor="bi-monthly">Bi-Monthly</label>
              <input className="radioInput" type='radio' id="bi-monthly"></input>
              <label htmlFor="quarterly">Quarterly</label>
              <input className="radioInput" type='radio' id="quarterly"></input>
              <label htmlFor="annually">Annually</label>
              <input className="radioInput" type='radio' id="annually"></input>
            </form>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend monthly on your tractor lease?</p>
            <input className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend monthly on your trailer lease?</p>
            <input className="textInput" type='text'></input>
          </div>
          <button className="btn1" onClick={signUp}>Sign Up</button>
        </div>
        <div>
          <p className="text1">Already have an account? <Link to='/'>Log in here!</Link></p>
        </div>
      </div>
    </>
  );
}
