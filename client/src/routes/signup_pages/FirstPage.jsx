import { useState } from "react"
import { Link } from "react-router-dom"

export default function FirstPage({ currentSlide, setCurrentSlide, setUser, setAlertMsg, setShowAlert }) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [accountType, setAccountType] = useState('')

    const checkUser = async () => {

        setShowAlert(false)

        if (email === '' || password === '' || confPassword === '' || accountType === '') {
            setAlertMsg('Missing an Entry')
            setShowAlert(true)
            return
        }

        if (confPassword !== password) {
            setAlertMsg("Passwords do not match")
            setShowAlert(true)
            return
        }

        const response = await fetch('http://localhost:3001/api/user/check?email=' + email + '&username=' + username + '&accountType=' + accountType, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).catch((err) => console.log(err))

        console.log(response)

        if (response === null) {
            setCurrentSlide(currentSlide + 1)
            setShowAlert(false)
            return
        } else {
            setAlertMsg('User with that email or username already exists')
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
                                <p className="slideLabel">Username</p>
                            </div>
                            <input className="emailInputSignUp" onChange={(e) => setUsername(e.target.value)} type="text" />
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
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Driver or Manager</p>
                            </div>
                            <div className="accountTypeMenu">
                                <p className="accountTypeMenuLabel">Driver</p>
                                <input className="radioInput" type="radio" name="accountType" value='driver' onChange={(e) => setAccountType(e.target.value)}></input>
                                <p className="accountTypeMenuLabel">Manager</p>
                                <input className="radioInput" type="radio" name="accountType" value='manager' onChange={(e) => setAccountType(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainer">
                <button className="btnSignUp" onClick={() => {
                    checkUser()
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p>Already have an account? <Link id="sign-up-link" to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}