import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import HamburgerMenu from "./routes/Toolbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import { Outlet } from "react-router-dom";
import AddJob from "./routes/AddJob";
import LogIn from "./routes/LogIn";
import CostsPage from "./routes/CostsPage";
import SignUp from "./routes/SignUp";
import ViewJobs from './routes/ViewJobs'

export default function App() {


  const [user, setUser] = useState();
  const [costs, setCosts] = useState();
  const [loggedIn, setLoggedIn] = useState(false);


  const logIn = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    setUser(response.user_id);
    setLoggedIn(true);

    await fetch("http://localhost:3001/api/costs?id=" + response.user_id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCosts(data[0]));
  };

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
    setLoggedIn(true);

  };
  return (
    <Router>
      <div className="backgroundCanvas">
        <HamburgerMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setCosts={setCosts} />
        <Routes>
          <Route path="addjob" element={<AddJob />} />
          <Route path="/" element={<LogIn user={user} setUser={setUser} costs={costs} setCosts={setCosts} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="jobs" element={<ViewJobs user={user} costs={costs} setCosts={setCosts} />} />
          <Route path="signup" element={<SignUp signUp={signUp} loggedIn={loggedIn} />} />
          <Route path="costs" element={<CostsPage user={user} costs={costs} setCosts={setCosts} />} />
        </Routes>
      </div>
    </Router>
  );
}