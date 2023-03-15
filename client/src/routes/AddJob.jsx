import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputLabel,
  Box,
  Alert,
  Input,
} from "@mui/material";
import { Container } from "@mui/system";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { CurrencyFormat } from "react-currency-format";
import { useNavigate } from "react-router-dom";

const library = ["places"];

export default function AddJob({ user, loggedIn, costs }) {
  const CurrencyFormat = require("react-currency-format");

  const [showJobBtn, setShowJobBtn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showProfit, setShowProfit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [profitable, setProfitable] = useState(false);
  const [job, setJob] = useState({});
  const statesArray = [];

  const navigate = useNavigate()

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



  const checkJob = async () => {
    setShowJobBtn(false);
    setShowLoading(true);

    const start = document.getElementById("origin").value;
    const pickUp = document.getElementById("pick-up").value;
    const dropOff = document.getElementById("drop-off").value;
    const pay = document.getElementById("revenue").value;
    const date = document.getElementById("date").value;

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

    const startPlaceId = geoStart.results[0].place_id;
    const pickUpPlaceId = geoPickUp.results[0].place_id;
    const dropOffPlaceId = geoDropOff.results[0].place_id;

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
        operatingProfitPercentage: ((pay / operationProfit) * 100).toFixed(2) + "%",
        netProfitPercentage: ((pay / totalCost) * 100).toFixed(2) + '%',
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
        payrollTax: (checkRes.payrollTax * (checkRes.laborRate * pay)).toFixed(2),
        netProfit: (pay - totalCost).toFixed(2),
        insurance: (checkRes.insurance).toFixed(2),
        dispatch: (pay * checkRes.dispatch).toFixed(2),
        laborRatePercent: (checkRes.laborRate * 100) + '%',
        trailer: checkRes.trailerLease,
        tractor: checkRes.tractorLease,
        totalFixedCost: (parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease)).toFixed(2),
        operatingProfit: (checkRes.operatingProfit * pay)
    
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
        operatingProfitPercentage: ((pay / operationProfit) * 100).toFixed(2) + "%",
        netProfitPercentage: ((pay / totalCost) * 100).toFixed(2) + '%',
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
        payrollTax: (checkRes.payrollTax * (checkRes.laborRate * pay)).toFixed(2),
        netProfit: (pay - totalCost).toFixed(2),
        insurance: (checkRes.insurance).toFixed(2),
        dispatch: (pay * checkRes.dispatch).toFixed(2),
        laborRatePercent: (checkRes.laborRate * 100) + '%',
        trailer: checkRes.trailerLease,
        tractor: checkRes.tractorLease,
        totalFixedCost: (parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease) + parseFloat(checkRes.tractorLease)).toFixed(2),
        operatingProfit: (checkRes.operatingProfit * pay)
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
    console.log(JSON.stringify(job))
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
    <div style={{ backgroundColor: 'orange', height: '100vh' }}>
      <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Container sx={{
          display: "flex",
          flexDirection: "rows",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}>
          <Container sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid', marginTop: 2,
            borderWidth: 2,
            borderRadius: 3, backgroundColor: 'white'
          }}>
            <Typography sx={{ marginTop: 3 }} variant="h5">Check Job</Typography>
            {showAlert ?
              <Alert sx={{ marginTop: 2 }} severity="error">
                {alertMsg}
              </Alert> : null}
            <Box sx={{ margin: 5 }}>
              <InputLabel sx={{}}>Start</InputLabel>
              <Autocomplete>
                <TextField id="origin"></TextField>
              </Autocomplete>
            </Box>
            <Box sx={{ margin: 5 }}>
              <InputLabel>Pick Up</InputLabel>
              <Autocomplete>
                <TextField id="pick-up"></TextField>
              </Autocomplete>
            </Box>
            <Box sx={{ margin: 5 }}>
              <InputLabel>Drop Off</InputLabel>
              <Autocomplete>
                <TextField id="drop-off"></TextField>
              </Autocomplete>
            </Box>
            <Box sx={{ margin: 5 }}>
              <InputLabel>Revenue</InputLabel>
              <TextField placeholder="Enter a dollar amount" id="revenue" />
            </Box>
            <Box sx={{ margin: 5 }}>
              <InputLabel>Date</InputLabel>
              <Input type="date" id="date"></Input>
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: 2
            }}>
              {costs ? <Button sx={{ color: "orange" }} onClick={checkJob}>Check Job</Button> : null}
            </Box>
          </Container>
        </Container>
        <Box sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>

        </Box>
        <Container sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 'solid',
          borderWidth: 2,
          borderRadius: 3, marginTop: 2, backgroundColor: 'white'
        }}>
          <Typography sx={{ marginTop: 3 }} variant="h5">Profitability</Typography>
          {showLoading ? <CircularProgress sx={{ marginTop: 5, color: 'orange' }} /> : null}
          {showProfit ? (
            <Container sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
                <Container sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  {profitable ? 
                  <Typography variant="h5" sx={{ marginBottom: 1, color: 'green', alignSelf: 'center' }}>
                    Job is Profitable
                  </Typography> : 
                  <Typography variant="h5" sx={{ marginBottom: 1, color: 'red', alignSelf: 'center' }}>
                  Job is NOT Profitable
                </Typography> }
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Labor: </Typography>
                    <CurrencyFormat
                      value={job?.labor}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Payroll Tax: </Typography>
                    <CurrencyFormat
                      value={job?.payrollTax}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Dispatch: </Typography>
                    <CurrencyFormat
                      value={job?.dispatch}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Factor: </Typography>
                    <CurrencyFormat
                      value={job?.factor}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Fuel: </Typography>
                    <CurrencyFormat
                      value={job?.gasCost}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>ODC: </Typography>
                    <CurrencyFormat
                      value={job?.odc}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ alignSelf: 'flex-start' }}>Fixed Costs: </Typography>
                    <CurrencyFormat
                      value={parseFloat(job?.totalFixedCost)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ------------
                  </Typography>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ marginRight: 2 }}>Gross Profit Percent:</Typography>
                    <CurrencyFormat
                      value={job?.grossProfitPercentage}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"%"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ marginRight: 2 }}>
                      Operating Profit Percent:
                    </Typography>
                    <CurrencyFormat
                      value={job?.operatingProfitPercentage}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"%"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                    <Typography sx={{ marginRight: 2 }}>Net Profit Percent:</Typography>
                    <CurrencyFormat
                      value={job?.netProfitPercentage}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"%"} />
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}>
                    <Typography sx={{ marginRight: 2 }}>Net Profit</Typography>
                    <CurrencyFormat
                      value={job?.netProfit}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"} />
                  </Box>

                  <Box sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <Typography>Milage: {job?.distance}</Typography>
                    <Typography>Rate Per Mile: {job?.ratePerMile}</Typography>
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 3
                  }}>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: 2
                    }}>
                      {profitable ? <Button sx={{ color: 'orange' }} onClick={addJob}>Add Job</Button> : null }
                      <Button sx={{ color: 'orange' }} onClick={clearForm}>Clear</Button>
                    </Box>
                  </Box>
                </Container>
            </Container>
          ) : null}
        </Container>
      </Container>
    </div>
  );
}