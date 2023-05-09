import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function SignUp({ loggedIn, setLoggedIn, setUser, setCosts, user }) {

  const [insuranceFreq, setInsuranceFreq] = useState()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
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

    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const passwordConf = document.getElementById("password-signup-conf").value;
    const insuranceAmount = document.getElementById('insurance-amount').value
    const tractorAmount = document.getElementById('tractor-amount').value
    const trailerAmount = document.getElementById('trailer-amount').value
    const dispatchAmount = document.getElementById('dispatch-amount').value
    const factorAmount = document.getElementById('factor-amount').value
    const odcAmount = document.getElementById('odc-amount').value
    const loanAmount = document.getElementById('loan-amount').value
    const repairsAmount = document.getElementById('repairs-amount').value
    const depreciationAmount = document.getElementById('depreciation-amount').value
    const mpgAmount = document.getElementById('mpg-amount').value
    const laborAmount = document.getElementById('labor-amount').value
    const payrollAmount = document.getElementById('payroll-amount').value
    const gandaAmount = document.getElementById('ganda-amount').value

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

    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        insurance: insurance.toFixed(2),
        tractorLease: (tractorAmount / 30).toFixed(2),
        trailerLease: (trailerAmount / 30).toFixed(2),
        dispatch: dispatchAmount.toFixed(2),
        mpg: mpgAmount.toFixed(2),
        laborRate: laborAmount.toFixed(2),
        payrollTax: payrollAmount.toFixed(2),
        factor: factorAmount.toFixed(2),
        odc: odcAmount.toFixed(2),
        gAndA: gandaAmount.toFixed(2),
        loan: (loanAmount / 30).toFixed(2),
        repairs: repairsAmount.toFixed(2),
        depreciation: depreciationAmount.toFixed(2),
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())

    setUser(response.user_id);
    navigate('/')
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
              <p>Email:</p>
              <input id="email-signup" className="textInput" type="email" />
              <p style={{ marginTop: 10 }}>Password:</p>
              <input id="password-signup" className="textInput" type="password" />
              <p style={{ marginTop: 10 }}>Confirm Password:</p>
              <input id="password-signup-conf" className="textInput" type="password" />
            </div>
          </Slide>
          <Slide className="slide" index={1}>
            <div className="slideItem">
              <p>How often do you pay insurance?</p>
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
              <p>How much is you insurance payment?</p>
              <input id="insurance-amount" type='text'></input>
            </div>
          </Slide>
          <Slide className="slide" index={2}>
            <div className="slideItem">
              <p>What is your monthly tractor lease payment?</p>
              <input id="tractor-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p>What is your monthly trailer lease payment?</p>
              <input id='trailer-amount' className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p>Enter dispatch fee as percentage of revenue.</p>
              <input id='dispatch-amount' className="newCostInput" type='text'></input>
            </div>
          </Slide>
          <Slide className="slide" index={3}>
            <div className="slideItem">
              <p>Enter factor fee as percentage of revenue.</p>
              <input id="factor-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>Enter other direct costs (ODC) as a percentage to cover incidental costs.</p>
              <input id="odc-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>Enter monthly loan payments if any.</p>
              <input id="loan-amount" className="newCostInput" type='text'></input>
            </div>
          </Slide>
          <Slide className="slide" index={4}>
            <div className="slideItem">
              <p>How much do you spend on average for repairs?</p>
              <input id="repairs-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>How much do you put aside for depreciation?</p>
              <input id="depreciation-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>What is you MPG?</p>
              <input id="mpg-amount" className="newCostInput" type='text'></input>
            </div>
          </Slide>
          <Slide className="slide" index={5}>
            <div className="slideItem">
              <p>How much do you spend on average on G&A?</p>
              <input id="ganda-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>What is your labor rate?</p>
              <input id="labor-amount" className="newCostInput" type='text'></input>
            </div>
            <div className="slideItem">
              <p>What percentage do you pay in payroll tax?</p>
              <input id="payroll-amount" className="newCostInput" type='text'></input>
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
