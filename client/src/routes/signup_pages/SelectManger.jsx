import { useEffect, useState } from "react"

export default function SelectManager(props) {

    useEffect(() => {

        async function getManagers (){
            await fetch("", {
                
            })
        }

    }, [])

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Select your Manager</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <select name='manager'>
                                {props.managers.map((el) => {
                                    return (
                                        <option value={el}>{el}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="btnContainerSignUp">
                    <button className="btnSignUp" onClick={() => {
                        props.setCurrentSlide(props.currentSlide - 1)
                    }}>Back</button>
                    <button className="btnSignUp" onClick={() => {
                        props.createAccount()
                    }}>Submit</button>

                </div>
            </div>
        </div>
    )
}