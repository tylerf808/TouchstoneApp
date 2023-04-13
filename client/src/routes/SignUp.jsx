import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function SignUp({ loggedIn, setLoggedIn, setUser, setCosts, user }) {

  const [insuranceFreq, setInsuranceFreq] = useState()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const navigate = useNavigate();

  const changeInsuranceFreq = (e) => {
    setInsuranceFreq(e.target.value)
  }

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

  const createAccount = async (e) => {

    e.preventDefault()

    const inputs = document.getElementsByClassName('textInput')

    const inputsArray = Array.from(inputs)

    inputsArray.forEach((input) => {
      if (input.value === '') {
        setAlertMsg('Missing an Entry')
        setShowAlert(true)
        return
      } else {
        setAlertMsg('')
        setShowAlert(false)
      }
    })

    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const passwordConf = document.getElementById("password-signup-conf").value;
    // const insuranceAmount = document.getElementById('insurance-amount').value
    // const tractorAmount = document.getElementById('tractor-amount').value
    // const trailerAmount = document.getElementById('trailer-amount').value
    // const dispatchAmount = document.getElementById('dispatch-amount').value
    // const factorAmount = document.getElementById('factor-amount').value
    // const odcAmount = document.getElementById('odc-amount').value
    // const loanAmount = document.getElementById('loan-amount').value
    // const rentalAmount = document.getElementById('rental-amount').value
    // const repairsAmount = document.getElementById('repairs-amount').value
    // const depreciationAmount = document.getElementById('depreciation-amount').value
    // const mpgAmount = document.getElementById('mpg-amount').value
    // const laborAmount = document.getElementById('labor-amount').value
    // const payrollAmount = document.getElementById('payroll-amount').value
    // const gandaAmount = document.getElementById('ganda-amount').value

    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    
    setUser(response.user_id);
    setLoggedIn(true)
    navigate('/createcosts')
  }

  return (
    <div className="backgroundCanvas">
      <div className="headerContainer">
        <h1>Create an Account</h1>
      </div>
      <div className="pageContainer">
        
        <form className="verticalFormContainer">
          <div className="formItem">
            <p className="text1">Email:</p>
            <input className="textInput" type='email' id="email-signup"></input>
          </div>
          <div className="formItem">
            <p className="text1">Password:</p>
            <input className="textInput" type='password' id="password-signup"></input>
          </div>
          <div className="formItem" style={{ alignItems: 'flex-start' }}>
            <p className="text1">Confirm Password:</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <input className="textInput" type='password' id="password-signup-conf"></input>
              <p className="text1">Show Password</p>
              <input onClick={togglePassword} type='checkbox'></input>
            </div>
          </div>
          {/* <div className="formItem">
            <p className="text1">How often do you pay insurance?</p>
            <div className="radioMenu" style={{ marginLeft: '1em' }}>
              <label htmlFor="monthly">Monthly</label>
              <input name='insuranceRadio' className="radioInput" type='radio' id="monthly" value='monthly' onClick={changeInsuranceFreq}></input>
              <label htmlFor="bi-monthly">Bi-Monthly</label>
              <input name='insuranceRadio' className="radioInput" type='radio' id="bi-monthly" value='bi-monthly' onClick={changeInsuranceFreq}></input>
              <label htmlFor="quarterly">Quarterly</label>
              <input name='insuranceRadio' className="radioInput" type='radio' id="quarterly" value='quarterly' onClick={changeInsuranceFreq}></input>
              <label htmlFor="annually">Annually</label>
              <input name='insuranceRadio' className="radioInput" type='radio' id="annually" value='annually' onClick={changeInsuranceFreq}></input>
            </div>
          </div>
          <div className="formItem">
            <p className="text1">How much is you insurance payment?</p>
            <input id="insurance-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend monthly on your tractor lease?</p>
            <input id="tractor-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend monthly on your trailer lease?</p>
            <input id='trailer-amount' className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What percent do you pay to dispatch?</p>
            <input id='dispatch-amount' className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What percent do you pay to factor?</p>
            <input id="factor-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What is your average ODC?</p>
            <input id="odc-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What are you loan payments?</p>
            <input id="loan-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you pay in rental costs?</p>
            <input id="rental-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend on average for repairs?</p>
            <input id="repairs-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you put aside for depreciation?</p>
            <input id="depreciation-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What is you MPG?</p>
            <input id="mpg-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">How much do you spend on average on G&A?</p>
            <input id="ganda-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What is your labor rate?</p>
            <input id="labor-amount" className="textInput" type='text'></input>
          </div>
          <div className="formItem">
            <p className="text1">What percentage do you pay in payroll tax?</p>
            <input id="payroll-amount" className="textInput" type='text'></input>
          </div> */}
          <button className="btn1" onClick={createAccount}>Sign Up</button>
        </form>
        <div>
          <p className="text1">Already have an account? <Link to='/'>Log in here!</Link></p>
        </div>
      </div>
    </div>
  );
}
