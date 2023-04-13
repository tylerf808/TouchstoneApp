import { CircularProgress, Alert, Modal, Box } from "@mui/material";
import { Container } from "@mui/system";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { CurrencyFormat } from "react-currency-format";
import { useNavigate } from "react-router-dom";


export default function AddJob({ user, loggedIn, setShowAlert, setAlertMsg, library }) {
  const CurrencyFormat = require("react-currency-format");

  const [showJobBtn, setShowJobBtn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [profitable, setProfitable] = useState(false);
  const [job, setJob] = useState({});
  const statesArray = [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/')
    }
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDcXIOrxmAOOPEvqjLEXVeZb9mdTyUqS6k",
    libraries: library,
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const checkJob = async (e) => {

    e.preventDefault()

    const start = document.getElementById("start").value;
    const pickUp = document.getElementById("pick-up").value;
    const dropOff = document.getElementById("drop-off").value;
    const pay = document.getElementById("revenue").value;
    const date = document.getElementById("date").value;
    const client = document.getElementById("client").value;
    const driver = document.getElementById("driver").value;

    setAlertMsg("");
    setShowAlert(false);
    setShowResults(false);

    if (
      start === "" ||
      pickUp === "" ||
      dropOff === "" ||
      pay === "" ||
      date === "" ||
      client === '' ||
      driver === ''
    ) {
      setAlertMsg("Missing an entry");
      setShowAlert(true);
      setShowLoading(false);
      return;
    }

    handleOpen()
    setShowJobBtn(false);
    setShowLoading(true);

    const geocoder = new window.google.maps.Geocoder();

    const geoStart = await geocoder.geocode({ address: start });
    const geoPickUp = await geocoder.geocode({ address: pickUp });
    const geoDropOff = await geocoder.geocode({ address: dropOff });

    statesArray.push(geoStart.results[0].address_components[4].short_name);
    statesArray.push(geoPickUp.results[0].address_components[4].short_name);
    statesArray.push(geoDropOff.results[0].address_components[4].short_name);

    const checkRes = await fetch(
      "http://localhost:3001/api/costs/check?id=" +
      user +
      "&start=" +
      start +
      "&pick_up=" +
      pickUp +
      "&drop_off=" +
      dropOff +
      "&state1=" +
      statesArray[0] +
      "&state2=" +
      statesArray[1] +
      "&state3=" +
      statesArray[2]
    ).then((data) => data.json());

    const grossProfit =
      checkRes.odc * pay +
      checkRes.factor * pay +
      checkRes.laborRate * pay +
      checkRes.payrollTax * pay +
      checkRes.dispatch * pay +
      checkRes.gasCost;
    const operationProfit =
      checkRes.insurance +
      checkRes.tractorLease +
      checkRes.trailerLease +
      checkRes.gAndA * pay;
    const netProfit =
      checkRes.depreciation +
      checkRes.repairs * pay +
      checkRes.rental * pay +
      checkRes.loan * pay;
    const totalCost = operationProfit + grossProfit + netProfit;

    setShowLoading(false);

    if (totalCost > pay) {
      setJob({
        start: start,
        pickUp: pickUp,
        dropOff: dropOff,
        revenue: pay,
        grossProfitPercentage: ((pay / grossProfit) * 100).toFixed(2) + "%",
        operatingProfitPercentage:
          ((pay / operationProfit) * 100).toFixed(2) + "%",
        netProfitPercentage: ((pay / totalCost) * 100).toFixed(2) + "%",
        distance: checkRes.distance,
        date: date,
        user_id: user,
        gasCost: checkRes.gasCost,
        depreciation: checkRes.depreciation,
        factor: (checkRes.factor * pay).toFixed(2),
        gAndA: (checkRes.gAndA * pay).toFixed(2),
        loan: (checkRes.loan * pay).toFixed(2),
        odc: (checkRes.odc * pay).toFixed(2),
        rental: (checkRes.rental * pay).toFixed(2),
        repairs: (checkRes.repairs * pay).toFixed(2),
        ratePerMile: (pay / checkRes.distance).toFixed(2),
        labor: (checkRes.laborRate * pay).toFixed(2),
        payrollTax: (checkRes.payrollTax * (checkRes.laborRate * pay)).toFixed(
          2
        ),
        netProfit: (pay - totalCost).toFixed(2),
        insurance: checkRes.insurance.toFixed(2),
        dispatch: (pay * checkRes.dispatch).toFixed(2),
        laborRatePercent: checkRes.laborRate * 100 + "%",
        trailer: checkRes.trailerLease,
        tractor: checkRes.tractorLease,
        totalFixedCost: (
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease)
        ).toFixed(2),
        operatingProfit: checkRes.operatingProfit * pay,
        tolls: checkRes.tolls,
        client: client,
        driver: driver,
        driveTime: checkRes.duration,
      });
      setProfitable(false);
      setShowJobBtn(false);
      setShowResults(true);
    } else {
      setJob({
        start: start,
        pickUp: pickUp,
        dropOff: dropOff,
        revenue: pay,
        grossProfitPercentage: ((pay / grossProfit) * 100).toFixed(2) + "%",
        operatingProfitPercentage:
          ((pay / operationProfit) * 100).toFixed(2) + "%",
        netProfitPercentage: ((pay / totalCost) * 100).toFixed(2) + "%",
        distance: checkRes.distance,
        date: date,
        client: client,
        driver: driver,
        driveTime: checkRes.duration.standard,
        user_id: user,
        gasCost: checkRes.gasCost,
        depreciation: checkRes.depreciation,
        factor: (checkRes.factor * pay).toFixed(2),
        gAndA: (checkRes.gAndA * pay).toFixed(2),
        loan: (checkRes.loan * pay).toFixed(2),
        odc: (checkRes.odc * pay).toFixed(2),
        rental: (checkRes.rental * pay).toFixed(2),
        repairs: (checkRes.repairs * pay).toFixed(2),
        ratePerMile: (pay / checkRes.distance).toFixed(2),
        labor: (checkRes.laborRate * pay).toFixed(2),
        payrollTax: (checkRes.payrollTax * (checkRes.laborRate * pay)).toFixed(
          2
        ),
        netProfit: (pay - totalCost).toFixed(2),
        insurance: checkRes.insurance.toFixed(2),
        dispatch: (pay * checkRes.dispatch).toFixed(2),
        laborRatePercent: checkRes.laborRate * 100 + "%",
        trailer: checkRes.trailerLease,
        tractor: checkRes.tractorLease,
        totalFixedCost: (
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease) +
          parseFloat(checkRes.tractorLease)
        ).toFixed(2),
        operatingProfit: checkRes.operatingProfit * pay,
        tolls: checkRes.tolls,
      });
      setShowJobBtn(true);
      setShowResults(true);
      setProfitable(true);
    }
  };

  const clearForm = () => {
    setShowJobBtn(false);
    setShowResults(false);
    document.getElementById("origin").value = "";
    document.getElementById("pick-up").value = "";
    document.getElementById("drop-off").value = "";
    document.getElementById("revenue").value = "";
    document.getElementById("date").value = "";
  };

  const addJob = async () => {
    console.log(JSON.stringify(job));
    await fetch("http://localhost:3001/api/jobs", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setShowJobBtn(false);
    setShowResults(false);
    document.getElementById("origin").value = "";
    document.getElementById("pick-up").value = "";
    document.getElementById("drop-off").value = "";
    document.getElementById("revenue").value = "";
    document.getElementById("date").value = "";
  };

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h2>Check Job</h2>
      </div>
      <form className="verticalFormContainer">
        <div className="formItem">
          <label htmlFor='start'>Start</label>
          <Autocomplete className="inputContainer">
            <input className="textInput" name="start" id="start" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <label htmlFor='pickUp'>Pick Up</label>
          <Autocomplete className="inputContainer">
            <input className="textInput" name="pickUp" id="pick-up" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <label htmlFor='dropOff'>Drop Off</label>
          <Autocomplete className="inputContainer">
            <input className="textInput" name="dropOff" id="drop-off" type="text" />
          </Autocomplete>
        </div>
        <div className="formItem">
          <label htmlFor="revenue">Revenue</label>
          <div className="inputContainer" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p style={{ fontSize: 20 }}>$</p>
            <input className="textInput" style={{ width: 150, marginLeft: 0 }} type='number' placeholder="Enter Dollar Amount" name="revenue" id='revenue' />
          </div>
        </div>
        <div className="formItem">
          <label htmlFor="date">Date</label>
          <div className="inputContainer">
            <input className="textInput" style={{ width: 120 }} type='date' name="date" id='date' />
          </div>
        </div>
        <div className="formItem">
          <label htmlFor="client">Client</label>
          <div className="inputContainer">
            <input className="textInput" id="client" placeholder="Enter Clients Name" name="client" ></input>
          </div>
        </div>
        <div className="formItem">
          <label htmlFor="driver">Driver</label>
          <div className="inputContainer">
            <input className="textInput" id="driver" name="driver" placeholder='Enter Drivers Name' ></input>
          </div>
        </div>
        <button className="checkJobBtn" onClick={checkJob} >Check Job</button>
      </form>
      <Modal open={open} onClose={handleClose} >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 3
        }}>
        </Box>
      </Modal>
    </div >
  )
}
