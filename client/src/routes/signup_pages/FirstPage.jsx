import { Link } from "react-router-dom"

export default function FirstPage({currentSlide, setCurrentSlide}) {

    return (
        <div>
            <div className="headerContainer">
                <h1>Create an Account</h1>
            </div>
            <div className="slideItem">
                <p>slide 1</p>
            </div>

            <div className="btnContainerSignUp">
                <button disabled>Back</button>
                <button onClick={() => {
                    if (currentSlide !== 4)
                        setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}