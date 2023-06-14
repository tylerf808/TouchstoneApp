import { Link } from "react-router-dom"

export default function FourthPage({ currentSlide, setCurrentSlide }) {

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Operational Costs</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Select your Insurance payment frequency</p>
                            </div>
                            <div className="radioMenu">
                                <div className="radioItem">
                                    <p className="radioLabel">Monthly</p>
                                    <input value='monthly' className="radioInput" type="radio" name="insuranceType" />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Bi-Monthly</p>
                                    <input value='bi-monthly' className="radioInput" type="radio" name="insuranceType" />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Quarterly</p>
                                    <input value='quarterly' className="radioInput" type="radio" name="insuranceType" />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Annually</p>
                                    <input value='annually' className="radioInput" type="radio" name="insuranceType" />
                                </div>
                            </div>
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your Insurance payment amount</p>
                            </div>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your trailer lease monthly payment</p>
                            </div>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your tractor lease monthly payment</p>
                            </div>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly parking cost</p>
                            </div>
                            <input className="newCostInput" type="number" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly G&A cost</p>
                            </div>
                            <input className="newCostInput" type="number" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" >Submit</button>
            </div>
        </div>
    )
}