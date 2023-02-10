import {
  Button,
  Container,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function CostsPage({ user, costs, setCosts }) {

  const [showEditPrompt, setShowEditPrompt] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCosts(data[0]))
      .catch((err) => setCosts(false))
  }, []);

  const CurrencyFormat = require("react-currency-format");


  const addCosts = async () => {
    const insuranceValue = document.getElementById("insurance").value;
    const tractorValue = document.getElementById("tractor").value;
    const trailerValue = document.getElementById("trailer").value;
    const mpgValue = document.getElementById("mpg").value;
    const laborValue = document.getElementById("labor").value;
    const payrollValue = document.getElementById("payroll").value;
    const dispatchValue = document.getElementById("dispatch").value;
    const factorValue = document.getElementById("factor").value;
    const odcValue = document.getElementById("odc").value;
    const gAndAValue = document.getElementById("g-and-a").value;
    const loanValue = document.getElementById("loan").value;
    const rentalValue = document.getElementById("rental").value;
    const repairsValue = document.getElementById("repairs").value;
    const depreciationValue = document.getElementById("depreciation").value;

    const costsObj = {
      insurance: insuranceValue,
      tractorLease: tractorValue,
      trailerLease: trailerValue,
      laborRate: laborValue,
      payrollTax: payrollValue,
      dispatch: dispatchValue,
      mpg: mpgValue,
      factor: factorValue,
      odc: odcValue,
      gAndA: gAndAValue,
      loan: loanValue,
      rental: rentalValue,
      repairs: repairsValue,
      depreciation: depreciationValue,
      user_id: user,
    };

    await fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "POST",
      body: JSON.stringify(costsObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    await fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCosts(data[0]));

      setShowEditPrompt(false)
  };

  const updateCosts = async () => {

    const insuranceValue = document.getElementById("insurance").value;
    const tractorValue = document.getElementById("tractor").value;
    const trailerValue = document.getElementById("trailer").value;
    const mpgValue = document.getElementById("mpg").value;
    const laborValue = document.getElementById("labor").value;
    const payrollValue = document.getElementById("payroll").value;
    const dispatchValue = document.getElementById("dispatch").value;
    const factorValue = document.getElementById("factor").value;
    const odcValue = document.getElementById("odc").value;
    const gAndAValue = document.getElementById("g-and-a").value;
    const loanValue = document.getElementById("loan").value;
    const rentalValue = document.getElementById("rental").value;
    const repairsValue = document.getElementById("repairs").value;
    const depreciationValue = document.getElementById("depreciation").value;

    const newCostsObj = {
      insurance: insuranceValue,
      tractorLease: tractorValue,
      trailerLease: trailerValue,
      dispatch: dispatchValue,
      mpg: mpgValue,
      laborRate: laborValue,
      payrollTax: payrollValue,
      factor: factorValue,
      odc: odcValue,
      gAndA: gAndAValue,
      loan: loanValue,
      rental: rentalValue,
      repairs: repairsValue,
      depreciation: depreciationValue,
    };

    await fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "PUT",
      body: JSON.stringify(newCostsObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    await fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCosts(data[0]));

    setShowEditPrompt(false)
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >{costs ?
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Current Costs
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Insurance:{" "}
          <CurrencyFormat
            value={costs?.insurance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Tractor Lease:{" "}
          <CurrencyFormat
            value={costs?.tractorLease}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Tailer Lease:{" "}
          <CurrencyFormat
            value={costs?.trailerLease}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Labor Rate:{" "}
          <CurrencyFormat
            value={costs?.laborRate * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Payroll Tax:{" "}
          <CurrencyFormat
            value={costs?.payrollTax * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Dispatch:{" "}
          <CurrencyFormat
            value={costs?.dispatch * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>MPG: {costs?.mpg}</Typography>
        <Typography sx={{ marginTop: 1 }}>
          Factor:{" "}
          <CurrencyFormat
            value={costs?.factor * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          ODC:{" "}
          <CurrencyFormat
            value={costs?.odc * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          G&A:{" "}
          <CurrencyFormat
            value={costs?.gAndA * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Loan:{" "}
          <CurrencyFormat
            value={costs?.loan * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          rental:{" "}
          <CurrencyFormat
            value={costs?.rental * 100}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"%"}
          />
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Depreciation:{" "}
          <CurrencyFormat
            value={costs?.depreciation}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </Typography>
      </Container> : <Typography>No Costs</Typography>}
      <Button onClick={() => setShowEditPrompt(true)}>Edit Costs</Button>
      {showEditPrompt ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: 2 }} variant="h5">
            Create/Update Costs
          </Typography>
          <FormGroup>
            <FormLabel htmlFor="insurance">Insurance:</FormLabel>
            <TextField
              id="insurance"
              defaultValue={costs?.insurance}
              sx={{ margin: 2, width: 300 }}
              placeholder="Dollars per day"
            ></TextField>
            <FormLabel htmlFor="labor">Labor Rate:</FormLabel>
            <TextField
              className="costsInput"
              id="labor"
              defaultValue={costs?.laborRate}
              placeholder="Percent as a decimal"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="payroll">Payroll Tax:</FormLabel>
            <TextField
              className="costsInput"
              id="payroll"
              defaultValue={costs?.payrollTax}
              placeholder="Payroll Tax"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="dispatch">Dispatch:</FormLabel>
            <TextField
              className="costsInput"
              id="dispatch"
              defaultValue={costs?.dispatch}
              placeholder="Dispatch"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="factor">Factor:</FormLabel>
            <TextField
              className="costsInput"
              id="factor"
              placeholder="Factor"
              defaultValue={costs?.factor}
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="odc">ODC:</FormLabel>
            <TextField
              className="costsInput"
              id="odc"
              defaultValue={costs?.odc}
              placeholder="ODC"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="tractor">Tractor Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="tractor"
              defaultValue={costs?.tractorLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Tractor Lease"
            ></TextField>
            <FormLabel htmlFor="trailer">Trailer Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="trailer"
              defaultValue={costs?.trailerLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Trailer Lease"
            ></TextField>
            <FormLabel htmlFor="g-and-a">G&A:</FormLabel>
            <TextField
              className="costsInput"
              id="g-and-a"
              defaultValue={costs?.gAndA}
              placeholder="G&A"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="loan">Loan:</FormLabel>
            <TextField
              className="costsInput"
              id="loan"
              defaultValue={costs?.loan}
              placeholder="Loan"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="rental">Rental:</FormLabel>
            <TextField
              className="costsInput"
              id="rental"
              defaultValue={costs?.rental}
              placeholder="Rental"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="repairs">Repairs:</FormLabel>
            <TextField
              className="costsInput"
              id="repairs"
              defaultValue={costs?.repairs}
              placeholder="Repairs"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="depreciation">Depreciation:</FormLabel>
            <TextField
              className="costsInput"
              id="depreciation"
              defaultValue={costs?.depreciation}
              placeholder="Depreciation"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            <FormLabel htmlFor="mpg">MPG:</FormLabel>
            <TextField
              className="costsInput"
              id="mpg"
              defaultValue={costs?.mpg}
              placeholder="MPG"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
            {costs ? 
            <Button onClick={updateCosts}>Update</Button>
            : <Button onClick={addCosts}>Add Costs</Button> }
          </FormGroup>
        </Container>
      ) : null}

    </Container>
  );
}
