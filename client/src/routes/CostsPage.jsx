import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CostsPage({ user, costs, setCosts, loggedIn }) {

  const [edit, setEdit] = useState(false)
  const [insuranceValue, setInsuranceValue] = useState()
  const [tractorValue, setTractorValue] = useState()
  const [trailerValue, setTrailerValue] = useState()
  const [mpgValue, setMpgValue] = useState()
  const [laborValue, setLaborValue] = useState()
  const [payrollValue, setPayrollValue] = useState()
  const [dispatchValue, setDispatchValue] = useState()
  const [factorValue, setFactorValue] = useState()
  const [odcValue, setOdcValue] = useState()
  const [gAndAValue, setGAndAValue] = useState()
  const [loanValue, setLoanValue] = useState()
  const [repairsValue, setRepairsValue] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/')
    }
    fetch("http://localhost:3001/api/costs?id=" + user, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCosts(data[0]))
      .catch((err) => setCosts(false))
  }, []);

  const updateCosts = async () => {

    const insurance = insuranceValue / 30
    const odc = odcValue / 100
    const payrollTax = payrollValue / 100
    const laborRate = laborValue / 100
    const dispatch = dispatchValue / 100
    const factor = factorValue / 100
    const loan = loanValue / 100

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
  };

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <h2>Current Costs Per Job</h2>
      </div>
      <div className="costsContainer">
        <div className="costsHeaderContainer">
          <h1>Operating Costs</h1>
        </div>
        <div className="operatingCostsContainer">
          <div className="costsItem">
            <p className="costsLabel">Insurance:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setInsuranceValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}
          </div>
          <div className="costsItem">
            <p className="costsLabel">Tractor Lease:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input value={costs?.tractorLease} type="number" className="costsInput" onChange={(e) => setTractorValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>
            }
          </div>
          <div className="costsItem">
            <p className="costsLabel">Tailer Lease:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setTrailerValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">G&A:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setGAndAValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
        </div>
        <div className="costsHeaderContainer">
          <h1>Fixed Costs</h1>
        </div>
        <div className="fixedCostsContainer">
          <div className="costsItem">
            <p className="costsLabel">Labor Rate:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setLaborValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">Payroll Tax:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setPayrollValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">Dispatch:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput" onChange={(e) => setDispatchValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">MPG:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput"  onChange={(e) => setMpgValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">Factor:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput"  onChange={(e) => setFactorValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">ODC:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput"  onChange={(e) => setOdcValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
          <div className="costsItem">
            <p className="costsLabel">Loan:</p>
            {edit ?
              <div className="costsInputContainer">
                <p>$</p><input type="number" className="costsInput"  onChange={(e) => setLoanValue(e.target.value)}></input>
              </div>
              :
              <p className='costsNum'>$ {costs?.insurance}</p>}          </div>
        </div>
      </div>
      <div className="btnContainer">
        {edit ?
          <button className="checkJobBtn" onClick={() => {
            updateCosts()
            setEdit(false)
          }}>Update</button>
          :
          <button className="checkJobBtn" onClick={() => {
            setEdit(true)
          }}>Edit Costs</button>}
      </div>
    </div>
  );
}
