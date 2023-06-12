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
                            <p className="slideItemText">Enter your labor rate as a percentage of revenue.</p>
                            <input type="number" />
                        </div>
                        <div className="slideItem">
                            <p className="slideItemText">Enter your payroll tax rate as a percentage of revenue.</p>
                            <input type="number" />
                        </div>
                        <div className="slideItem">
                            <p className="slideItemText">Enter your dispatch fee as a percentage of revenue.</p>
                            <input type='number'/>
                        </div>
                        <div className="slideItem">
                            <p className="slideItemText">Enter your factor fee as a percentage of revenue.</p>
                            <input type='number'/>
                        </div>
                        <div className="slideItem">
                            <p className="slideItemText">Enter your MPG.</p>
                            <input type="number"/>
                        </div>
                        <div className="slideItem">
                            <p className="slideItemText">Enter your other direct costs (ODC) as a monthly expense.</p>
                            <input />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
            <div className="headerContainer">
                <p style={{ marginTop: 50 }}>Already have an account? <Link to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}