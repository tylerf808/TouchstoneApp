import { useState } from "react"

export default function AddDriver({ numDrivers, setNumDrivers }) {

    const [finalDriver, setFinalDriver] = useState(false)

    return (
        <div className="addDriversContainer">
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