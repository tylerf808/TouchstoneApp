import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function CreateCosts({ user, setCosts }) {

    const [insuranceType, setInsuranceType] = useState('')

    const navigate = useNavigate()

    const createCosts = async (e) => {

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
        const rentalValue = document.getElementById("rental").value;
        const repairsValue = document.getElementById("repairs").value;
        const depreciationValue = document.getElementById("depreciation").value;

        let insurance

        switch (insuranceType) {
            case 'weekly':
                insurance = insuranceValue / 7
                break;
            case 'bi-weekly':
                insurance = insuranceValue / 14
                break;
            case 'monthly':
                insurance = insuranceValue / 30
                break;
            default:
                insurance = insuranceValue / 365
                break;
        }

        const costsObj = {
            insurance: insurance,
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

        navigate('/dashboard')
    }

    return (
        <div className="pageContainer">
            <div className="headerContainer">
                <h2 className="">Add your expenses</h2>
            </div>
            <form className="verticalFormContainer">
                <div className="formItem">
                    <label htmlFor="dispatch">Dispatch:</label>
                    <input
                        className="costsInput"
                        id="dispatch"
                        placeholder="Dispatch"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="factor">Factor:</label>
                    <input
                        className="costsInput"
                        id="factor"
                        placeholder="Factor"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="insurance-type">How often do you pay insurance?</label>
                    <div className="radioMenu">
                        <div>
                            <label htmlFor="weekly">Weekly</label>
                            <input onClick={(e) => {
                                setInsuranceType(e.target.value)
                            }} className="radioBtn" name="insurance-type" id="weekly" type="radio"></input>
                        </div>
                        <div>
                            <label htmlFor="bi-weekly">Bi-Weekly</label>
                            <input className="radioBtn" name="insurance-type" id="bi-weekly" type="radio"></input>
                        </div>
                        <div>
                            <label htmlFor="monthly">Monthly</label>
                            <input className="radioBtn" name="insurance-type" id="monthly" type="radio"></input>
                        </div>
                        <div>
                            <label htmlFor="annually">Annually</label>
                            <input className="radioBtn" name="insurance-type" id="annually" type="radio"></input>
                        </div>
                    </div>
                </div>
                <div className="formItem">
                    <label htmlFor="insurance">How much per each insurance payment?</label>
                    <div className="dollarInput">
                        <p className="dollarSign">$</p>
                        <input className="numberInput" type="number" id="insurance"></input>
                    </div>
                </div>
                <div className="formItem">
                    <label htmlFor="labor">Labor Rate:</label>
                    <input
                        className="costsInput"
                        id="labor"
                        placeholder="Percent as a decimal"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="payroll">Payroll Tax:</label>
                    <input
                        className="costsInput"
                        id="payroll"
                        placeholder="Payroll Tax"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="odc">ODC:</label>
                    <input
                        className="costsInput"
                        id="odc"
                        placeholder="ODC"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="tractor">Tractor Lease:</label>
                    <input
                        className="costsInput"
                        id="tractor"
                        placeholder="Tractor Lease"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="trailer">Trailer Lease:</label>
                    <input
                        className="costsInput"
                        id="trailer"
                        placeholder="Trailer Lease"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="g-and-a">G&A:</label>
                    <input
                        className="costsInput"
                        id="g-and-a"
                        placeholder="G&A"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="loan">Loan:</label>
                    <input
                        className="costsInput"
                        id="loan"
                        placeholder="Loan"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="rental">Rental:</label>
                    <input
                        className="costsInput"
                        id="rental"
                        placeholder="Rental"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="repairs">Repairs:</label>
                    <input
                        className="costsInput"
                        id="repairs"
                        placeholder="Repairs"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="depreciation">Depreciation:</label>
                    <input
                        className="costsInput"
                        id="depreciation"
                        placeholder="Depreciation"
                    ></input>
                </div>
                <div className="formItem">
                    <label htmlFor="mpg">MPG:</label>
                    <input
                        className="costsInput"
                        id="mpg"
                        placeholder="MPG"
                    ></input>
                </div>
                <button className="btn1" onClick={createCosts}>Submit</button>
            </form>
        </div>
    )
}