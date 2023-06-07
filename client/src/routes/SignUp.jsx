import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function SignUp({ showAlert, loggedIn, setLoggedIn, setUser, setCosts, user, setAlertMsg, setShowAlert }) {

  const [insuranceFreq, setInsuranceFreq] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [insuranceAmount, setInsuranceAmount] = useState('')
  const [tractorAmount, setTractorAmount] = useState('')
  const [trailerAmount, setTrailerAmount] = useState('')
  const [dispatchAmount, setDispatchAmount] = useState('')
  const [factorAmount, setFactorAmount] = useState('')
  const [odcAmount, setOdcAmount] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [repairsAmount, setRepairsAmount] = useState('')
  const [depreciationAmount, setDepreciationAmount] = useState('')
  const [mpgAmount, setMpgAmount] = useState('')
  const [laborAmount, setLaborAmount] = useState('')
  const [payrollAmount, setPayrollAmount] = useState('')
  const [gandaAmount, setGandaAmount] = useState('')

  const navigate = useNavigate();

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

  const createAccount = async () => {

    setShowAlert(false)

    let passwordConf = document.getElementById('password-signup-conf').value

    // const email = document.getElementById("email-signup").value;
    // const password = document.getElementById("password-signup").value;
    // const passwordConf = document.getElementById("password-signup-conf").value;
    // const insuranceAmount = document.getElementById('insurance-amount').value
    // const tractorAmount = document.getElementById('tractor-amount').value
    // const trailerAmount = document.getElementById('trailer-amount').value
    // const dispatchAmount = (document.getElementById('dispatch-amount').value / 100)
    // const factorAmount = (document.getElementById('factor-amount').value / 100)
    // const odcAmount = (document.getElementById('odc-amount').value / 100)
    // const loanAmount = document.getElementById('loan-amount').value
    // const repairsAmount = document.getElementById('repairs-amount').value
    // const depreciationAmount = document.getElementById('depreciation-amount').value
    // const mpgAmount = document.getElementById('mpg-amount').value
    // const laborAmount = (document.getElementById('labor-amount').value / 100)
    // const payrollAmount = (document.getElementById('payroll-amount').value / 100)
    // const gandaAmount = document.getElementById('ganda-amount').value

    if (password !== passwordConf) {
      setAlertMsg('Password do not match')
      setShowAlert(true)
      return
    }

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
          dispatch: (dispatchAmount / 100).toFixed(2),
          mpg: mpgAmount,
          laborRate: (laborAmount / 100).toFixed(2),
          payrollTax: (payrollAmount / 100).toFixed(2),
          factor: (factorAmount / 100).toFixed(2),
          odc: (odcAmount / 100).toFixed(2),
          gAndA: (gandaAmount / 30).toFixed(2),
          loan: (loanAmount / 30).toFixed(2),
          repairs: (repairsAmount / 30).toFixed(2),
          depreciation: (depreciationAmount / 30).toFixed(2),
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      setUser(response[0].user_id);
      setCosts(response[1])
      setLoggedIn(true)
      console.log(response[1])
      navigate('/addjob')
    } else {
      return
    }
  }


  switch(currentSlide){
    case 0:
      return (
        <div>
          <div className="headerContainer">
            <h1>Create an Account</h1>
          </div>
          <p>slide 1</p>
          <div className="btnContainer">
          
          <button onClick={() => {
            if(currentSlide !== 0)
              setCurrentSlide(currentSlide -1)
          }}>Back</button>
          <button onClick={() => {
            setCurrentSlide(currentSlide + 1)
          }}>Next</button>
          </div>
          <div className="headerContainer">
            <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
          </div>
        </div>)
      break;
      case 1:
        return(
          <div>
          <div className="headerContainer">
            <h1>Create an Account</h1>
          </div>
          <p>slide 2</p>

          <div className="headerContainer">
            <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
          </div>
        </div>
        )
      break;
      default:

  }

}
