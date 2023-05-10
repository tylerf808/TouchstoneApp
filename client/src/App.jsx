import { useState, useEffect } from "react";
import Toolbar from "./routes/Toolbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Alert } from "@mui/material";
import AddJob from "./routes/AddJob";
import LogIn from "./routes/LogIn";
import CostsPage from "./routes/CostsPage";
import SignUp from "./routes/SignUp";
import ViewJobs from './routes/ViewJobs'

const library = ["places"];

export default function App() {

  const [user, setUser] = useState();
  const [costs, setCosts] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const signUp = async () => {
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const passwordConf = document.getElementById("password-signup-conf").value;

    if (email || password === '' || passwordConf === '') {
      return
    }

    if (password !== passwordConf) {
      return
    }

    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    setUser(response.user_id);
  };

  return (
    <Router>
        <div className="backgroundCanvas">
          <Toolbar user={user} costs={costs} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setCosts={setCosts} />
          <div style={{ }}>
            {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null}
          </div>
          <Routes>
            <Route path="addjob" element={<AddJob loggedIn={loggedIn} library={library} user={user} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} />} />
            <Route path="/" element={<LogIn setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} user={user} setUser={setUser} costs={costs} setCosts={setCosts} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="jobs" element={<ViewJobs user={user} costs={costs} setCosts={setCosts} />} />
            <Route path="signup" user={user} element={<SignUp showAlert={showAlert} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} setCosts={setCosts} setUser={setUser} setLoggedIn={setLoggedIn} signUp={signUp} loggedIn={loggedIn} />} />
            <Route path="costs" element={<CostsPage loggedIn={loggedIn} user={user} costs={costs} setCosts={setCosts} />} />
          </Routes>
        </div>
    </Router>
  );
}