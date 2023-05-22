import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CostsPage({ user, costs, setCosts, loggedIn }) {


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

  const openModal = (e) => {
    e.preventDefault()
    const modal = document.getElementById('modal')
    modal.style.display = 'block'
  }

  const updateCosts = async (e) => {

    e.preventDefault()

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
    const repairsValue = document.getElementById("repairs").value;
    const depreciationValue = document.getElementById("depreciation").value;

    const insurance = insuranceValue / 30
    const odc = odcValue / 100
    const payrollTax = payrollValue / 100
    const laborRate = laborValue / 100
    const dispatch = dispatchValue / 100
    const factor = factorValue / 100
    const loan = loanValue / 100
    const depreciation = depreciationValue / 100

    const newCostsObj = {
      insurance: insurance,
      tractorLease: tractorValue,
      trailerLease: trailerValue,
      dispatch: dispatch,
      mpg: mpgValue,
      laborRate: laborRate,
      payrollTax: payrollTax,
      factor: factor,
      odc: odc,
      gAndA: gAndAValue,
      loan: loan,
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

    const modal = document.getElementById("modal")
    modal.style.display = 'none'
  };

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h2>Current Costs Per Job</h2>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid',
        borderWidth: 2,
        borderRadius: 8, backgroundColor: 'white'
      }}>
        <div className="horizontalFormContainer">
          <div className="horizontalFormItem">
            <p>Insurance:</p>
            <CurrencyFormat
              value={costs?.insurance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>Tractor Lease:</p>
            <CurrencyFormat
              value={costs?.tractorLease}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              Tailer Lease:</p>
            <CurrencyFormat
              value={costs?.trailerLease}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              Labor Rate:</p>
            <CurrencyFormat
              value={costs?.laborRate * 100}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              Payroll Tax: </p>
            <CurrencyFormat
              value={(costs?.payrollTax * 100).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              Dispatch:</p>
            <CurrencyFormat
              value={costs?.dispatch * 100}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>MPG: {costs?.mpg}</p>
          </div>
          <div className="horizontalFormItem">
            <p>
              Factor:</p>
            <CurrencyFormat
              value={costs?.factor * 100}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              ODC:</p>
            <CurrencyFormat
              value={costs?.odc * 100}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"%"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p>
              G&A:</p>
            <CurrencyFormat
              value={costs?.gAndA}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p className="text">
              Loan: </p>
            <CurrencyFormat
              value={costs?.loan}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="horizontalFormItem">
            <p> Depreciation:</p>
            <CurrencyFormat
              value={costs?.depreciation}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              style={{ fontSize: 20 }}
            />
          </div>
        </div>
        <div className="btnContainer">
          <button className="btn1" onClick={openModal}>Edit Costs</button>
        </div>
      </div>
      <div className="modal" id="modal" style={{ display: 'none' }}>
        <div className="modalContent" id='modal-content' style={{ height: 700, width: 300 }}>
          <span className="close" id="close-modal" onClick={() => {
            const modal = document.getElementById('modal')
            modal.style.display = 'none';
          }}>&times;</span>
          <div className="headerContainer" style={{ backgroundColor: 'white' }}>
            <h2 >Edit Costs</h2>
          </div>
          <div className="formItem">
            <p htmlFor="insurance">Insurance payment amount:</p>
            <input
              id="insurance"
              className="costsInput"
              defaultValue={costs?.insurance}
              placeholder="Dollars per day"
            ></input>
          </div>
          <div className='formItem'>
            <p>Labor Rate as %</p>
            <input
              className="costsInput"
              id="labor"
              defaultValue={costs?.laborRate}
              placeholder="Percent as a decimal"
            ></input>
          </div>
          <div className='formItem'>
            <p >Payroll Tax as %</p>
            <input
              className="costsInput"
              id="payroll"
              defaultValue={costs?.payrollTax}
              placeholder="Payroll Tax"
            ></input>
          </div>
          <div className='formItem'>
            <p >Dispatch as %</p>
            <input
              className="costsInput"
              id="dispatch"
              defaultValue={costs?.dispatch}
              placeholder="Dispatch"
            ></input>
          </div>
          <div className='formItem'>
            <p >Factor as %</p>
            <input
              className="costsInput"
              id="factor"
              placeholder="Factor"
              defaultValue={costs?.factor}
            ></input>
          </div>
          <div className='formItem'>
            <p >ODC:</p>
            <input
              className="costsInput"
              id="odc"
              defaultValue={costs?.odc}
              placeholder="ODC"
            ></input>
          </div>
          <div className='formItem'>
            <p >Tractor Lease:</p>
            <input
              className="costsInput"
              id="tractor"
              defaultValue={costs?.tractorLease}
              placeholder="Tractor Lease"
            ></input>
          </div>
          <div className='formItem'>
            <p >Trailer Lease:</p>
            <input
              className="costsInput"
              id="trailer"
              defaultValue={costs?.trailerLease}
              placeholder="Trailer Lease"
            ></input>
          </div>
          <div className='formItem'>
            <p >G&A:</p>
            <input
              className="costsInput"
              id="g-and-a"
              defaultValue={costs?.gAndA}
              placeholder="G&A"
            ></input>
          </div>
          <div className='formItem'>
            <p >Monthly Loan Payment:</p>
            <input
              className="costsInput"
              id="loan"
              defaultValue={costs?.loan}
              placeholder="Loan"
            ></input>
          </div>
          <div className='formItem'>
            <p >Repairs:</p>
            <input
              className="costsInput"
              id="repairs"
              defaultValue={costs?.repairs}
              placeholder="Repairs"
            ></input>
          </div>
          <div className='formItem'>
            <p >Depreciation:</p>
            <input
              className="costsInput"
              id="depreciation"
              defaultValue={costs?.depreciation}
              placeholder="Depreciation"
            ></input>
          </div>
          <div className='formItem'>
            <p >MPG:</p>
            <input
              className="costsInput"
              id="mpg"
              defaultValue={costs?.mpg}
              placeholder="MPG"
            ></input>
          </div>
          <div className="btnContainer">
            <button className="btn1" onClick={updateCosts}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
