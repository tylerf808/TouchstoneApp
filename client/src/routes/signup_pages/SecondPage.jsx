import { Link } from "react-router-dom"

export default function SecondPage({currentSlide, setCurrentSlide}) {

    return(
        <div>
          <div className="headerContainer">
            <h1>Create an Account</h1>
          </div>
          <p>slide 2</p>
          <div className="btnContainerSignUp">
            <button onClick={() => {
              if (currentSlide !== 0)
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