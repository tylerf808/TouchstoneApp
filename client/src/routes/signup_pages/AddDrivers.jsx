import { useState } from "react"
import AddDriver from "../../components/AddDrivers"

export default function FifthPage(props) {

    const [drivers, setDrivers] = useState([])

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h1>Drivers</h1>
                    </div>
                    <div className="slideItem">
                        <AddDriver />
                    </div>
                    <div className="slideItem">
                        <button >Add Driver</button>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp">Submit</button>
            </div>
        </div>
    )
}