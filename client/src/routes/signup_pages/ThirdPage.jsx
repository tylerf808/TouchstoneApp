import { useState} from 'react'

export default function ThirdPage({currentSlide, setCurrentSlide}){

    const [laborRate, setLaborRate] = useState()
    const [payrollTax, setPayrollTax] = useState()
    const [dispatch, setDispatch] = useState()
    const [factor, setFactor] = useState()
    const [mpg, setMpg] = useState()
    const [odc, setOdc] = useState()

    return(
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Fixed Costs</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <p className="slideLabel">Enter your labor rate as a percentage of revenue.</p>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your payroll tax rate as a percentage of revenue.</p>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your dispatch fee as a percentage of revenue.</p>
                            <input className="newCostInput" type='number'/>
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your factor fee as a percentage of revenue.</p>
                            <input className="newCostInput" type='number'/>
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your MPG.</p>
                            <input className="newCostInput" type="number"/>
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your other direct costs (ODC) as a monthly expense.</p>
                            <input className="newCostInput" type="number"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
        </div>
    )
}