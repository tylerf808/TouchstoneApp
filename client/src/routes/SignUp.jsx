import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function SignUp({ showAlert, loggedIn, setLoggedIn, setUser, setCosts, user, setAlertMsg, setShowAlert }) {

  const [insuranceFreq, setInsuranceFreq] = useState()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(false)

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

    setShowAlert(false)

    const inputs = document.getElementsByTagName('input')
    const inputsArray = Array.from(inputs)

    await inputsArray.forEach((input) => {
      if (input.value === "") {
        setAlertMsg('Missing an Entry')
        setShowAlert(true)
        return
      }
    })

    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const passwordConf = document.getElementById("password-signup-conf").value;
    const insuranceAmount = document.getElementById('insurance-amount').value.toFixed(2)
    const tractorAmount = document.getElementById('tractor-amount').value.toFixed(2)
    const trailerAmount = document.getElementById('trailer-amount').value.toFixed(2)
    const dispatchAmount = (document.getElementById('dispatch-amount').value / 100).toFixed(2)
    const factorAmount = (document.getElementById('factor-amount').value / 100).toFixed(2)
    const odcAmount = (document.getElementById('odc-amount').value / 100).toFixed(2)
    const loanAmount = document.getElementById('loan-amount').value.toFixed(2)
    const repairsAmount = document.getElementById('repairs-amount').value.toFixed(2)
    const depreciationAmount = document.getElementById('depreciation-amount').value.toFixed(2)
    const mpgAmount = document.getElementById('mpg-amount').value.toFixed(2)
    const laborAmount = (document.getElementById('labor-amount').value / 100).toFixed(2)
    const payrollAmount = (document.getElementById('payroll-amount').value / 100).toFixed(2)
    const gandaAmount = document.getElementById('ganda-amount').value.toFixed(2)

    let insurance

    switch (insuranceFreq) {
      case 'monthly':
        insurance = insuranceAmount / 30
        break;
      case 'bi-monthly':
        insurance = insuranceAmount / 15
        break;
      case 'quarterly':
        insurance = insuranceAmount / 91
        break;
      default:
        insurance = insuranceAmount / 365
        break;
    }

    if (showAlert === false) {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          insurance: insurance.toFixed(2),
          tractorLease: (tractorAmount / 30).toFixed(2),
          trailerLease: (trailerAmount / 30).toFixed(2),
          dispatch: dispatchAmount,
          mpg: mpgAmount,
          laborRate: laborAmount,
          payrollTax: payrollAmount,
          factor: factorAmount,
          odc: odcAmount,
          gAndA: gandaAmount / 30,
          loan: (loanAmount / 30),
          repairs: repairsAmount / 30,
          depreciation: depreciationAmount / 30,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      setUser(response[0].user_id);
      setCosts(response[1])
      setLoggedIn(true)
      navigate('/addjob')
    } else {
      return
    }
  }

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h1>Create an Account</h1>
      </div>
      <CarouselProvider
        className="carousel"
        id='carousel'
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={6}
        dragEnabled={false}
        touchEnabled={false}
        style={{ border: 'solid', borderWidth: 2, borderRadius: 6, padding: 20, backgroundColor: 'white' }}
      >
        <Slider className="slider">
          <Slide className="slide" index={0}>
            <div className="slideItem">
              <p className="slideLabel">Email:</p>
              <input id="email-signup" className="textInput" type="email" />
              <p className="slideLabel">Password:</p>
              <input id="password-signup" className="textInput" type="password" />
              <p className="slideLabel">Confirm Password:</p>
              <input id="password-signup-conf" className="textInput" type="password" />
              <div style={{ position: 'relative', left: 80 }}>
                <p style={{ marginRight: 5, marginTop: 6, fontSize: 15 }}>Show Password</p>
                <input style={{ position: 'relative', left: 80 }} onClick={togglePassword} type='checkbox'></input>
              </div>
            </div>
          </Slide>
          <Slide className="slide" index={1}>
            <div className="slideItem">
              <p className="slideLabel">How often do you pay insurance?</p>
              <div className="radioMenu" style={{ marginLeft: '1em' }}>
                <div className="radioItem">
                  <label htmlFor="monthly">Monthly</label>
                  <input name='insuranceRadio' className="radioInput" type='radio' id="monthly" value='monthly' onClick={changeInsuranceFreq}></input>
                </div>
                <div className="radioItem">
                  <label htmlFor="bi-monthly">Bi-Monthly</label>
                  <input name='insuranceRadio' className="radioInput" type='radio' id="bi-monthly" value='bi-monthly' onClick={changeInsuranceFreq}></input>
                </div>
                <div className="radioItem">
                  <label htmlFor="quarterly">Quarterly</label>
                  <input name='insuranceRadio' className="radioInput" type='radio' id="quarterly" value='quarterly' onClick={changeInsuranceFreq}></input>
                </div>
                <div className="radioItem">
                  <label htmlFor="annually">Annually</label>
                  <input name='insuranceRadio' className="radioInput" type='radio' id="annually" value='annually' onClick={changeInsuranceFreq}></input>
                </div>
              </div>
            </div>
            <div className="slideItem">
              <p className="slideLabel">How much is you insurance payment?</p>
              <input id="insurance-amount" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={2}>
            <div className="slideItem">
              <p className="slideLabel">Enter your monthly tractor lease payment.</p>
              <input id="tractor-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter your monthly trailer lease payment.</p>
              <input id='trailer-amount' className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter dispatch fee as percentage of revenue.</p>
              <input id='dispatch-amount' className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
          </Slide>
          <Slide className="slide" index={3}>
            <div className="slideItem">
              <p className="slideLabel">Enter factor fee as percentage of revenue.</p>
              <input id="factor-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter other direct costs (ODC) as a percentage to cover incidental costs.</p>
              <input id="odc-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter monthly loan payments if any.</p>
              <input id="loan-amount" className="newCostInput" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={4}>
            <div className="slideItem">
              <p className="slideLabel">How much do you spend on average for repairs each month?</p>
              <input id="repairs-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">How much do you put aside for depreciation each month?</p>
              <input id="depreciation-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What is your MPG?</p>
              <input id="mpg-amount" className="newCostInput" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={5}>
            <div className="slideItem">
              <p className="slideLabel">How much do you spend on average on G&A each month?</p>
              <input id="ganda-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What is your labor rate?</p>
              <input id="labor-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What percentage do you pay in payroll tax?</p>
              <input id="payroll-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
          </Slide>
        </Slider>
        <div className="btnContainer">
          <ButtonBack className="btn1" onClick={() => {
            const newSlide = currentSlide - 1
            setCurrentSlide(newSlide)
            setLastSlide(false)
          }} style={{ margin: 10, height: 30, width: 50 }}>Back</ButtonBack>
          {lastSlide ?
            <button onClick={createAccount} style={{ margin: 10, height: 30, width: 60, fontWeight: 'bold' }} className="btn1">Submit</button>
            :
            <ButtonNext className="btn1" onClick={() => {
              const newSlide = currentSlide + 1
              setCurrentSlide(newSlide)
              if (newSlide === 5) {
                setLastSlide(true)
              }
            }} style={{ margin: 10, height: 30, width: 50 }}>Next</ButtonNext>}
        </div>
      </CarouselProvider>
      <div>
        <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
      </div>
    </div>
  );
}
