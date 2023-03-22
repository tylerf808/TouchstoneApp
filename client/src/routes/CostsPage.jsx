import {
  Button,
  Container,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
  Grid,
  Item,
  Modal
} from "@mui/material";
import { useEffect, useState } from "react";

export default function CostsPage({ user, costs, setCosts }) {

  const [showEditPrompt, setShowEditPrompt] = useState(false)
  const [insurance, setInsurance] = useState()

  const modalStyle = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '90%',
    backgroundColor: 'white'
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

    setOpen(false)

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
        marginTop: 3,
        borderRadius: 2,
        border: 1,
        width: "30%",
      }}
    >{showEditPrompt ?
      null : <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ margin: 2 }} variant="h5">
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
      </Container>}
      {showEditPrompt ? null : <Button sx={{ color: 'orange' }} onClick={handleOpen}>Edit Costs</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Costs
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <div>
            <FormLabel htmlFor="insurance">Insurance:</FormLabel>
            <TextField
              id="insurance"
              defaultValue={costs?.insurance}
              sx={{ margin: 2, width: 300 }}
              placeholder="Dollars per day"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="labor">Labor Rate:</FormLabel>
            <TextField
              className="costsInput"
              id="labor"
              defaultValue={costs?.laborRate}
              placeholder="Percent as a decimal"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="payroll">Payroll Tax:</FormLabel>
            <TextField
              className="costsInput"
              id="payroll"
              defaultValue={costs?.payrollTax}
              placeholder="Payroll Tax"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="dispatch">Dispatch:</FormLabel>
            <TextField
              className="costsInput"
              id="dispatch"
              defaultValue={costs?.dispatch}
              placeholder="Dispatch"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="factor">Factor:</FormLabel>
            <TextField
              className="costsInput"
              id="factor"
              placeholder="Factor"
              defaultValue={costs?.factor}
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="odc">ODC:</FormLabel>
            <TextField
              className="costsInput"
              id="odc"
              defaultValue={costs?.odc}
              placeholder="ODC"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="tractor">Tractor Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="tractor"
              defaultValue={costs?.tractorLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Tractor Lease"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="trailer">Trailer Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="trailer"
              defaultValue={costs?.trailerLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Trailer Lease"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="g-and-a">G&A:</FormLabel>
            <TextField
              className="costsInput"
              id="g-and-a"
              defaultValue={costs?.gAndA}
              placeholder="G&A"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="loan">Loan:</FormLabel>
            <TextField
              className="costsInput"
              id="loan"
              defaultValue={costs?.loan}
              placeholder="Loan"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="rental">Rental:</FormLabel>
            <TextField
              className="costsInput"
              id="rental"
              defaultValue={costs?.rental}
              placeholder="Rental"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="repairs">Repairs:</FormLabel>
            <TextField
              className="costsInput"
              id="repairs"
              defaultValue={costs?.repairs}
              placeholder="Repairs"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="depreciation">Depreciation:</FormLabel>
            <TextField
              className="costsInput"
              id="depreciation"
              defaultValue={costs?.depreciation}
              placeholder="Depreciation"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="mpg">MPG:</FormLabel>
            <TextField
              className="costsInput"
              id="mpg"
              defaultValue={costs?.mpg}
              placeholder="MPG"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          {costs ?
            <Button sx={{ color: 'orange' }} onClick={updateCosts}>Update</Button>
            : <Button onClick={addCosts}>Add Costs</Button>}

        </div>
        </div>
      </Modal>
      {/* {showEditPrompt ? (<>
        <Typography sx={{ margin: 2 }} variant="h5">
          Change Costs
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <div>
            <FormLabel htmlFor="insurance">Insurance:</FormLabel>
            <TextField
              id="insurance"
              defaultValue={costs?.insurance}
              sx={{ margin: 2, width: 300 }}
              placeholder="Dollars per day"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="labor">Labor Rate:</FormLabel>
            <TextField
              className="costsInput"
              id="labor"
              defaultValue={costs?.laborRate}
              placeholder="Percent as a decimal"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="payroll">Payroll Tax:</FormLabel>
            <TextField
              className="costsInput"
              id="payroll"
              defaultValue={costs?.payrollTax}
              placeholder="Payroll Tax"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="dispatch">Dispatch:</FormLabel>
            <TextField
              className="costsInput"
              id="dispatch"
              defaultValue={costs?.dispatch}
              placeholder="Dispatch"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="factor">Factor:</FormLabel>
            <TextField
              className="costsInput"
              id="factor"
              placeholder="Factor"
              defaultValue={costs?.factor}
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="odc">ODC:</FormLabel>
            <TextField
              className="costsInput"
              id="odc"
              defaultValue={costs?.odc}
              placeholder="ODC"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="tractor">Tractor Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="tractor"
              defaultValue={costs?.tractorLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Tractor Lease"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="trailer">Trailer Lease:</FormLabel>
            <TextField
              className="costsInput"
              id="trailer"
              defaultValue={costs?.trailerLease}
              sx={{ margin: 2, width: 300 }}
              placeholder="Trailer Lease"
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="g-and-a">G&A:</FormLabel>
            <TextField
              className="costsInput"
              id="g-and-a"
              defaultValue={costs?.gAndA}
              placeholder="G&A"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="loan">Loan:</FormLabel>
            <TextField
              className="costsInput"
              id="loan"
              defaultValue={costs?.loan}
              placeholder="Loan"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="rental">Rental:</FormLabel>
            <TextField
              className="costsInput"
              id="rental"
              defaultValue={costs?.rental}
              placeholder="Rental"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="repairs">Repairs:</FormLabel>
            <TextField
              className="costsInput"
              id="repairs"
              defaultValue={costs?.repairs}
              placeholder="Repairs"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="depreciation">Depreciation:</FormLabel>
            <TextField
              className="costsInput"
              id="depreciation"
              defaultValue={costs?.depreciation}
              placeholder="Depreciation"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          <div>
            <FormLabel htmlFor="mpg">MPG:</FormLabel>
            <TextField
              className="costsInput"
              id="mpg"
              defaultValue={costs?.mpg}
              placeholder="MPG"
              sx={{ margin: 2, width: 300 }}
            ></TextField>
          </div>
          {costs ?
            <Button sx={{ color: 'orange' }} onClick={updateCosts}>Update</Button>
            : <Button onClick={addCosts}>Add Costs</Button>}

        </div>
      </>) : null} */}
    </Container>
  );
}
