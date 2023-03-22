import { CircularProgress, Alert } from "@mui/material";
import { Container } from "@mui/system";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { CurrencyFormat } from "react-currency-format";
import { useNavigate } from "react-router-dom";

const library = ["places"];

export default function AddJob({ user, loggedIn, costs, styles }) {
  const CurrencyFormat = require("react-currency-format");

  const [showJobBtn, setShowJobBtn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showProfit, setShowProfit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [profitable, setProfitable] = useState(false);
  const [job, setJob] = useState({});
  const statesArray = [];

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDcXIOrxmAOOPEvqjLEXVeZb9mdTyUqS6k",
    libraries: library,
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const checkJob = async () => {
    setShowJobBtn(false);
    setShowLoading(true);

    const start = document.getElementById("origin").value;
    const pickUp = document.getElementById("pick-up").value;
    const dropOff = document.getElementById("drop-off").value;
    const pay = document.getElementById("revenue").value;
    const date = document.getElementById("date").value;
    const client = document.getElementById("client").value;
    const driver = document.getElementById("driver").value;

    setAlertMsg("");
    setShowAlert(false);
    setShowProfit(false);

    if (
      start === "" ||
      pickUp === "" ||
      dropOff === "" ||
      pay === "" ||
      date === ""
    ) {
      setAlertMsg("Missing an entry");
      setShowAlert(true);
      setShowLoading(false);
      return;
    }

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

    if (checkRes.message) {
      setAlertMsg("Please add costs in the costs page");
      setShowAlert(true);
      setShowLoading(false);
      return;
    }

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
      setShowProfit(true);
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
      setShowProfit(true);
      setProfitable(true);
    }
  };

  const clearForm = () => {
    setShowJobBtn(false);
    setShowProfit(false);
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
    setShowProfit(false);
    document.getElementById("origin").value = "";
    document.getElementById("pick-up").value = "";
    document.getElementById("drop-off").value = "";
    document.getElementById("revenue").value = "";
    document.getElementById("date").value = "";
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: '50%' , margin: 8}}>
        <label for='start'>Start</label>
        <Autocomplete>
          <input style={{width: '65%'}} name="start" id="start" type="text" />
        </Autocomplete>
      </div>
      <div style={{width: '50%' , margin: 8}}>
        <label for='pickUp'>Pick Up</label>
        <Autocomplete>
          <input style={{width: '65%'}} name="pickUp" id="pickUp" type="text" />
        </Autocomplete>
      </div>
      <div style={{width: '50%' , margin: 8}}>
        <label for='dropOff'>Drop Off</label>
        <Autocomplete>
          <input style={{width: '65%'}}  name="dropOff" id="dropOff" type="text" />
        </Autocomplete>
      </div>

    </div>
    /*
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <header>Check Job</header>
        {showAlert ? <Alert severity="error">{alertMsg}</Alert> : null}
     
          <label >Start</label>
          <Autocomplete>
            <input style={{width: '90%'}} type="text" id="origin"></input>
          </Autocomplete>
       
        <div>
          <label>Pick Up</label>
          <Autocomplete>
            <input id="pick-up"></input>
          </Autocomplete>
        </div>
        <div>
          <label>Drop Off</label>
          <Autocomplete>
            <input id="drop-off"></input>
          </Autocomplete>
        </div>
        <div>
          <label>Revenue</label>
          <input placeholder="Enter a dollar amount" id="revenue" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" id="date"></input>
        </div>
        <div>
          <label>Client</label>
          <input type="text" id="client"></input>
        </div>
        <div>
          <label>Driver</label>
          <input type="text" id="driver"></input>
        </div>
        <div>
          {costs ? <button onClick={checkJob}>Check Job</button> : null}
        </div>

        <div>
          <header style={{ marginTop: 3 }}>Profitability</header>
          {showLoading ? (
            <CircularProgress sx={{ marginTop: 5, color: "blue" }} />
          ) : null}
          {showProfit ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {profitable ? (
                  <header
                    style={{
                      marginBottom: 1,
                      color: "green",
                      alignSelf: "center",
                    }}
                  >
                    Job is Profitable
                  </header>
                ) : (
                  <header
                    style={{
                      marginBottom: 1,
                      color: "red",
                      alignSelf: "center",
                    }}
                  >
                    Job is NOT Profitable
                  </header>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Labor: </p>
                  <CurrencyFormat
                    value={job?.labor}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Payroll Tax: </p>
                  <CurrencyFormat
                    value={job?.payrollTax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Dispatch: </p>
                  <CurrencyFormat
                    value={job?.dispatch}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Factor: </p>
                  <CurrencyFormat
                    value={job?.factor}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Fuel: </p>
                  <CurrencyFormat
                    value={job?.gasCost}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Tolls: </p>
                  <CurrencyFormat
                    value={job?.tolls}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>ODC: </p>
                  <CurrencyFormat
                    value={job?.odc}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ alignSelf: "flex-start" }}>Fixed Costs: </p>
                  <CurrencyFormat
                    value={parseFloat(job?.totalFixedCost)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <p style={{ fontWeight: "bold" }}>------------</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginRight: 2 }}>Gross Profit Percent:</p>
                  <CurrencyFormat
                    value={job?.grossProfitPercentage}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"%"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginRight: 2 }}>Operating Profit Percent:</p>
                  <CurrencyFormat
                    value={job?.operatingProfitPercentage}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"%"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ marginRight: 2 }}>Net Profit Percent:</p>
                  <CurrencyFormat
                    value={job?.netProfitPercentage}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"%"}
                  />
                </div>
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p sx={{ marginRight: 2 }}>Net Profit</p>
                  <CurrencyFormat
                    value={job?.netProfit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>

                <div
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p>Milage: {job?.distance}</p>
                  <p>Rate Per Mile: {job?.ratePerMile}</p>
                </div>
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 3,
                  }}
                >
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: 2,
                    }}
                  >
                    {profitable ? (
                      <button onClick={addJob}>Add Job</button>
                    ) : null}
                    <button onClick={clearForm}>Clear</button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>*/
  )
}
