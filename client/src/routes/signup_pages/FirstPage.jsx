import { useState } from "react"
import { Link } from "react-router-dom"

export default function FirstPage({currentSlide, setCurrentSlide}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const createUser = async () => {

        if(confPassword !== password){
            console.log('passwords dont match')
            return
        }

        const newUser = {
            email: email,
            password: password
        }
        console.log(newUser)
        setCurrentSlide(currentSlide + 1)
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
                            <p>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} type="email"/>
                        </div>
                        <div className="slideItem">
                            <p>Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} type="password"/>
                        </div>
                        <div className="slideItem">
                            <p>Confirm Password</p>
                            <input onChange={(e) => setConfPassword(e.target.value)}type="password"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainer">
                <button disabled>Back</button>
                <button onClick={() => {
                    createUser()
                    
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}