import { useState } from "react"


export default function FifthPage(props) {

    const [enterDrivers, setEnterDrivers] = useState(false)
    const [numDrivers, setNumDrivers] = useState(0)

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h1>Drivers</h1>
                    </div>
                    {enterDrivers ?
                        <div>
                            {}
                        </div>
                        :
                        <div>
                            <p>How many drivers do you have?</p>
                            <input type="number" onChange={(e) => setNumDrivers(e.target.value)}></input>
                            <button onClick={() => {setEnterDrivers(true)}}>Enter</button>
                        </div>
                    }
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>back</button>
                <button className="btnSignUp" onClick={() => {
                    props.createAccount(props.accountType)
                }}>Submit</button>
            </div>
        </div>
    )
}