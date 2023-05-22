import { useState } from "react";
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
              <input onChange={(e) => setEmail(e.target.value)} value={email} id="email-signup" className="textInput" type="email" />
              <p className="slideLabel">Password:</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} id="password-signup" className="textInput" type="password" />
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
              <p style={{ margin: 8, fontSize: 20}}>On the next several pages you'll be asked to input your costs for your operation.</p>
              <p style={{ margin: 8, fontSize: 20}}>Some will be percentages
                and some will be fixed costs. These costs will be used to calculate profitability on your new jobs.</p>
              <p style={{ margin: 8, fontSize: 20}}> Fuel costs and
                tolls are calculated by the system based on the route.
              </p>
            </div>
          </Slide>
          <Slide className="slide" index={2}>
            <div className="slideItem">
              <p className="slideLabel">How often do you pay insurance?</p>
              <select value={insuranceFreq} onChange={(e) => setInsuranceFreq(e.target.value)}>
                <option value='monthly'>Monthly</option>
                <option value='bi-monthly'>Bi-Monthly</option>
                <option value='quarterly'>Quarterly</option>
                <option value='annually'>Annually</option>
              </select>
            </div>
            <div className="slideItem">
              <p className="slideLabel">How much is you insurance payment?</p>
              <input onChange={(e) => setInsuranceAmount(e.target.value)} value={insuranceAmount} id="insurance-amount" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={3}>
            <div className="slideItem">
              <p className="slideLabel">Enter your monthly tractor lease payment.</p>
              <input onChange={(e) => setTractorAmount(e.target.value)} value={tractorAmount} id="tractor-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter your monthly trailer lease payment.</p>
              <input onChange={(e) => setTrailerAmount(e.target.value)} value={trailerAmount} id='trailer-amount' className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter dispatch fee as percentage of revenue.</p>
              <input onChange={(e) => setDispatchAmount(e.target.value)} value={dispatchAmount} id='dispatch-amount' className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
          </Slide>
          <Slide className="slide" index={4}>
            <div className="slideItem">
              <p className="slideLabel">Enter factor fee as percentage of revenue.</p>
              <input onChange={(e) => setFactorAmount(e.target.value)} value={factorAmount} id="factor-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter other direct costs (ODC) as a percentage to cover incidental costs.</p>
              <input onChange={(e) => setOdcAmount(e.target.value)} value={odcAmount} id="odc-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">Enter monthly loan payments if any.</p>
              <input onChange={(e) => setLoanAmount(e.target.value)} value={loanAmount} id="loan-amount" className="newCostInput" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={5}>
            <div className="slideItem">
              <p className="slideLabel">How much do you spend on average for repairs each month?</p>
              <input onChange={(e) => setRepairsAmount(e.target.value)} value={repairsAmount} id="repairs-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">How much do you put aside for depreciation each month?</p>
              <input onChange={(e) => setDepreciationAmount(e.target.value)} value={depreciationAmount} id="depreciation-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What is your MPG?</p>
              <input onChange={(e) => setMpgAmount(e.target.value)} value={mpgAmount} id="mpg-amount" className="newCostInput" type='number'></input>
            </div>
          </Slide>
          <Slide className="slide" index={6}>
            <div className="slideItem">
              <p className="slideLabel">How much do you spend on average on G&A each month?</p>
              <input onChange={(e) => setGandaAmount(e.target.value)} value={gandaAmount} id="ganda-amount" className="newCostInput" type='number'></input>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What is your labor rate?</p>
              <input onChange={(e) => setLaborAmount(e.target.value)} value={laborAmount} id="labor-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
            </div>
            <div className="slideItem">
              <p className="slideLabel">What percentage do you pay in payroll tax?</p>
              <input onChange={(e) => setPayrollAmount(e.target.value)} value={payrollAmount} id="payroll-amount" className="newCostInput percentageInput" type='number'></input><p className="percentageSign">%</p>
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
