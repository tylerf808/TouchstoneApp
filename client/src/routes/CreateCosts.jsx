import { useNavigate } from "react-router-dom";


export default function CreateCosts({ user, setCosts }) {

    const navigate = useNavigate()

    const createCosts = async () => {

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

        navigate('/dashboard')
    }

    return (
        <div>
            <h2 id="modal-modal-title">Edit Costs</h2>
            <form>
                <div>
                    <label htmlFor="insurance">Insurance:</label>
                    <input
                        id="insurance"
                        placeholder="Dollars per day"
                    ></input>
                </div>
                <div>
                    <label htmlFor="labor">Labor Rate:</label>
                    <input
                        className="costsInput"
                        id="labor"
                        placeholder="Percent as a decimal"
                    ></input>
                </div>
                <div>
                    <label htmlFor="payroll">Payroll Tax:</label>
                    <input
                        className="costsInput"
                        id="payroll"
                        placeholder="Payroll Tax"
                    ></input>
                </div>
                <div>
                    <label htmlFor="dispatch">Dispatch:</label>
                    <input
                        className="costsInput"
                        id="dispatch"
                        placeholder="Dispatch"
                    ></input>
                </div>
                <div>
                    <label htmlFor="factor">Factor:</label>
                    <input
                        className="costsInput"
                        id="factor"
                        placeholder="Factor"
                    ></input>
                </div>
                <div>
                    <label htmlFor="odc">ODC:</label>
                    <input
                        className="costsInput"
                        id="odc"
                        placeholder="ODC"
                    ></input>
                </div>
                <div>
                    <label htmlFor="tractor">Tractor Lease:</label>
                    <input
                        className="costsInput"
                        id="tractor"
                        placeholder="Tractor Lease"
                    ></input>
                </div>
                <div>
                    <label htmlFor="trailer">Trailer Lease:</label>
                    <input
                        className="costsInput"
                        id="trailer"
                        placeholder="Trailer Lease"
                    ></input>
                </div>
                <div>
                    <label htmlFor="g-and-a">G&A:</label>
                    <input
                        className="costsInput"
                        id="g-and-a"
                        placeholder="G&A"
                    ></input>
                </div>
                <div>
                    <label htmlFor="loan">Loan:</label>
                    <input
                        className="costsInput"
                        id="loan"
                        placeholder="Loan"
                    ></input>
                </div>
                <div>
                    <label htmlFor="rental">Rental:</label>
                    <input
                        className="costsInput"
                        id="rental"
                        placeholder="Rental"
                    ></input>
                </div>
                <div>
                    <label htmlFor="repairs">Repairs:</label>
                    <input
                        className="costsInput"
                        id="repairs"
                        placeholder="Repairs"
                    ></input>
                </div>
                <div>
                    <label htmlFor="depreciation">Depreciation:</label>
                    <input
                        className="costsInput"
                        id="depreciation"
                        placeholder="Depreciation"
                    ></input>
                </div>
                <div>
                    <label htmlFor="mpg">MPG:</label>
                    <input
                        className="costsInput"
                        id="mpg"
                        placeholder="MPG"
                    ></input>
                </div>
                <button onClick={createCosts}>Update</button>
            </form>
        </div>
    )
}