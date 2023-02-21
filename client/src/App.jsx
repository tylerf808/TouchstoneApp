import { useState, useEffect } from "react";
import HamburgerMenu from "./routes/HamburgerMenu";
import AddJob from "./routes/AddJob";
import CostsPage from "./routes/CostsPage";
import ViewJobs from "./routes/ViewJobs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LogIn from "./routes/LogIn";
import SignUp from "./routes/SignUp";
import { Container } from "@mui/system";

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

    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    if (response) {
      setUser(response.user_id);
      setLoggedIn(true);
    }
  };

  return (
    <div style={{backgroundColor: 'orange'}}>
      <Router >
        <HamburgerMenu
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          setUser={setUser}
          setCosts={setCosts}
        />
        <Routes>
          <Route path="/" element={<LogIn logIn={logIn} loggedIn={loggedIn} />} />
          <Route
            path="addjob"
            element={<AddJob user={user} loggedIn={loggedIn} costs={costs} />}
          />
          <Route
            path="costs"
            element={<CostsPage user={user} costs={costs} setCosts={setCosts} />}
          />
          <Route path="jobs" element={<ViewJobs user={user} />} />
          <Route path="signup" element={<SignUp signUp={signUp} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}
