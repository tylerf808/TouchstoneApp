import { useState } from "react"
import DriverInput from "../../components/DriverInput"

export default function FifthPage(props) {

    const [drivers, setDrivers] = useState([])
    const [inputList, setInputList] = useState([<DriverInput />])

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h1>Drivers</h1>
                    </div>
                    <div className="addDriversContainer">
                        {inputList}
                        <div className="addDriverBtnContainer">
                        <button className="btnAddDriver" onClick={() => setInputList(inputList.concat(<DriverInput />))}>Add Driver</button>
                    </div>
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