import { Link } from "react-router-dom"

export default function ThirdPage({currentSlide, setCurrentSlide}){

    return(
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Fixed Costs</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <p></p>
                            <input />
                        </div>
                        <div className="slideItem">
                            <p></p>
                            <input />
                        </div>
                        <div className="slideItem">
                            <p></p>
                            <input />
                        </div>
                        <div className="slideItem">
                            <input />
                        </div>
                        <div className="slideItem">
                            <p></p>
                            <input />
                        </div>
                        <div className="slideItem">
                            <p></p>
                            <input />
                        </div>
                    </div>
                </div>
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