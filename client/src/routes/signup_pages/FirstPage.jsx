import { useState } from "react"
import { Link } from "react-router-dom"

export default function FirstPage({ currentSlide, setCurrentSlide, setUser, setAlertMsg, setShowAlert }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const createUser = async () => {

        setShowAlert(false)

        if (email === '' || password === '' || confPassword === '') {
            setAlertMsg('Missing an Entry')
            setShowAlert(true)
            return
        }

        if (confPassword !== password) {
            setAlertMsg("Passwords do not match")
            setShowAlert(true)
            return
        }

        const newUser = {
            email: email,
            password: password
        }

        console.log(email)

        const response = await fetch('http://localhost:3001/api/user/' + email,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.json())

        console.log(response)

        if (response === null) {
            setCurrentSlide(currentSlide + 1)
            setShowAlert(false)
            return
        } else {
            setAlertMsg('User with that email already exists')
            setShowAlert(true)
            return
        }
    }

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Create an Account</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Email</p>
                            </div>
                            <input className="emailInputSignUp" onChange={(e) => setEmail(e.target.value)} type="email" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Password</p>
                            </div>
                            <input className="passwordInputSignUp" onChange={(e) => setPassword(e.target.value)} type="password" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Confirm Password</p>
                            </div>
                            <input className="passwordInputSignUp" onChange={(e) => setConfPassword(e.target.value)} type="password" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainer">
                <button className="btnSignUp" disabled>Back</button>
                <button className="btnSignUp" onClick={() => {
                    //createUser()
                    setShowAlert(false)
                    if (email === '' || password === '' || confPassword === '') {
                        setAlertMsg('Missing an Entry')
                        setShowAlert(true)
                        return
                    }
                    if (confPassword !== password) {
                        setAlertMsg("Passwords do not match")
                        setShowAlert(true)
                        return
                    }
                    setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p style={{ marginTop: 50 }}>Already have an account? <Link style={{ color: 'orange' }} to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}