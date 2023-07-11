import { useState } from "react"

export default function DriverInput({ numDrivers, setNumDrivers }) {

    const [finalDriver, setFinalDriver] = useState(false)

    return (
        <div className="driverInputs">
            <div className="addDriversItem">
                <p>Drivers Email</p>
                <input type="email"></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Username</p>
                <input type="text"></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Name</p>
                <input type="text"></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Password</p>
                <input type="password"></input>
            </div>
        </div>
    )
}