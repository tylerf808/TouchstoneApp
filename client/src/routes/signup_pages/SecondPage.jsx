import { Link } from "react-router-dom"

export default function SecondPage({ currentSlide, setCurrentSlide }) {

    return (
        <div className="pageContainer">
            <div className="textContainer">
                <p className="paragraph">In the following pages you'll be asked questions to help
                    us determine your operational and fixed costs.
                </p>
                <p className="paragraph">Please answer the questions to the best of your ability to ensure the
                    most accurate results.
                </p>
                <p className="paragraph">Press <span style={{fontWeight: 'bold'}} >next</span> to continue.</p>
            </div>
            <div className="btnContainerSignUp">
                <button onClick={() => {
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button onClick={() => {
                    setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}